import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AadharCheck.css'; // Import CSS file

const AadharCheck = () => {
  const [aadhar, setAadhar] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckAadhar = async () => {
    if (aadhar.length !== 12 || !/^\d+$/.test(aadhar)) {
      setMessage('Aadhar number must be 12 digits');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/check-aadhar', { aadhar });
      setMessage(response.data.message);
      if (response.status === 200) {
        navigate('/vote', { state: { aadhar } });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="card">
      <h1>Enter Your Aadhar Number</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleCheckAadhar}>Proceed</button>
      <p className="text-danger mt-3">{message}</p>
    </div>
  );
};

export default AadharCheck;
