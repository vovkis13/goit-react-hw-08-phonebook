import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://61c9aac920ac1c0017ed8d58.mockapi.io/contacts/contacts',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getItems: builder.query({
      query: () => '',
      providesTags: ['Contact'],
    }),
    postItem: builder.mutation({
      query: contact => ({ url: '', method: 'POST', body: contact }),
      invalidatesTags: ['Contact'],
    }),
    deleteItem: builder.mutation({
      query: id => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const { useGetItemsQuery, usePostItemMutation, useDeleteItemMutation } =
  contactsApi;
