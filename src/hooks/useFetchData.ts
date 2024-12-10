import api from "../services/api";
import { Company } from "../store/types";

const useFetchData = (company: Company | undefined) => {
  const fetchData = async (endpoint: string, errorMessage: string): Promise<any[]> => {
    if (!company?.id) return [];
    try {
      const response = await api.get(`/${company.id}/${endpoint}`);
      return response.data;
    } catch {
      throw new Error(errorMessage);
    }
  };

  return { fetchData };
};

export default useFetchData;