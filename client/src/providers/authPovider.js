import { fetchUtils } from 'react-admin';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000';

const httpClient = fetchUtils.fetchJson;

export const authProvider = {
  async login() {
    window.location.href = `${API_URL}/google/redirect`;
  },

  async checkAuth() {
    // Check if the user is authenticated by verifying the presence of the JWT token in cookies
    const jwtToken = Cookies.get('jwt');
    if (!jwtToken) {
      return Promise.reject({ message: 'Not authenticated' });
    }

    // Fetch user information from the server
    try {
      const response = await httpClient(`${API_URL}/user-info`, {
        method: 'GET',
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
    Cookies.remove('jwt');
    window.location.href = `${API_URL}/google/logout`;
  },
};
