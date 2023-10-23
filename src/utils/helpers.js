
// We want to make this function work for both Date objects and strings (which come from Supabase)

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
    value
  );

