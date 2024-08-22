import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Página No Encontrada</h1>
      
      {/* Espacio para una imagen */}
      <div className="mb-6">
        <img src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" alt="Página no encontrada" className="w-full h-64 object-cover rounded-lg mx-auto" />
      </div>

      <p className="text-lg text-blue-500 mb-4">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link to="/" className="text-orange-500 hover:text-orange-600 font-semibold">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
