import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [reservas, setReservas] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                    setReservas(response.data);
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
            await axios.put(`http://localhost:5000/api/reservas/${reservaId}/accept`, {}, {
                headers: {
                    'x-auth-token': token,
                },
            });
            setReservas((prevReservas) =>
                prevReservas.map((reserva) =>
                    reserva._id === reservaId ? { ...reserva, status: 'Accepted' } : reserva
                )
            );
        } catch (error) {
            console.error("Error accepting reserva:", error);
        }
    };

    // Renderiza el formulario de inicio de sesión si no está autenticado
    if (!isAuthenticated) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-blue-600 mb-6">Iniciar sesión</h1>
                <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-6">
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

            {/* Imagen */}
            <div className="mb-6">
                <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="u" className="w-50 h-64 object-cover rounded-lg" />
            </div>

            {/* Tabla de Reservas */}
            <table className="min-w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="w-1/6 px-4 py-2">Nombre</th>
                        <th className="w-1/6 px-4 py-2">Email</th>
                        <th className="w-1/6 px-4 py-2">Fecha</th>
                        <th className="w-1/6 px-4 py-2">Hora de Inicio</th> {/* Nueva columna */}
                        <th className="w-1/6 px-4 py-2">Hora de Fin</th> {/* Nueva columna */}
                        <th className="w-1/6 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva._id} className="text-center border-b border-blue-200">
                            <td className="px-4 py-2">{reserva.name}</td>
                            <td className="px-4 py-2">{reserva.email}</td>
                            <td className="px-4 py-2">{new Date(reserva.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{reserva.startTime}</td> {/* Nueva columna */}
                            <td className="px-4 py-2">{reserva.endTime}</td> {/* Nueva columna */}
                            <td className="px-4 py-2">
                                {reserva.status !== 'Accepted' ? (
                                    <button
                                        onClick={() => handleAccept(reserva._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Aceptar
                                    </button>
                                ) : (
                                    <span className="text-green-600 font-bold">Aceptada</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default AdminPage;
