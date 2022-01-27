import axios from 'axios';

axios.defaults.baseURL = 'https://61c9aac920ac1c0017ed8d58.mockapi.io/contacts';
const url = '/contacts';
export const getItems = async function () {
  const { data } = await axios.get(url);
  return data;
};

export const postItem = async function (contact) {
  const { data } = await axios.post(url, contact);
  return data;
};

export const deleteItem = async function (id) {
  await axios.delete(`${url}/${id}`);
  return id;
};
