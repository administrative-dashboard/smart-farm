// authProvider.js
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_URL } from '../consts';
import { getJwtTokenFromCookies } from './authUtils';




export const authProvider = {
  async login() {
    window.location.href = `${API_URL}/google/redirect`;
  },

  async checkAuth() {
    // return Cookies.get("token") ? Promise.resolve() : Promise.reject();
    // return localStorage.getItem('jwtToken') ? Promise.resolve() : Promise.reject();
     return getJwtTokenFromCookies()? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    // Handle errors here
    console.error('Authentication error:', error);

    // You can throw an error or return a rejected promise with an error message
    throw new Error('Authentication error occurred.');

    // Alternatively, you can return a resolved promise to suppress the error
    // return Promise.resolve();
  },
  async logout() {
      localStorage.removeItem('jwtToken');
      window.location.href = `${API_URL}/google/logout`;
  },
};
