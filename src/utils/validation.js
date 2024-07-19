/* eslint-disable prettier/prettier */

/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = email => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
export const validatePassword = password => {
  return password.length >= 8;
};

/**
 * Validates an amount to ensure it is a positive number.
 * @param {string | number} amount - The amount to validate.
 * @returns {boolean} - True if the amount is valid, false otherwise.
 */
export const validateAmount = amount => {
  const parsedAmount = parseFloat(amount);
  return !isNaN(parsedAmount) && isFinite(parsedAmount) && parsedAmount > 0;
};

/**
 * Validates a category to ensure it is not empty.
 * @param {string} category - The category to validate.
 * @returns {boolean} - True if the category is valid, false otherwise.
 */
export const validateCategory = category => {
  return category.trim().length > 0;
};

/**
 * Validates a goal name to ensure it is not empty.
 * @param {string} name - The goal name to validate.
 * @returns {boolean} - True if the goal name is valid, false otherwise.
 */
export const validateGoalName = name => {
  return name.trim().length > 0;
};

/**
 * Validates a target amount to ensure it is a positive number.
 * @param {string | number} amount - The target amount to validate.
 * @returns {boolean} - True if the target amount is valid, false otherwise.
 */
export const validateTargetAmount = amount => {
  return validateAmount(amount);
};
