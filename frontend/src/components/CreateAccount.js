import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    password: ''
  });
  const { email, name, phoneNumber, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, formData);
      alert('Account created successfully');
      navigate('/login');
    } catch (err) {
      console.error('Error creating account:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
        alert(`Error creating account: ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        console.error('Request data:', err.request);
        alert('Error creating account: No response received from server');
      } else {
        console.error('Error message:', err.message);
        alert(`Error creating account: ${err.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Account</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" className="form-control" name="phoneNumber" value={phoneNumber} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
