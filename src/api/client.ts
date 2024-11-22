import axios, { AxiosError } from 'axios';
import { User } from '../types/user';

const API_URL = 'http://localhost:8000';

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'agent' | 'user';
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error.response?.data || { message: error.message };
  }
);

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log('Attempting login for:', email);
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await axios.post<LoginResponse>(`${API_URL}/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true
    });

    console.log('Login response:', response.data);

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    }
    throw new Error('No access token received');
  } catch (error) {
    console.error('Login error details:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
    throw error;
  }
};