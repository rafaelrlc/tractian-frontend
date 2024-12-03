import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCompanyData = async (companyId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${companyId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};