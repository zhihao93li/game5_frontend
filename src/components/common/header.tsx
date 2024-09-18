import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/authContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Quiz Game</Link>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span>Welcome, {user.nickname}</span>
              <Button onClick={logout} variant="outline">
                Log out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;