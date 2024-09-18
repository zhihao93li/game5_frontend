import axios from 'axios';
import { AuthResponse, RegisterRequest, LoginRequest, RegisterResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 拦截器添加token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.replace(/"/g, '')}`;
      console.log('Request headers:', config.headers);
    } else {
      console.log('No token found in localStorage');
    }
    console.log('Full config:', config);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// 认证相关接口
export const auth = {
  register: (registerData: RegisterRequest) =>
    api.post<RegisterResponse>('/auth/register', registerData),
  login: (loginData: LoginRequest) =>
    api.post<AuthResponse>('/auth/login', loginData),
  registerAndLogin: (registerData: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register-and-login', registerData),
  logout: () => api.post('/auth/logout').catch(error => {
    console.error('Logout API error:', error.response?.data);
    if (error.response?.status === 401) {
        // 如果用户未认证，我们仍然清除本地状态
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Token and user removed from localStorage');
        return Promise.resolve();
      }
      throw error;
    }),
  googleAuth: () => api.get('/auth/google'),
  facebookAuth: () => api.get('/auth/facebook'),
  twitterAuth: () => api.get('/auth/twitter'),
};

// 题库相关接口
export const quizSets = {
  getAll: () => api.get('/quiz-sets'),
  getOne: (quizSetId: string) => api.get(`/quiz-sets/${quizSetId}`),
  resetAnswerRecord: (quizSetId: string) =>
    api.post(`/quiz-sets/reset-answer-record/${quizSetId}`),
  getSummary: (quizSetId: string) => api.get(`/quiz-sets/summary/${quizSetId}`),
};

// 问题相关接口
export const questions = {
  getNext: (quizSetId: string) => api.get(`/questions/next/${quizSetId}`),
  getSpecific: (quizSetId: string, orderInSet: number) =>
    api.get(`/questions/${quizSetId}/${orderInSet}`),
  submitAnswer: (quizSetId: string, optionNumber: string, orderInSet: number) =>
    api.post(`/questions/submit/${quizSetId}`, { optionNumber, orderInSet }),
};

export default api;
