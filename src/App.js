// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import ReservaPage from './Components/ReservaPage';
import AdminPage from './Components/AdminPage';
import NotFound from './Components/NotFound';
import CourtReservations from './Components/CourtReservations';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reserva" element={<ReservaPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/reservas-canchas" element={<CourtReservations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
