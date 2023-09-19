import axios from "axios";
import { stringify } from "query-string";
import { fetchUtils } from "react-admin";
import { getJwtTokenFromCookies } from "./authUtils";
import {API_URL} from '../consts'
const apiUrl = API_URL;

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = getJwtTokenFromCookies();
    options.headers.set("Authorization", `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      page,
      perPage,
      sort: field,
      order,
    };
    const url = `${apiUrl}/${resource}`;
    const { headers, json } = await httpClient(`${url}?${stringify(query)}`);
    return {
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  // Add other CRUD methods as needed
};

export default dataProvider;
