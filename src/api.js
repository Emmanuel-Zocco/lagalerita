import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5173';

export const updateProducts = async (updatedProducts) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products`, updatedProducts);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update products');
  }
};
