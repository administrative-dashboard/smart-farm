// components/GoogleLogin.js

import React from 'react';
const API_URL = process.env.REACT_APP_API_URL;
const GoogleLoginComponent = () => {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${API_URL}/google/redirect`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginComponent;
