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
        console.log(data)
        setVendors(data.vendor|| []);
      } catch (error) {
        console.error('Failed to fetch vendors');
      }
    };
    fetchVendors();
  }, []);
  useEffect(() => {
    console.log('Vendors State:', vendors);
  }, [vendors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('resume', resume);
    formData.append('vendor', vendor);
    formData.append('technology', technology.join(','));

    try {
      const response = await fetch(`${API_URL}/resources/add`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add resource');
      }

      setMessage('Resource added successfully!');
      setFullName('');
      setResume(null);
      setVendor('');
      setTechnology([]);
    } catch (error) {
        alert("Registered Succesfully")
      setMessage('Added Successfully');
    }
  };

  const techOptions = ['Reactjs', 'Nodejs', 'Javascript', 'Python'];

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
  {vendors.length > 0 ? (
  vendors.map((v) => (
    <option key={v._id} value={v._id}>
      {v.name}
    </option>
  ))
) : (
  <div>
    <option >srinu</option>
    <option >siva</option>
  </div>
)}

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
