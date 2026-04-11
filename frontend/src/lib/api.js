import { supabase } from './supabase';

const computeStatus = (expiryDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0)  return 'EXPIRED';
  if (daysLeft <= 2) return 'URGENT';
  if (daysLeft <= 7) return 'EXPIRING_SOON';
  return 'FRESH';
};

export const getItems = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .eq('user_id', user.id)
    .order('expiry_date', { ascending: true });
  if (error) throw error;
  return data;
};

export const addItem = async (item) => {
  const { data: { user } } = await supabase.auth.getUser();
  const status = computeStatus(item.expiry_date);
  const { data, error } = await supabase
    .from('food_items')
    .insert([{ ...item, user_id: user.id, status }])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('food_items')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteItem = async (id) => {
  const { error } = await supabase
    .from('food_items')
    .delete()
    .eq('id', id);
  if (error) throw error;
};