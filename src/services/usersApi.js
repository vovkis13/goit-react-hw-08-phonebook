import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
  endpoints: builder => ({
    getCurrentUser: builder.query({
      query: () => ({ url: '/users/current', method: 'GET' }),
      providesTags: ['User'],
    }),
    signupUser: builder.mutation({
      query: user => ({ url: '/users/signup', method: 'POST', data: user }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: user => ({ url: '/users/login', method: 'POST', data: user }),
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: () => ({ url: '/users/logout', method: 'POST' }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = usersApi;
