import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const encodedUser = params.get('user');

    if (token && encodedUser) {
      try {
        const user = JSON.parse(decodeURIComponent(encodedUser));
        login({ token, user });
        localStorage.setItem('token', token);
        console.log('Token stored:', token);
        navigate('/quiz-sets');
      } catch (error) {
        console.error('解析用户信息时出错:', error);
        navigate('/auth', { state: { error: '认证过程中出错，请重试。' } });
      }
    } else {
      navigate('/auth', { state: { error: '认证失败，请重试。' } });
    }
  }, [location, login, navigate]);

  return <div>正在处理认证...</div>;
};

export default AuthCallback;
