// authProvider.js
import { fetchUtils } from 'react-admin';
import Cookies from 'js-cookie';
import { parseJwtTokenFromHeaders, saveTokenToCookies, getJwtTokenFromCookies } from './authUtils';

const API_URL='http://localhost:5000';

const httpClient = fetchUtils.fetchJson;

// const httpClient = (url, options = {}) => {
//     const token = localStorage.getItem('token');
//     const user = { token: `Bearer ${token}`, authenticated: !!token };
//     return fetchUtils.fetchJson(url, {...options, user});
// }
export default {
    login: () => {
        // saveTokenToCookies(token);
        window.location.href = `${API_URL}/google/redirect`;
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
    window.location.href = `${API_URL}/google/logout`;
  },
};
