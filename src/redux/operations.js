import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, postItem, deleteItem } from 'services/api';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_state, { rejectWithValue }) => {
    try {
      const contacts = await getItems();
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const postContact = createAsyncThunk(
  'contacts/postContact',
  async (contact, { rejectWithValue }) => {
    try {
      const newContact = await postItem(contact);
      return newContact;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await deleteItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
