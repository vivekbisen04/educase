import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.fullName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <button 
                  className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                  aria-label="Change profile picture"
                >
                  <Camera size={16} />
                </button>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.fullName}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
              <p className="text-gray-700">
                {user.bio || 'No bio provided.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Company</h3>
                <p className="text-gray-900">{user.companyName || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-gray-900">{user.phoneNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Account Type</h3>
                <p className="text-gray-900">{user.isAgency ? 'Agency' : 'Individual'}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 max-w-xs"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;