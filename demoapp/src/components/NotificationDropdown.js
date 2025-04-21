import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/NotificationDropdown.css'; // Create and style this CSS file
 
const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
 
  useEffect(() => { axios.get(`https://localhost:7274/api/Notification`)
      .then(response => setNotifications(response.data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);
 
  return (
    <div className="admin-notification-container">
      {/* <button className="notification-icon" onClick={() => setShowDropdown(!showDropdown)}>
        <img src="/bell.png" alt="Notifications" />
      </button> */}
      {showDropdown && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <div className="notification-item">No new notifications</div>
          ) : (
            notifications.map((note, index) => (
              <div key={index} className="notification-item">
                {note.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
 
export default NotificationDropdown;