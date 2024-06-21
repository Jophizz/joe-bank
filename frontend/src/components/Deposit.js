import React, { useState } from 'react';
import axios from 'axios';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/transactions/deposit`, 
        { amount: parseFloat(amount), accountType }, 
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setMessage(res.data.msg);
      setError('');
      setAmount(''); // Clear the form
    } catch (err) {
      setError('Error depositing money');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Deposit</h1>
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
        <button type="submit" className="btn btn-primary mt-3">Deposit</button>
      </form>
      {message && <p className="mt-3 text-success">{message}</p>}
      {error && <p className="mt-3 text-danger">{error}</p>}
    </div>
  );
};

export default Deposit;
