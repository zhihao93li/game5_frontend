import React from 'react';
import AuthForm from '@/components/auth/authForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
