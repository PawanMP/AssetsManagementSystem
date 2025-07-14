import React, { useState } from 'react';
import { Shield, Eye, EyeOff, User, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useUser } from '../../contexts/UserContext';

const demoCredentials = [
  {
    email: 'superadmin@saegis.edu',
    password: 'admin123',
    role: 'Super Admin',
    description: 'Full system access'
  },
  {
    email: 'admin@saegis.edu',
    password: 'admin123',
    role: 'Admin',
    description: 'Asset & user management (no admin creation)'
  }
];

export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For demo purposes, simulate authentication
      const demoUser = demoCredentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (demoUser) {
        let role = 'admin';
        let name = 'Demo User';

        if (demoUser.role === 'Super Admin') {
          role = 'super_admin';
          name = 'Sarah Johnson';
        } else if (demoUser.role === 'Admin') {
          role = 'admin';
          name = 'Mike Wilson';
        }

        const user = {
          id: '1',
          name,
          email: demoUser.email,
          role,
          avatar: `https://images.pexels.com/photos/${
            role === 'super_admin' ? '415829' : '2379004'
          }/pexels-photo-${
            role === 'super_admin' ? '415829' : '2379004'
          }.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        };

        setUser(user); // This should update context AND save to localStorage if your context handles that
        onLogin(); // Trigger parent callback (like redirect)
      } else {
        setError('Invalid credentials. Please use the demo credentials provided.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (credentials) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-xl">
            <div className="relative">
              {/* Saegis logo design */}
              <div className="mx-auto h-20 w-20 rounded-full overflow-hidden shadow-xl border-2 border-white">
                <img
                  src="/photo/logo.jpeg"
                  alt="Saegis Logo"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Saegis Campus</h2>
          <h3 className="text-xl font-semibold text-cyan-100 mb-2">
            Asset Management System
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 border border-cyan-100">
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <User className="h-4 w-4 mr-2 text-cyan-600" />
              Admin Login Credentials
            </h4>
            <div className="space-y-2">
              {demoCredentials.map((cred, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoCredentials(cred)}
                  className="w-full text-left p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-cyan-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium text-gray-800">{cred.role}</p>
                      <p className="text-xs text-gray-600">{cred.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{cred.description}</p>
                      <p className="text-xs font-mono text-gray-400">
                        Password: {cred.password}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!email || !password}
            >
              <Lock className="h-4 w-4 mr-2" />
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
