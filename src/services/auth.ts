import { auth } from './api';
import { AuthResponse, RegisterRequest, LoginRequest, RegisterResponse } from '../types';

export const register = async (registerData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await auth.register(registerData);
  return response.data;
};

export const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
  const response = await auth.login(loginData);
  return response.data;
};

export const registerAndLogin = async (registerData: RegisterRequest): Promise<AuthResponse> => {
  const response = await auth.registerAndLogin(registerData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await auth.logout();
};

export const googleAuth = (): void => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
};

export const facebookAuth = (): void => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/facebook`;
};

export const twitterAuth = (): void => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/twitter`;
};
