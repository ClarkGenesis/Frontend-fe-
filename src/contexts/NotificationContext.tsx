import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string; // Unique ID for the notification (e.g., app_id + timestamp + status for user, or similar for admin)
  message: string;
  type: 'pending' | 'approved' | 'disapproved' | 'info'; // Added 'info' for general admin notifications
  timestamp: string;
  read: boolean;
  link: string;
  applicationId?: number; // Optional: specific application this notification refers to
  targetStatus?: string; // Add this field
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addManualNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  fetchNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  const generateNotificationId = (appId: number, status: string, timestamp: string, userId?: number) => {
    return `${userId || 'admin'}-${appId}-${status}-${timestamp}`;
  };

  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    try {
      let response;
      if (user.role === 'admin') {
        response = await api.get('/application-requests'); // Endpoint for all applications (admin)
      } else {
        response = await api.get('/user/application-requests'); // Endpoint for user-specific applications
      }

      if (response.data && Array.isArray(response.data)) {
        const newNotificationsFromApi: Notification[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.forEach((application: any) => {
          if (application.status && typeof application.status === 'string') {
            const statusEntries = application.status.split(',');
            const latestEntry = statusEntries[statusEntries.length - 1];
            const [status, timestamp] = latestEntry.split('|');
            const trimmedStatus = status.trim();
            const trimmedTimestamp = timestamp.trim();

            const notificationId = generateNotificationId(
              application.id,
              trimmedStatus,
              trimmedTimestamp,
              user.role === 'user' ? user.id : undefined // Include user ID for user-specific notifications if needed for ID generation
            );

            const existingNotification = notifications.find(n => n.id === notificationId);

            if (!existingNotification) {
              let type: Notification['type'] = 'info';
              let message = '';
              let link = '/Status'; // Default for user

              if (user.role === 'admin') {
                link = '/ApplicationRequest'; // Link for admin
                const appUserName = application.user?.name || 'a user'; // Assuming app has a user object with name
                if (trimmedStatus === 'Approved') {
                  type = 'approved';
                  message = `Application for ${appUserName} (ID: ${application.id}) has been approved.`;
                } else if (trimmedStatus === 'Disapproved') {
                  type = 'disapproved';
                  message = `Application for ${appUserName} (ID: ${application.id}) has been disapproved.`;
                } else if (trimmedStatus === 'Pending') {
                  type = 'pending';
                  message = `New application (ID: ${application.id}) submitted by ${appUserName}.`;
                } else {
                  return; 
                }
              } else { // User role
                if (trimmedStatus === 'Approved') {
                  type = 'approved';
                  message = `Your application has been approved!`;
                } else if (trimmedStatus === 'Disapproved') {
                  type = 'disapproved';
                  message = `Your application has been disapproved.`;
                } else if (trimmedStatus === 'Pending') {
                  type = 'pending';
                  message = `Your application is now pending.`;
                } else {
                  return; 
                }
              }
              
              newNotificationsFromApi.push({
                id: notificationId,
                message,
                type,
                timestamp: trimmedTimestamp,
                read: false, 
                link,
                applicationId: application.id,
                targetStatus: trimmedStatus
              });
            }
          }
        });

        if (newNotificationsFromApi.length > 0) {
          setNotifications(prev => {
            const currentNotificationIds = new Set(prev.map(n => n.id));
            const trulyNewNotifications = newNotificationsFromApi.filter(n => !currentNotificationIds.has(n.id));
            if (trulyNewNotifications.length === 0) return prev; // No new notifications to add
            
            const allNotifications = [...trulyNewNotifications, ...prev];
            return allNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          });
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [user, notifications]); 

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  const addManualNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: `manual-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      applicationId: notification.applicationId,
      ...notification,
    };
    setNotifications(prev => [newNotification, ...prev].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const value = {
    notifications,
    unreadCount,
    addManualNotification,
    markAsRead,
    markAllAsRead,
    fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 