import axios from 'axios';

const API_URL = 'http://localhost:3050/api'; 

export const deriveEmail = async (fullName, domain) => {
  try {
    const response = await axios.post(`${API_URL}/derive-email`, { fullName, domain });
    return { success: true, data: response.data }; 
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'An error occurred while deriving the email',
    };
  }
};
