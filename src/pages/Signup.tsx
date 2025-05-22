import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import RadioGroup from '../components/RadioGroup';
import { useAuth } from '../context/AuthContext';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  companyName: string;
  isAgency: boolean;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false,
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when field is being changed
    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleRadioChange = (value: boolean | string) => {
    setFormData((prev) => ({ ...prev, isAgency: value as boolean }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await signup(formData);
      navigate('/profile');
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create your PopX account
          </h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            error={errors.fullName}
          />
          
          <Input
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            error={errors.phoneNumber}
          />
          
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            error={errors.email}
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            error={errors.password}
          />
          
          <Input
            id="companyName"
            label="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
          
          <RadioGroup
            name="isAgency"
            label="Are you an Agency?"
            options={[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ]}
            value={formData.isAgency}
            onChange={handleRadioChange}
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            className="text-purple-600 hover:text-purple-800"
            onClick={() => navigate('/')}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;