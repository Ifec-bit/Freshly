const supabase = require('../db/supabase');

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

const runExpiryChecker = async () => {
  console.log('[ExpiryChecker] Running...');

  const { data: items, error } = await supabase
    .from('food_items')
    .select('id, expiry_date');

  if (error) {
    console.error('[ExpiryChecker] Failed to fetch items:', error.message);
    return;
  }

  for (const item of items) {
    const newStatus = computeStatus(item.expiry_date);
    await supabase
      .from('food_items')
      .update({ status: newStatus })
      .eq('id', item.id);
  }

  console.log(`[ExpiryChecker] Updated ${items.length} items`);
};

module.exports = runExpiryChecker;