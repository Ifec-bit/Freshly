const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require auth
router.use(authMiddleware);

// GET /items — fetch all items for logged-in user
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('food_items')
    .select('*')
    .eq('user_id', req.user.id)
    .order('expiry_date', { ascending: true });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
});

// POST /items — add a new item
router.post('/', async (req, res) => {
  const { name, category, expiry_date, quantity } = req.body;

  if (!name || !category || !expiry_date) {
    return res.status(400).json({ error: 'name, category and expiry_date are required' });
  }

  const { data, error } = await supabase
    .from('food_items')
    .insert([{ user_id: req.user.id, name, category, expiry_date, quantity: quantity || 1 }])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
});

// PUT /items/:id — update an item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('food_items')
    .update(updates)
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data[0]);
});

// DELETE /items/:id — delete an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('food_items')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Item deleted successfully' });
});

module.exports = router;