const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Registration successful', user: data.user });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ token: data.session.access_token, user: data.user });
});

// POST /auth/logout
router.post('/logout', async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;