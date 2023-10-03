// dataProvider

import simpleRestProvider from "ra-data-simple-rest";
import { getJwtTokenFromCookies } from "./authUtils";
import { API_URL } from "../consts";

const apiUrl = API_URL;
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
    for (const prop in filter) {
      if (filter[prop])
      query[prop] = filter[prop];
    }
    for (const prop in pagination) {
      query[prop] = pagination[prop];
    }
    for (const prop in sort) {
      query[prop] = sort[prop];
    }
    console.log("query: ", query);
    try {
      const response = await fetch(
        `${apiUrl}/${resource}?${new URLSearchParams(query)}`,
        {
          method: "GET",
          headers,
        }
      );
      console.log(response.ok);
      if (!response.ok) {
        console.log("ahahahhaha")
        throw new Error(response.statusText);
      }
      const { data, total } = await response.json();
      return {
        data: data,
        total: total,
      };
    } catch (error) {
      throw new Error(`Error fetching ${resource}: ${error.message}`);
    }
  },
  async create(resource, params) {
    const token = getJwtTokenFromCookies();
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    try {
      const response = await fetch(`${apiUrl}/${resource}`, {
        method: "POST",
        headers,
        body: JSON.stringify(params.data),
      });
     /*  if (!response.ok) {
        throw new Error(response.statusText);
      } */
      /* const data = await response.json();
      console.log(data);
      return {
        data: data,
      }; */
      return response;
    } catch (error) {
      throw new Error(`Error creating ${resource}: ${error.message}`);
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
        method: "GET",
        headers,
      });
     
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      if (!data.id) {
        throw new Error('API response is missing the "id" attribute');
      }
      return {
        data: data,
      };
    } catch (error) {
      throw new Error(`Request Error ${resource}: ${error.message}`);
    }
  },
  async update(resource, params) {
    const token = getJwtTokenFromCookies();
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    try {
      const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(params.data),
      });
      /* if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json(); */
      return response;
        
      
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
        method: "DELETE",
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
  },
};
export default customDataProvider;