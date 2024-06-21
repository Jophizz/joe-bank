import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
          headers: { 'x-auth-token': token }
        });
        setProfile(res.data);
      } catch (err) {
        setError('Error fetching profile');
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone Number: {profile.phoneNumber}</p>
    </div>
  );
};

export default Profile;
