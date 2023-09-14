import simpleRestProvider from 'ra-data-simple-rest';
import { getJwtTokenFromCookies } from './authUtils'; // Import your function to get the JWT token from cookies
import { API_URL } from '../consts';
const dataProvider = simpleRestProvider(API_URL);
const customDataProvider = {
  ...dataProvider,
  async getList(resource, params) {
    const token = getJwtTokenFromCookies(); // Get the JWT token from cookies
    const headers = new Headers({
      Authorization: `Bearer ${token}`, // Add the JWT token to the headers
    });
    try {
      const response = await fetch(`${API_URL}/${resource}`, {
        method: 'GET',
        headers,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return {
        data: data,
        total: data.length, // You may need to adjust this depending on your API response structure
      };
    } catch (error) {
      throw new Error(`Error fetching ${resource}: ${error.message}`);
    }
  },
  // Implement other dataProvider methods in a similar fashion if needed
  async create(resource, params) {
    const token = getJwtTokenFromCookies(); // Get the JWT token from cookies
    const headers = new Headers({
      Authorization: `Bearer ${token}`, // Add the JWT token to the headers
      'Content-Type': 'application/json', // Adjust content type as needed
    });
    try {
      const response = await fetch(`${API_URL}/${resource}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params.data), // Convert data to JSON
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return {
        data: data,
      };
    } catch (error) {
      throw new Error(`Error creating ${resource}: ${error.message}`);
    }
  },
  async update(resource, params) {
    const token = getJwtTokenFromCookies(); // Get the JWT token from cookies
    const headers = new Headers({
      Authorization: `Bearer ${token}`, // Add the JWT token to the headers
      'Content-Type': 'application/json', // Adjust content type as needed
    });
    try {
      const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(params.data), // Convert data to JSON
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return {
        data: data,
      };
    } catch (error) {
      throw new Error(`Error updating ${resource}: ${error.message}`);
    }
  },
  // Implement other dataProvider methods in a similar fashion if needed

};
export default customDataProvider;