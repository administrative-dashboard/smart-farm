// Import necessary libraries and modules
import Cookies from 'universal-cookie';
import axios from 'axios';
import { API_URL } from '../consts';





const cookies = new Cookies();

export const authProvider = {
  async login() {
    window.location.href = `${API_URL}/google/redirect`;
    // Assuming you have a user object defined somewhere
    // console.log(user + "sdfcgvbh");
  },

  async checkAuth() {
    return Cookies.get("jwt") ? Promise.resolve() : Promise.reject();
  },

  checkError: () => {
    // Add error handling logic here
    return Promise.resolve();
  },

  async logout() {
    window.location.href = `${API_URL}/google/logout`;
  },
};
