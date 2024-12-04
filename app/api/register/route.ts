import axios from 'axios';

interface RegistrationData {
  email: string;
  password: string;
  name: string;
}

export const registerUser = async (userData: RegistrationData) => {
  try {
    const response = await axios.post('http://localhost:3000/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific axios error
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    // Handle generic error
    throw new Error('An unexpected error occurred');
  }
};