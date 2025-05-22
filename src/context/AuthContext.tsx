import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
}

interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  isAgency: boolean;
  bio?: string;
  profilePicture?: string;
}

interface SignupData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  companyName: string;
  isAgency: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, accept any email with a password
        if (password.length >= 6) {
          // Check if we have a stored user with this email
          const storedUser = localStorage.getItem('user');
          let userData: User;
          
          if (storedUser) {
            userData = JSON.parse(storedUser);
            if (userData.email !== email) {
              reject(new Error('Email not found'));
              return;
            }
          } else {
            // Create a demo user if none exists
            userData = {
              fullName: 'Marry Doe',
              email: email,
              phoneNumber: '123-456-7890',
              companyName: 'PopX Inc',
              isAgency: false,
              bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nam natoque elementum tempor volutpat ut labore et dolore magna aliquam erat. Sed diam.',
              profilePicture: 'https://i.pravatar.cc/150?img=32'
            };
          }
          
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const signup = async (userData: SignupData) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...userData,
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nam natoque elementum tempor volutpat ut labore et dolore magna aliquam erat. Sed diam.',
          profilePicture: 'https://i.pravatar.cc/150?img=32'
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};