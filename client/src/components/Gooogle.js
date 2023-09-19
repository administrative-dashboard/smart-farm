// components/GoogleLogin.js

import React from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000';
const GoogleLoginComponent = () => {
    const handleGoogleLogin = async () => {
        try {
          // Make a GET request to your backend's /auth/google endpoint to initiate the OAuth process
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
