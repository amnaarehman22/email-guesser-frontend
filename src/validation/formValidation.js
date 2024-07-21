export const validateForm = (fullName, domain) => {
    if (!fullName || !domain) {
      return { isValid: false, message: 'Both fields are required' };
    }
    // Add more validation rules as needed
    return { isValid: true };
  };
  