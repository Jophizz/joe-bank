import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const CheckDeposit = () => {
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const webcamRef = useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const checkImage = await capture();
      console.log('Captured image:', checkImage);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/check-deposit`, 
        { amount: parseFloat(amount), accountType, checkImage }, 
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setMessage(res.data.msg);
      setError('');
      setAmount(''); // Clear the form
      setAccountType('savings'); // Reset the account type
      window.location.reload(); // Reload the component
    } catch (err) {
      setError('Error depositing check');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Check Deposit</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Account Type</label>
          <select className="form-control" value={accountType} onChange={e => setAccountType(e.target.value)} required>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </select>
        </div>
        <div className="form-group">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Deposit Check</button>
      </form>
      {message && <p className="mt-3 text-success">{message}</p>}
      {error && <p className="mt-3 text-danger">{error}</p>}
    </div>
  );
};

export default CheckDeposit;
