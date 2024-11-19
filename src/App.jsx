import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorForm from './components/VendorForm.jsx';
import ResourceForm from "./components/ResourceForm.jsx"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/vendorName" element={<VendorForm />} />
        <Route path="/" element={<ResourceForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
