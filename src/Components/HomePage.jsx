import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center sm:text-4xl">
        Bienvenido
      </h1>
      
      {/* Espacio para una imagen */}
      <div className="mb-6 flex justify-center">
        <img 
          src="https://www.unac.edu.co/wp-content/uploads/2023/06/Logo_UNAC_svg.svg" 
          alt="u" 
          className="w-full max-w-xs h-auto object-cover rounded-lg" 
        />
      </div>

      <p className="text-xl font-semibold text-center sm:text-2xl">
        ReservaUnac te permite gestionar tus reservas de canchas. Haz clic en "Reservar" para comenzar.
      </p>
    </div>
  );
};

export default HomePage;
