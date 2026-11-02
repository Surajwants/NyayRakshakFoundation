import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../api/client';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeAlert, setActiveAlert] = useState(null);

  const fetchNotifications = async () => {
    try {
      const data = await api.notifications.getAll();
      setNotifications(data);
      setUnreadCount(data.length);
    } catch (err) {
      console.warn('Could not fetch notifications:', err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const triggerAppAlert = (title, message) => {
    setActiveAlert({ title, message, id: Date.now() });
    setTimeout(() => {
      setActiveAlert(null);
    }, 4500);
  };

  const markAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        activeAlert,
        fetchNotifications,
        triggerAppAlert,
        markAllRead
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
export default NotificationContext;
