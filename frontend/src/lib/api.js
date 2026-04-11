import axios from 'axios';
import { supabase } from './supabase';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getAuthHeader = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return { Authorization: `Bearer ${session?.access_token}` };
};

export const getItems = async () => {
  const headers = await getAuthHeader();
  const res = await axios.get(`${BASE_URL}/items`, { headers });
  return res.data;
};

export const addItem = async (item) => {
  const headers = await getAuthHeader();
  const res = await axios.post(`${BASE_URL}/items`, item, { headers });
  return res.data;
};

export const updateItem = async (id, updates) => {
  const headers = await getAuthHeader();
  const res = await axios.put(`${BASE_URL}/items/${id}`, updates, { headers });
  return res.data;
};

export const deleteItem = async (id) => {
  const headers = await getAuthHeader();
  const res = await axios.delete(`${BASE_URL}/items/${id}`, { headers });
  return res.data;
};