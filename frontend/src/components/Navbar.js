import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setAuth }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Bank</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deposit">Deposit</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/check-deposit">Check Deposit</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/balance">Balance</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/withdraw">Withdraw</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all-transactions">All Transactions</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/create-account">Create Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
