import React, { createContext, useState, useContext } from 'react';
import { api } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('CLIENT'); // 'CLIENT' or 'ADVOCATE'
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Send OTP with simulated instant delivery
  const sendOtp = async (phone, selectedRole) => {
    setIsLoading(true);
    try {
      const res = await api.auth.sendOtp(phone, selectedRole || role);
      setIsLoading(false);
      return res;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  // Verify OTP and store user profile
  const verifyOtp = async (phone, otp, selectedRole) => {
    setIsLoading(true);
    try {
      const res = await api.auth.verifyOtp(phone, otp, selectedRole || role);
      if (res.success && res.user) {
        setUser(res.user);
        setRole(res.user.role || selectedRole || 'CLIENT');
        setToken(res.token);
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    if (user) {
      setUser({
        ...user,
        role: newRole,
        fullName: newRole === 'ADVOCATE' ? 'Adv. Rajeshwar Pandey' : 'Vikram Singh'
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated: !!user,
        isLoading,
        sendOtp,
        verifyOtp,
        logout,
        switchRole,
        setRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
