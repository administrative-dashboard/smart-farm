// authProvider.js
import { getJwtTokenFromCookies } from "./authUtils";

const API_URL = process.env.REACT_APP_API_URL;
export const authProvider = {
  async login() {
    window.location.href = `${API_URL}/google/redirect`;
  },

  async checkAuth() {
    return getJwtTokenFromCookies() ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    console.error("Authentication error:", error);
    throw new Error("Authentication error occurred.");
  },

  async logout() {
    window.location.href = `${API_URL}/google/logout`;
  },
};
