import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6">
        Página No Encontrada
      </h1>
      
      <div className="mb-6 flex justify-center">
        <img 
          src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" 
          alt="Página no encontrada" 
          className="w-full max-w-xs h-auto object-cover rounded-lg" 
        />
      </div>

      <p className="text-base sm:text-lg text-blue-500 mb-4">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link to="/" className="text-orange-500 hover:text-orange-600 font-semibold text-base sm:text-lg">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
