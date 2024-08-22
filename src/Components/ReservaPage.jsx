import React, { useState } from 'react';
import axios from 'axios';

const ReservaPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [court, setCourt] = useState('');
  const [startTime, setStartTime] = useState(''); 
  const [endTime, setEndTime] = useState('');    
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (endTime <= startTime) {
        setMessage('La hora de finalización debe ser posterior a la de inicio');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/reservas', { name, email, date, court, startTime, endTime });
        alert('Reserva creada exitosamente'); 
        setName('');
        setEmail('');
        setDate('');
        setCourt('');
        setStartTime('');
        setEndTime('');
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setMessage(error.response.data.error);
        } else {
            setMessage('Error al crear la reserva');
        }
    }
};


  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Crear Reserva</h1>

      <div className="mb-6">
        <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="u" className="w-50 h-48 object-cover rounded-lg" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-blue-600">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600">Hora de inicio</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600">Hora de fin</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600">Cancha</label>
          <select
            value={court}
            onChange={(e) => setCourt(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          >
            <option value="" disabled>Selecciona una cancha</option>
            <option value="Cancha 1">Cancha de Futbol principal</option>
            <option value="Cancha 2">Cancha de Futbol secundaria</option>
            <option value="Cancha 3">Cancha de Microfutbol</option>
            <option value="Cancha 4">Cancha de VolleyBall</option>
            <option value="Cancha 5">Cancha de Baloncesto</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Crear Reserva
        </button>
      </form>
      
      {message && <p className="mt-6 text-orange-500">{message}</p>}
    </div>
  );
};

export default ReservaPage;
