import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [reservas, setReservas] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            const fetchReservas = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('http://localhost:5000/api/reservas', {
                        headers: {
                            'x-auth-token': token,
                        },
                    });
                    // Filtrar solo las reservas que no están rechazadas
                    setReservas(response.data.filter(reserva => !reserva.rejected));
                } catch (error) {
                    console.error("Error fetching reservas:", error);
                }
            };
            fetchReservas();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            setError('');
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response);
                setError('Credenciales incorrectas o error del servidor');
            } else {
                console.error('Error:', error);
                setError('No se pudo conectar con el servidor');
            }
        }
    };

    const handleAccept = async (reservaId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/reservas/${reservaId}`, 
            { approved: true }, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setReservas((prevReservas) =>
                prevReservas.map((reserva) =>
                    reserva._id === reservaId ? { ...reserva, approved: true, rejected: false } : reserva
                )
            );
            setMessage('Reserva aceptada exitosamente.');
        } catch (error) {
            console.error("Error accepting reserva:", error);
        }
    };

    const handleReject = async (reservaId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/reservas/${reservaId}`, 
            { rejected: true }, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setReservas((prevReservas) => prevReservas.filter((reserva) => reserva._id !== reservaId));
            setMessage('Reserva rechazada y eliminada de la vista.');
        } catch (error) {
            console.error("Error rejecting reserva:", error);
        }
    };

    const handleDelete = async (reservaId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/reservas/${reservaId}`, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setReservas((prevReservas) => prevReservas.filter((reserva) => reserva._id !== reservaId));
            setMessage('Reserva eliminada exitosamente.');
        } catch (error) {
            console.error("Error deleting reserva:", error);
        }
    };

    const closeMessage = () => {
        setMessage('');
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-600 mb-6">Iniciar sesión</h1>
                <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Iniciar Sesión</button>
                </form>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Panel de Administración</h1>

            <div className="mb-6">
                <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="u" className="w-full max-w-xs mx-auto object-cover rounded-lg" />
            </div>

            {message && (
                <div className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                    <p className="font-bold">{message}</p>
                    <button onClick={closeMessage} className="text-sm underline">Cerrar</button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Nombre</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Fecha</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Hora de Inicio</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Hora de Fin</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                            <tr key={reserva._id} className="text-center border-b border-blue-200">
                                <td className="px-4 py-2 text-sm">{reserva.name}</td>
                                <td className="px-4 py-2 text-sm">{reserva.email}</td>
                                <td className="px-4 py-2 text-sm">{new Date(reserva.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-sm">{reserva.startTime}</td>
                                <td className="px-4 py-2 text-sm">{reserva.endTime}</td>
                                <td className="px-4 py-2 flex justify-center space-x-2">
                                    {!reserva.approved && !reserva.rejected ? (
                                        <>
                                            <button
                                                onClick={() => handleAccept(reserva._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                onClick={() => handleReject(reserva._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                            >
                                                Rechazar
                                            </button>
                                        </>
                                    ) : reserva.approved ? (
                                        <span className="text-green-600 font-bold text-sm">Aceptada</span>
                                    ) : (
                                        <span className="text-red-600 font-bold text-sm">Rechazada</span>
                                    )}
                                    <button
                                        onClick={() => handleDelete(reserva._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
