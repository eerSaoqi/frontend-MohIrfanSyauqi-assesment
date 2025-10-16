import { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Settings = () => {
  const { isDark, toggle } = useDarkMode();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    lowFuel: true,
    maintenance: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your application preferences
        </p>
      </div>

      {/* Appearance */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="dark-mode-toggle" className="font-medium text-gray-900 dark:text-white">
                Dark Mode
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Switch between light and dark theme
              </p>
            </div>
            <button
              id="dark-mode-toggle"
              type="button"
              role="switch"
              aria-checked={isDark}
              onClick={toggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                isDark ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="email-notifications" className="font-medium text-gray-900 dark:text-white">
                Email Notifications
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive email updates about your trucks
              </p>
            </div>
            <button
              id="email-notifications"
              type="button"
              role="switch"
              aria-checked={notifications.email}
              onClick={() => handleNotificationChange('email')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                notifications.email ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.email ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="push-notifications" className="font-medium text-gray-900 dark:text-white">
                Push Notifications
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive push notifications in browser
              </p>
            </div>
            <button
              id="push-notifications"
              type="button"
              role="switch"
              aria-checked={notifications.push}
              onClick={() => handleNotificationChange('push')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                notifications.push ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.push ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="low-fuel-alert" className="font-medium text-gray-900 dark:text-white">
                Low Fuel Alerts
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Alert when truck fuel is below 30%
              </p>
            </div>
            <button
              id="low-fuel-alert"
              type="button"
              role="switch"
              aria-checked={notifications.lowFuel}
              onClick={() => handleNotificationChange('lowFuel')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                notifications.lowFuel ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.lowFuel ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="maintenance-reminder" className="font-medium text-gray-900 dark:text-white">
                Maintenance Reminders
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remind about scheduled maintenance
              </p>
            </div>
            <button
              id="maintenance-reminder"
              type="button"
              role="switch"
              aria-checked={notifications.maintenance}
              onClick={() => handleNotificationChange('maintenance')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                notifications.maintenance ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.maintenance ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          User Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue="Admin User"
              className="input"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="admin@truckmon.com"
              className="input"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <input
              id="role"
              type="text"
              defaultValue="Administrator"
              className="input"
              disabled
            />
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* System */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          System
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Version</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">1.0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Oct 14, 2025</span>
          </div>
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <button className="btn btn-secondary w-full">
              Check for Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
