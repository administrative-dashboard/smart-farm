// Import necessary libraries and modules
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


const cookies = new Cookies();


export const authProvider = {

  user: null,

  // Use the useEffect hook to retrieve the JWT token when the component mounts
  initializeUser: () => {
    // Retrieve the JWT token when the component mounts
    const jwtToken = cookies.get('jwt');
    console.log(jwtToken)
    authProvider.user = jwtToken;
  },

  async login() {
    window.location.href = `${API_URL}/google/redirect`;
    console.log(authProvider.user+"sdfcgvbh")
  },

  async checkAuth() {
    const jwtToken = authProvider.user; 
    if (!jwtToken) {
      return Promise.reject({ message: 'Not authenticated' });
    }

    try {
      const response = await httpClient.get('/user/info', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // Extract and log user role and email to the console
      const { name, email, profile_photo } = response.data;
      console.log('User Role:', name);
      console.log('User Email:', email);

      return Promise.resolve();
    } catch (error) {
      // Handle authentication errors or token expiration
      return Promise.reject(error);
    }
  },

  checkError: () => {
    return Promise.resolve();
  },

  async logout() {
    // Cookies.remove('jwt');
    window.location.href = `${API_URL}/google/logout`;
    // authProvider.user = null;
  },
};

// Call initializeUser to populate the user state when the component mounts
authProvider.initializeUser();
