import axios from "axios";

const api = axios.create({
    baseURL: 'https://655cf25525b76d9884fe3153.mockapi.io/v1/'
});

export const fetchCompanies = async () => {
    try {
        const response = await api.get('/external-companies');
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error)
        throw error;
    }
};