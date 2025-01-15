import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';


// Signup
export const registerUser = async (formData) => {
    return await axios.post(`${API_URL}/signup`, formData);
};


// Login
export const loginUser = async (formData) => {
    return await axios.post(`${API_URL}/login`, formData);
    };
