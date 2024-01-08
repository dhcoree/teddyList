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

const BASE_URL = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test';

export const fetchPartnersData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/partners`);
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error)
        throw error;
    }
};