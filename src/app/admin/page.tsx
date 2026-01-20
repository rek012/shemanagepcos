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
  LogIn,
  Plus,
  Pencil,
  Trash2,
  X,
  Save
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

interface UserData {
  id: number;
  email: string;
  username: string;
  user_type: 'admin' | 'user';
  created_at: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // User Management State
  const [users, setUsers] = useState<UserData[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    username: '',
    userType: 'user' as 'admin' | 'user'
  });
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');

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

  // Fetch real data from D1 database
  useEffect(() => {
    if (isAuthenticated && userType === 'admin') {
      fetchLoginData();
    }
  }, [selectedDate, isAuthenticated, userType]);

  const fetchLoginData = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/admin/logins?date=${selectedDate}&limit=50`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch login data');
      }
      
      const data = await response.json() as {
        success: boolean;
        logins: Array<{
          id: string;
          userId: string;
          username: string;
          email: string;
          loginTime: string;
          ipAddress: string;
          device: string;
        }>;
        stats: LoginStats;
        hourlyData: HourlyLogin[];
      };
      
      if (data.success) {
        // Transform the data to match the component's format
        const transformedLogins = data.logins.map((login) => ({
          id: login.id,
          userId: login.userId,
          username: login.username,
          email: login.email,
          loginTime: new Date(login.loginTime),
          ipAddress: login.ipAddress,
          device: login.device
        }));
        
        setLogins(transformedLogins);
        setStats(data.stats);
        setHourlyData(data.hourlyData);
      } else {
        setError('Failed to load login data');
      }
    } catch (err) {
      console.error('Error fetching login data:', err);
      setError('Failed to load login data. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  // User Management Functions
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json() as { success: boolean; users: UserData[] };
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'users') {
      fetchUsers();
    }
  }, [isAuthenticated, activeTab]);

  const openAddUserModal = () => {
    setEditingUser(null);
    setUserForm({ email: '', password: '', username: '', userType: 'user' });
    setUserError('');
    setUserSuccess('');
    setShowUserModal(true);
  };

  const openEditUserModal = (user: UserData) => {
    setEditingUser(user);
    setUserForm({ 
      email: user.email, 
      password: '', 
      username: user.username, 
      userType: user.user_type 
    });
    setUserError('');
    setUserSuccess('');
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
    setUserForm({ email: '', password: '', username: '', userType: 'user' });
    setUserError('');
  };

  const handleSaveUser = async () => {
    setUserError('');
    setUserSuccess('');

    if (!userForm.email || !userForm.username) {
      setUserError('Email and username are required');
      return;
    }

    if (!editingUser && !userForm.password) {
      setUserError('Password is required for new users');
      return;
    }

    try {
      if (editingUser) {
        // Update existing user
        const response = await fetch('/api/admin/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingUser.id,
            email: userForm.email,
            username: userForm.username,
            userType: userForm.userType,
            ...(userForm.password && { password: userForm.password })
          })
        });

        const data = await response.json() as { success: boolean; error?: string };
        if (data.success) {
          setUserSuccess('User updated successfully');
          fetchUsers();
          setTimeout(() => closeUserModal(), 1500);
        } else {
          setUserError(data.error || 'Failed to update user');
        }
      } else {
        // Create new user
        const response = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userForm.email,
            password: userForm.password,
            username: userForm.username,
            userType: userForm.userType
          })
        });

        const data = await response.json() as { success: boolean; error?: string };
        if (data.success) {
          setUserSuccess('User created successfully');
          fetchUsers();
          setTimeout(() => closeUserModal(), 1500);
        } else {
          setUserError(data.error || 'Failed to create user');
        }
      }
    } catch (err) {
      console.error('Error saving user:', err);
      setUserError('Failed to save user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE'
      });

      const data = await response.json() as { success: boolean; error?: string };
      if (data.success) {
        fetchUsers();
      } else {
        alert(data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
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
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#fee', border: '1px solid #fcc' }}>
                <p style={{ color: '#c33' }}>{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#9B7EBD' }}></div>
              </div>
            )}

            {activeTab === 'overview' && !isLoading && (
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: '#7F5561' }}>User Management</h2>
                  <button 
                    onClick={openAddUserModal}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                    style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)', color: '#FFE1E0' }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>
                
                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#FFE1E0' }}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#7F5561' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: '#FFE1E0' }}>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm" style={{ backgroundColor: user.user_type === 'admin' ? '#9B7EBD' : '#F49BAB', color: '#FFE1E0' }}>
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="ml-3 text-sm font-medium" style={{ color: '#7F5561' }}>{user.username}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#7F5561' }}>{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: user.user_type === 'admin' ? '#9B7EBD' : '#F49BAB', color: '#FFE1E0' }}>
                              {user.user_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#7F5561' }}>
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openEditUserModal(user)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" style={{ color: '#9B7EBD' }} />
                              </button>
                              {user.email !== 'admin@pcos.com' && (
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className="text-center py-8" style={{ color: '#9B7EBD' }}>
                      No users found. Add a new user to get started.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User Modal */}
            {showUserModal && (
              <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full" style={{ border: '1px solid #9B7EBD' }}>
                  <div className="flex justify-between items-center p-6" style={{ borderBottom: '1px solid #9B7EBD' }}>
                    <h3 className="text-xl font-bold" style={{ color: '#7F5561' }}>
                      {editingUser ? 'Edit User' : 'Add New User'}
                    </h3>
                    <button onClick={closeUserModal} className="p-1 rounded-lg hover:bg-gray-100">
                      <X className="w-5 h-5" style={{ color: '#7F5561' }} />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {userError && (
                      <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#fee', color: '#c33', border: '1px solid #fcc' }}>
                        {userError}
                      </div>
                    )}
                    {userSuccess && (
                      <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#efe', color: '#3a3', border: '1px solid #cfc' }}>
                        {userSuccess}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#7F5561' }}>Username</label>
                      <input
                        type="text"
                        value={userForm.username}
                        onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #9B7EBD', color: '#7F5561' }}
                        placeholder="Enter username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#7F5561' }}>Email</label>
                      <input
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #9B7EBD', color: '#7F5561' }}
                        placeholder="Enter email"
                        disabled={editingUser?.email === 'admin@pcos.com'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#7F5561' }}>
                        Password {editingUser && <span className="text-gray-400">(leave blank to keep current)</span>}
                      </label>
                      <input
                        type="password"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #9B7EBD', color: '#7F5561' }}
                        placeholder={editingUser ? 'Enter new password' : 'Enter password'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#7F5561' }}>Role</label>
                      <select
                        value={userForm.userType}
                        onChange={(e) => setUserForm({ ...userForm, userType: e.target.value as 'admin' | 'user' })}
                        className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
                        style={{ border: '1px solid #9B7EBD', color: '#7F5561' }}
                        disabled={editingUser?.email === 'admin@pcos.com'}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={closeUserModal}
                        className="px-4 py-2 rounded-lg transition-colors"
                        style={{ border: '1px solid #9B7EBD', color: '#7F5561' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveUser}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                        style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)', color: '#FFE1E0' }}
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingUser ? 'Update' : 'Create'}</span>
                      </button>
                    </div>
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
