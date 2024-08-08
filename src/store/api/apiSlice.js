import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = import.meta.env.VITE_API_URL
// console.log('API_URL', API_URL)

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      let token = null
      console.log('getState', getState())
      if (localStorage.getItem('token')) {
        token = JSON.parse(localStorage.getItem('token'))
      }
      if (token) {
        // include token in req header
        headers.set('Authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (builder) => ({}),
});
