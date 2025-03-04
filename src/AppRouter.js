// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import DataStore from './dataStore';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteData from './pages/DeleteData';
import Feedback from './pages/Feedback';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data-store" element={<DataStore />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/delete" element={<DeleteData />} />
        <Route path="/feedback" element={<Feedback />} />
        {/* Catch-all route to redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;