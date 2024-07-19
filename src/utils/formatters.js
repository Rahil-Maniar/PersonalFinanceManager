/* eslint-disable prettier/prettier */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  export const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };
