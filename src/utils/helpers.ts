import { AxiosError } from 'axios';

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};


export function getLocalStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (item === null) {
    return null;
  }
  try {
    return JSON.parse(item) as T;
  } catch {
    return item as unknown as T;
  }
}

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || '发生未知错误，请稍后再试。';
  }
  return '发生未知错误，请稍后再试。';
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};
