'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  Clock, 
  TrendingUp, 
  Calendar,
  UserCheck,
  BarChart3,
  Settings,
  LogIn
} from 'lucide-react';

// Types
interface LoginData {
  id: string;
  userId: string;
  username: string;
  email: string;
  loginTime: Date;
  ipAddress: string;
  device: string;
}

interface LoginStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

interface HourlyLogin {
  hour: number;
  count: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'settings'>('overview');
  const [logins, setLogins] = useState<LoginData[]>([]);
  const [stats, setStats] = useState<LoginStats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });
  const [hourlyData, setHourlyData] = useState<HourlyLogin[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState<'admin' | 'user' | ''>('');

  // Check localStorage for existing authentication
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated');
    const savedEmail = localStorage.getItem('userEmail');
    const savedUserType = localStorage.getItem('userType') as 'admin' | 'user' | '';
    
    if (loggedIn === 'true' && savedEmail) {
      setIsAuthenticated(true);
      setUserEmail(savedEmail);
      setUserType(savedUserType);
    } else {
      // Redirect to home page if not authenticated
      window.location.href = '/';
    }
  }, []);

  // Mock data generation - Replace with actual API calls
  useEffect(() => {
    if (isAuthenticated) {
      generateMockData();
    }
  }, [selectedDate, isAuthenticated]);

  const generateMockData = () => {
    const mockLogins: LoginData[] = [];
    const now = new Date(selectedDate);
    
    // Generate 50 random logins
    for (let i = 0; i < 50; i++) {
      const randomHour = Math.floor(Math.random() * 24);
      const randomMinute = Math.floor(Math.random() * 60);
      const loginDate = new Date(now);
      loginDate.setHours(randomHour, randomMinute, 0, 0);
      
      mockLogins.push({
        id: `login-${i}`,
        userId: `user-${Math.floor(Math.random() * 20)}`,
        username: `user${Math.floor(Math.random() * 100)}`,
        email: `user${Math.floor(Math.random() * 100)}@example.com`,
        loginTime: loginDate,
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        device: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)]
      });
    }

    setLogins(mockLogins.sort((a, b) => b.loginTime.getTime() - a.loginTime.getTime()));

    // Calculate stats
    const today = new Date();
    const todayLogins = mockLogins.filter(l => 
      l.loginTime.toDateString() === today.toDateString()
    ).length;

    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const weekLogins = mockLogins.filter(l => l.loginTime >= weekAgo).length;

    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);
    const monthLogins = mockLogins.filter(l => l.loginTime >= monthAgo).length;

    setStats({
      total: mockLogins.length,
      today: todayLogins,
      thisWeek: weekLogins,
      thisMonth: monthLogins
    });

    // Calculate hourly distribution
    const hourly: { [key: number]: number } = {};
    for (let i = 0; i < 24; i++) {
      hourly[i] = 0;
    }
    
    mockLogins.forEach(login => {
      const hour = login.loginTime.getHours();
      hourly[hour]++;
    });

    setHourlyData(
      Object.entries(hourly).map(([hour, count]) => ({
        hour: parseInt(hour),
        count
      }))
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMaxCount = () => Math.max(...hourlyData.map(h => h.count), 1);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setUserType('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    window.location.href = '/';
  };

  const isAdminUser = userType === 'admin';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFE1E0' }}>
      {/* Home and Logout Buttons */}
      {isAuthenticated && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-4">
          {isAdminUser && (
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ background: 'linear-gradient(to right, #9B7EBD, #F49BAB)', color: '#FFE1E0' }}
            >
              <Activity className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{ backgroundColor: '#7F5561', color: '#FFE1E0' }}
          >
            <LogIn className="w-5 h-5 transform rotate-180" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      {isAuthenticated && (
        <div className="shadow-sm border-b" style={{ backgroundColor: '#FFE1E0', borderColor: '#9B7EBD' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 py-4">
              <button
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={activeTab === 'overview' ? { backgroundColor: '#9B7EBD', color: '#FFE1E0' } : { color: '#7F5561' }}
              >
                <Activity className="inline-block w-4 h-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={activeTab === 'users' ? { backgroundColor: '#9B7EBD', color: '#FFE1E0' } : { color: '#7F5561' }}
              >
                <Users className="inline-block w-4 h-4 mr-2" />
                User Management
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={activeTab === 'settings' ? { backgroundColor: '#9B7EBD', color: '#FFE1E0' } : { color: '#7F5561' }}
              >
                <Settings className="inline-block w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated && (
          <>
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#7F5561' }}>Total Logins</p>
                        <p className="text-3xl font-bold" style={{ color: '#7F5561' }}>{stats.total}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F49BAB' }}>
                        <Activity className="w-6 h-6" style={{ color: '#FFE1E0' }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#7F5561' }}>Today</p>
                        <p className="text-3xl font-bold" style={{ color: '#7F5561' }}>{stats.today}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#9B7EBD' }}>
                        <Clock className="w-6 h-6" style={{ color: '#FFE1E0' }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#7F5561' }}>This Week</p>
                        <p className="text-3xl font-bold" style={{ color: '#7F5561' }}>{stats.thisWeek}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F49BAB' }}>
                        <TrendingUp className="w-6 h-6" style={{ color: '#FFE1E0' }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#7F5561' }}>This Month</p>
                        <p className="text-3xl font-bold" style={{ color: '#7F5561' }}>{stats.thisMonth}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#9B7EBD' }}>
                        <Calendar className="w-6 h-6" style={{ color: '#FFE1E0' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hourly Distribution Chart */}
                <div className="p-6 rounded-xl shadow-sm mb-8" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center" style={{ color: '#7F5561' }}>
                      <BarChart3 className="w-5 h-5 mr-2" style={{ color: '#9B7EBD' }} />
                      Login Activity by Hour
                    </h2>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
                      style={{ border: '1px solid #9B7EBD', color: '#7F5561' }}
                    />
                  </div>
                  
                  <div className="flex items-end space-x-2 h-64">
                    {hourlyData.map((data) => {
                      const height = (data.count / getMaxCount()) * 100;
                      return (
                        <div key={data.hour} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex flex-col items-center justify-end h-56">
                            <div className="relative group w-full">
                              <div
                                className="transition-all duration-300 rounded-t w-full cursor-pointer"
                                style={{ height: `${Math.max(height, 2)}%`, backgroundColor: '#F49BAB' }}
                              />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {data.count} logins
                              </div>
                            </div>
                          </div>
                          <div className="text-xs mt-2" style={{ color: '#7F5561' }}>
                            {data.hour.toString().padStart(2, '0')}:00
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Logins Table */}
                <div className="rounded-xl shadow-sm" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                  <div className="p-6" style={{ borderBottom: '1px solid #9B7EBD' }}>
                    <h2 className="text-xl font-bold flex items-center" style={{ color: '#7F5561' }}>
                      <UserCheck className="w-5 h-5 mr-2" style={{ color: '#9B7EBD' }} />
                      Recent Login Activity
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#FFE1E0' }}>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>
                            Login Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>
                            IP Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>
                            Device
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ backgroundColor: 'white', borderColor: '#FFE1E0' }}>
                        {logins.slice(0, 10).map((login) => (
                          <tr key={login.id} className="transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm" style={{ backgroundColor: '#F49BAB', color: '#FFE1E0' }}>
                                  {login.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="ml-3 text-sm font-medium" style={{ color: '#7F5561' }}>
                                  {login.username}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#7F5561' }}>
                              {login.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm" style={{ color: '#7F5561' }}>{formatDate(login.loginTime)}</div>
                              <div className="text-sm" style={{ color: '#9B7EBD' }}>{formatTime(login.loginTime)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {login.ipAddress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#9B7EBD', color: '#FFE1E0' }}>
                                {login.device}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'users' && (
              <div className="rounded-xl shadow-sm p-6" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#7F5561' }}>User Management</h2>
                <p className="mb-6" style={{ color: '#7F5561' }}>
                  Manage users, permissions, and access controls.
                </p>
                <div className="space-y-4">
                  <button className="w-full md:w-auto px-6 py-3 rounded-lg transition-colors" style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)', color: '#FFE1E0' }}>
                    Add New User
                  </button>
                  <div className="border-t pt-6" style={{ borderColor: '#9B7EBD' }}>
                    <p className="italic" style={{ color: '#9B7EBD' }}>User management features coming soon...</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="rounded-xl shadow-sm p-6" style={{ backgroundColor: 'white', border: '1px solid #9B7EBD' }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#7F5561' }}>Settings</h2>
                <p className="mb-6" style={{ color: '#7F5561' }}>
                  Configure dashboard settings and preferences.
                </p>
                <div className="space-y-4">
                  <div className="border-t pt-6" style={{ borderColor: '#9B7EBD' }}>
                    <p className="italic" style={{ color: '#9B7EBD' }}>Settings panel coming soon...</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
