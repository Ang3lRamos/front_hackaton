import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">
          <Link to="/">ReservaUnac</Link>
        </h1>
        <nav className="space-x-4 flex flex-wrap justify-center">
          <Link to="/reserva" className="text-xl font-semibold hover:text-orange-400 mb-2 sm:mb-0">Reservar</Link>
          <Link to="/reservas-canchas" className="text-xl font-semibold hover:text-orange-400 mb-2 sm:mb-0">Reservas Canchas</Link>
          <Link to="/admin" className="text-xl font-semibold hover:text-orange-400 mb-2 sm:mb-0">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
