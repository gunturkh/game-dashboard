import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/admin/login',
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: '/admin/users',
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data
    }),
  }),
});
export const { useRegisterUserMutation, useLoginMutation, useCreateUserMutation } = authApi;
