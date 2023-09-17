import simpleRestProvider from "ra-data-simple-rest";
import { getJwtTokenFromCookies } from "./authUtils"; // Import your function to get the JWT token from cookies
const apiUrl = "http://localhost:5000"; // Replace with your API URL
const dataProvider = simpleRestProvider(apiUrl);
const customDataProvider = {
  ...dataProvider,
  async getList(resource, params) {
    const token = getJwtTokenFromCookies(); // Get the JWT token from cookies
    const headers = new Headers({
      Authorization: `Bearer ${token}`, // Add the JWT token to the headers
    });
    const { filter, pagination, sort } = params;
    const query = {}; // Initialize an empty query object
  
    // Check if there's a 'q' parameter in the filter and include it in the query
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
        total: data.length, // You may need to adjust this depending on your API response structure
      };
    } catch (error) {
      throw new Error(`Error fetching ${resource}: ${error.message}`);
    }
  }
  ,
  
  async getOne(resource, params) {
    const token = getJwtTokenFromCookies(); // Получите JWT-токен из cookies
    const headers = new Headers({
      Authorization: `Bearer ${token}`, // Добавьте JWT-токен в заголовки
    });
  
    if (!params.id) {
      throw new Error('Не указан параметр "id"');
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
      throw new Error(`Ошибка при запросе ${resource}: ${error.message}`);
    }
  },
  






  // Implement other dataProvider methods in a similar fashion if needed
  async create(resource, params) {
    const token = getJwtTokenFromCookies(); // Get the JWT token from cookies
    const headers = new Headers({
      Authorization: `Bearer ${token}`, // Add the JWT token to the headers
      "Content-Type": "application/json", // Adjust content type as needed
    });
    try {
      const response = await fetch(`${apiUrl}/${resource}`, {
        method: "POST",
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
      "Content-Type": "application/json", // Adjust content type as needed
    });
    try {
      const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
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

  async delete(resource, params) {
    const token = getJwtTokenFromCookies(); // Получите JWT-токен из cookies
    const headers = new Headers({
      Authorization: `Bearer ${token}`, // Добавьте JWT-токен в заголовки
    });
  
    if (!params.id) {
      throw new Error('Не указан параметр "id"');
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
        data: params.id, // Возвращаем id удаленной записи
      };
    } catch (error) {
      throw new Error(`Ошибка при удалении записи из ${resource}: ${error.message}`);
    }
  }
  



};
export default customDataProvider;
