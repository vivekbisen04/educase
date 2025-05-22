import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="mb-6">
        <Logo />
      </div>
      
      <div className="max-w-md mx-auto mt-12 w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PopX</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            variant="primary"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </Button>
          
          <Button 
            variant="secondary"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;