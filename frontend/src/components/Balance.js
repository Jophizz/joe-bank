import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Balance = () => {
  const [balance, setBalance] = useState({ savingsBalance: 0, checkingBalance: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/balance`, {
          headers: { 'x-auth-token': token }
        });
        setBalance(res.data);
      } catch (err) {
        setError('Error fetching balance');
        console.error(err);
      }
    };
    fetchBalance();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Balance</h1>
      <p>Savings Balance: ${balance.savingsBalance}</p>
      <p>Checking Balance: ${balance.checkingBalance}</p>
    </div>
  );
};

export default Balance;
