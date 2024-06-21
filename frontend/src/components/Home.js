import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to Bank</h1>
      <div className="image-container text-center">
        <img src={`${process.env.PUBLIC_URL}/bank.png`} alt="Bank" className="home-image" />
      </div>
    </div>
  );
};

export default Home;





