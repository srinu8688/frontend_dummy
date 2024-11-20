import React, { useState, useEffect } from 'react';
import { API_URL } from '../../apiPath';
import '../styles/main.css';

const ResourceForm = () => {
  const [fullName, setFullName] = useState('');
  const [resume, setResume] = useState(null);
  const [vendor, setVendor] = useState('');
  const [technology, setTechnology] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(`${API_URL}/vendors/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch vendors');
        }
        const data = await response.json();
        console.log(data);

        setVendors(data || []); 
      } catch (error) {
        console.error('Failed to fetch vendors', error);
        setMessage('Error fetching vendors. Please try again later.');
      }
    };
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('resume', resume);
    formData.append('vendor', vendor);
    technology.forEach((tech) => formData.append('technology[]', tech));

    try {
      const response = await fetch(`${API_URL}/resources/add`, {
        method: 'POST',
        body: formData,
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add resource: ${errorText}`);
      }
    
      setMessage('Resource added successfully!');
      alert("Resource details added successfully")
      setFullName('');
    setResume(null);
    setVendor('');
    setTechnology([]);
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Internal Server Error: ' + error.message);
    }
  };

  const techOptions = ['Reactjs', 'Nodejs', 'Php', 'Javascript'];

  return (
    <div className="container">
      <h2>Add Resource</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label>Upload Resume</label>
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        <label>Vendor</label>
        <select
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          required
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendorObj) => (
            <option key={vendorObj._id} value={vendorObj.name}>
              {vendorObj.name}
            </option>
          ))}
        </select>
        <label>Technology</label>
        <div className="checkbox-group">
          {techOptions.map((tech) => (
            <label key={tech}>
              <input
                type="checkbox"
                value={tech}
                onChange={(e) =>
                  setTechnology((prev) =>
                    e.target.checked
                      ? [...prev, tech]
                      : prev.filter((t) => t !== tech)
                  )
                }
              />
              {tech}
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResourceForm;
