import React from 'react';
import { MessageCircle, UserPlus, AtSign } from 'lucide-react';

const mockNotifications = [
  {
    id: '1',
    type: 'answer',
    message: 'jane_smith answered your question about SQL joins',
    isRead: false,
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    type: 'mention',
    message: 'dev_mike mentioned you in a comment',
    isRead: false,
    createdAt: new Date('2024-01-15T09:15:00')
  },
  {
    id: '3',
    type: 'answer',
    message: 'New answer on: React Hook useEffect dependency array',
    isRead: true,
    createdAt: new Date('2024-01-14T16:20:00')
  }
];

export default function NotificationDropdown() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'answer':
        return <MessageCircle className="h-4 w-4" />;
      case 'mention':
        return <AtSign className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutes
    
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
      <div className="px-4 py-2 border-b border-gray-700">
        <h3 className="text-white font-medium">Notifications</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
              !notification.isRead ? 'bg-gray-750' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`mt-1 ${!notification.isRead ? 'text-orange-500' : 'text-gray-400'}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!notification.isRead ? 'text-white' : 'text-gray-300'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(notification.createdAt)}
                </p>
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-2 border-t border-gray-700">
        <button className="text-orange-500 hover:text-orange-400 text-sm transition-colors duration-200">
          Mark all as read
        </button>
      </div>
    </div>
  );
}