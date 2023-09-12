const BASE_URL = "http://127.0.0.1:8080";

const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Error fetching data from ${endpoint}`);
  }

  return response;

  const data = await response.json();
  return data;
};

export default fetchApi;

/* OPTIONS TO USE IT:

// src/services/userService.js

import fetchApi from '../utils/api';

const userService = {
  getUser: async (userId) => {
    const data = await fetchApi(`/users/${userId}`);
    return data;
  },

  // Other methods for user-related API calls
};

export default userService;

OR

import fetchApi from './api';

const userService = {
  getUser: async (userId) => {
    return fetchApi(`/users/${userId}`);
  },

  updateUser: async (userId, userData) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    return fetchApi(`/users/${userId}`, options);
  },

  // Other methods for user-related API calls
};

export default userService;

*/
