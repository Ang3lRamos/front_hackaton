import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">ReservaUnac</Link>
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="text-2xl font-bold hover:text-orange-400">Inicio</Link>
          <Link to="/reserva" className="text-2xl font-bold hover:text-orange-400">Reservar</Link>
          <Link to="/admin" className="text-2xl font-bold hover:text-orange-400">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
