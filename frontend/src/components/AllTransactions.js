import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        console.log('Fetching transactions from API');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/transactions`, {
          headers: { 'x-auth-token': token }
        });
        console.log('Fetched transactions:', res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          console.log('Transactions are fetched correctly');
        } else {
          console.log('No transactions found for this user');
        }
        setTransactions(res.data);
      } catch (err) {
        setError('Error fetching transactions');
        console.error('Error fetching transactions:', err);
      }
    };
    fetchTransactions();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1>All Transactions</h1>
      {transactions.length > 0 ? (
        <ul className="list-group">
          {transactions.map(transaction => (
            <li key={transaction._id} className="list-group-item">
              <strong>{new Date(transaction.date).toLocaleString()}</strong>: {transaction.type} of ${transaction.amount} in {transaction.accountType} account
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default AllTransactions;
