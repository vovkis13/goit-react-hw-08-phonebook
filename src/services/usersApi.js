import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: 'https://connections-api.herokuapp.com' }) =>
  async ({ url, method, data }, { getState }) => {
    try {
      const token = getState().token;
      axios.defaults.headers.common.Authorization = token ? `${token}` : '';
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
  endpoints: builder => ({
    getCurrentUser: builder.query({
      query: token => ({ url: '/users/current', method: 'GET' }),
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
      query: token => ({ url: '/users/logout', method: 'POST' }),
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
