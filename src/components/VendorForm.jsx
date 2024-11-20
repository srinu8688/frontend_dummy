import React, { useState } from 'react';
import { API_URL } from '../../apiPath';
import '../styles/main.css';

const VendorForm = () => {
  const [name, setVendorName] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendors/add`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name }),
      })
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setVendorName('');
        alert("Vendor name added Successfully")
      } else {
        setMessage(data.error || 'Error adding vendor');
      }
    } catch (error) {
      console.error("Registration Failed")
      setMessage('Server error. Please try again later.');
      alert("Vendor not added")
      
    }
    
  };

  return (
    <div className="container">
      <h2>Add Vendor</h2>
      <form onSubmit={handleSubmit}>
        <label>Vendor Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setVendorName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VendorForm;
