import axios from "axios";

const api = axios.create({
    baseURL: 'https://expense-tracker.b.goit.study/api'
});

export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};