import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import DataStore from './dataStore';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data-store" element={<DataStore />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;