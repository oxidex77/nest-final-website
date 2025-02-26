import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import DataStore from './dataStore';

const AppRouter = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data-store" element={<DataStore />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
