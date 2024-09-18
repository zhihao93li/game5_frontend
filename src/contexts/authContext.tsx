import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, RegisterRequest, LoginRequest } from '../types';
import { login, registerAndLogin, logout } from '../services/auth';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (loginData: LoginRequest | { token: string; user: User }) => Promise<void>;
  registerAndLogin: (registerData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getLocalStorageItem<User>('user');
    const storedToken = getLocalStorageItem<string>('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, []);

  const loginHandler = async (loginData: LoginRequest | { token: string; user: User }) => {
    try {
      let response;
      if ('token' in loginData) {
        // 处理第三方认证返回的数据
        response = { user: loginData.user, token: loginData.token };
      } else {
        // 处理普通登录
        response = await login(loginData);
      }
      setUser(response.user);
      setIsAuthenticated(true);
      setLocalStorageItem('user', response.user);
      setLocalStorageItem('token', response.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // const registerHandler = async (registerData: RegisterRequest) => {
  //   try {
  //     const response = await register(registerData);
  //     setUser(response.user);
  //     setIsAuthenticated(true);
  //     setLocalStorageItem('user', response.user);
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //     throw error;
  //   }
  // };

  const registerAndLoginHandler = async (registerData: RegisterRequest) => {
    try {
      const response = await registerAndLogin(registerData);
      setUser(response.user);
      setIsAuthenticated(true);
      setLocalStorageItem('user', response.user);
      setLocalStorageItem('token', response.token);
    } catch (error) {
      console.error('Registration and login failed:', error);
      throw error;
    }
  };

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // 无论后端请求成功与否，我们都清除本地状态
      setUser(null);
      setIsAuthenticated(false);
      removeLocalStorageItem('user');
      removeLocalStorageItem('token');
      navigate('/'); // 重定向到首页
    }
  };

  const value = {
    user,
    isAuthenticated,
    isInitialized,
    login: loginHandler,
    registerAndLogin: registerAndLoginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
