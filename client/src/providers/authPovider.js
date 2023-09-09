// Import necessary libraries and modules
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

  checkError: () => {
    // Add error handling logic here
    return Promise.resolve();
  },

  async logout() {
    localStorage.removeItem('jwtToken'); // Remove from localStorage
    window.location.href = `${API_URL}/google/logout`;
  },
};
