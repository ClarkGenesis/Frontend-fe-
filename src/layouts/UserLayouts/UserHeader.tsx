import { useState, useEffect } from "react";
import ProfIcon from "../../assets/photos/user-avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useNotifications, Notification } from '../../contexts/NotificationContext';
import { useSidebar } from '../../contexts/SidebarContext';

function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { setShowLogoutModal } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, fetchNotifications } = useNotifications();
  const { isCollapsed: sidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  // Fetch notifications periodically
  useEffect(() => {
    fetchNotifications();
    
    // Refresh notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (notifOpen && !target.closest('.notification-container')) {
        setNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notifOpen]);

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setNotifOpen(false);
    
    // Store the status before navigation
    if (notification.type === 'approved' || notification.type === 'disapproved' || notification.type === 'pending') {
      sessionStorage.setItem('scrollToStatus', notification.type.charAt(0).toUpperCase() + notification.type.slice(1));
    }
    
    navigate(notification.link);
  };

  return (
    <header className="app-header sticky bg-red-600" id="header">
      <div className="main-header-container container-fluid">
        <div className="header-content-left flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-red-700 p-2 rounded-lg transition-colors duration-200"
            aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <i className="bi bi-list text-2xl"></i>
          </button>
          <div className="header-element">
            <div className="horizontal-logo">
              <a href="index.html" className="header-logo">
                <img
                  src="/assets/images/brand-logos/desktop-logo.png"
                  alt="logo"
                  className="desktop-logo"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative notification-container">
            <div className="relative">
              <i
                className="bi bi-bell-fill text-white"
                style={{ fontSize: "1rem", cursor: "pointer" }}
                onClick={() => setNotifOpen(!notifOpen)}
              ></i>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            {notifOpen && (
              <div className="absolute right-0 mt-6 w-96 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                <div className="flex justify-between items-center bg-gray-100 px-4 py-2 sticky top-0 z-10">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        markAllAsRead();
                      }} 
                      className="text-xs text-blue-600 hover:text-blue-800 py-1 px-2"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                  {notifications.length === 0 ? (
                    <p className="px-4 py-3 text-gray-600 text-sm">No notifications</p>
                  ) : (
                    notifications.map((notification: Notification) => (
                      <div 
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                            notification.type === 'approved' ? 'bg-green-500' : 
                            notification.type === 'disapproved' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center focus:outline-none p-3"
            >
              <img
                src={ProfIcon}
                alt="Profile"
                className="w-11 h-11 rounded-full border border-black"
              />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-lg py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-300">
                  Profile
                </Link>
                <Link
                  to="/Settings"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-300">
                  Settings
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-left w-full block px-4 py-2 text-gray-700 hover:bg-gray-300">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
