import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourtReservations = () => {
  const [reservasAceptadas, setReservasAceptadas] = useState([]);

  useEffect(() => {
    const fetchAcceptedReservas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/reservas/accepted', {
          headers: {
            'x-auth-token': token,
          },
        });
        setReservasAceptadas(response.data);
      } catch (error) {
        console.error('Error fetching accepted reservas:', error);
      }
    };

    fetchAcceptedReservas();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Reservas Aceptadas por Canchas</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Cancha</th>
              <th className="px-4 py-2 text-sm font-semibold">Nombre</th>
              <th className="px-4 py-2 text-sm font-semibold">Email</th>
              <th className="px-4 py-2 text-sm font-semibold">Fecha</th>
              <th className="px-4 py-2 text-sm font-semibold">Hora de Inicio</th>
              <th className="px-4 py-2 text-sm font-semibold">Hora de Fin</th>
            </tr>
          </thead>
          <tbody>
            {reservasAceptadas.map((reserva) => (
              <tr key={reserva._id} className="text-center border-b border-blue-200">
                <td className="px-4 py-2 text-sm">{reserva.court}</td>
                <td className="px-4 py-2 text-sm">{reserva.name}</td>
                <td className="px-4 py-2 text-sm">{reserva.email}</td>
                <td className="px-4 py-2 text-sm">{new Date(reserva.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-sm">{reserva.startTime}</td>
                <td className="px-4 py-2 text-sm">{reserva.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourtReservations;
