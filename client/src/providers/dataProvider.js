import simpleRestProvider from 'ra-data-simple-rest';
import { getJwtTokenFromCookies } from './authUtils'; 
const apiUrl = 'http://localhost:5000'; 
const dataProvider = simpleRestProvider(apiUrl);
const customDataProvider = {
  ...dataProvider,
  async getList(resource, params) {
    const token = getJwtTokenFromCookies(); 
    const headers = new Headers({
      Authorization: `Bearer ${token}`, 
    });
    const { filter, pagination, sort } = params;
    const query = {}; 
  
    if (filter.q || filter.device_name || filter.device_type || filter.quantity || filter.shared_quantity || filter.created_at) {
      query.q = filter.q;
      query.device_name=filter.device_name;
      query.device_type=filter.device_type;
      query.quantity=filter.quantity;
      query.shared_quantity=filter.shared_quantity;
      query.created_at=filter.created_at;
    }
  
    try {
      const response = await fetch(`${apiUrl}/${resource}?${new URLSearchParams(query)}`, {
        method: 'GET',
        headers,
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
      return {
        data: data,
        total: data.length, 
      };
    } catch (error) {
      throw new Error(`Error fetching ${resource}: ${error.message}`);
    }
  },
  
  async getOne(resource, params) {
    const token = getJwtTokenFromCookies(); 
    const headers = new Headers({
      Authorization: `Bearer ${token}`, 
    });
  
    if (!params.id) {
      throw new Error('Not set parameter "id"');
    }
  
    try {
      const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
        method: 'GET',
        headers,
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
      return {
        data: data,
      };
    } catch (error) {
      throw new Error(`Request Error ${resource}: ${error.message}`);
    }
  },
  
 
  async create(resource, params) {
    const token = getJwtTokenFromCookies(); 
    const headers = new Headers({
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json', 
    });
    try {
      const response = await fetch(`${apiUrl}/${resource}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params.data), 
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
    const token = getJwtTokenFromCookies(); 
    const headers = new Headers({
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json', 
    });
    try {
      const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(params.data), 
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
  

  async delete(resource, params) {
    const token = getJwtTokenFromCookies(); 
    const headers = new Headers({
      Authorization: `Bearer ${token}`, 
    });
  
    if (!params.id) {
      throw new Error('Not set parameter "id"');
    }
  
    try {
      const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
        headers,
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      return {
        data: params.id, 
      };
    } catch (error) {
      throw new Error(`Error deleting from ${resource}: ${error.message}`);
    }
  }
  
};
export default customDataProvider;