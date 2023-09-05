// authProvider.js
import { fetchUtils } from 'react-admin';
import Cookies from 'js-cookie';
import { parseJwtTokenFromHeaders, saveTokenToCookies, getJwtTokenFromCookies } from './authUtils';

const apiUrl = 'http://localhost:5000';
const httpClient = fetchUtils.fetchJson;

export default {
  login: () => {
    // saveTokenToCookies(token);
    window.location.href = `${apiUrl}/google/redirect`;
  },

checkAuth: () => {
  const jwtToken = getJwtTokenFromCookies();

  console.log('JWT Token:', jwtToken);

  if (jwtToken) {
    return Promise.resolve();
  } else {
    return Promise.reject({ message: false });
  }
},

  checkError: () => {

    return Promise.resolve();
  },

  logout: () => {
    Cookies.remove('jwt');
    window.location.href = `${apiUrl}/google/logout`;
  },
};
