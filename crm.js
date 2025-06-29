<button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              {isLogin ? 'Intră în cont' : 'Creează cont'}import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Users, 
  Home, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  Heart,
  ArrowLeft,
  Save,
  X,
  Bell,
  Tag,
  MessageSquare,
  Euro,
  LogOut,
  User,
  Settings,
  Shield,
  Building,
  TrendingUp,
  FileText,
  Database
} from 'lucide-react';

// Context pentru autentificare
const AuthContext = createContext();

// Hook pentru utilizarea contextului de autentificare
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider pentru autentificare
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifică dacă utilizatorul este logat
    const savedUser = localStorage.getItem('imosync_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('imosync_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('imosync_user');
    localStorage.removeItem('imosync_clients');
    localStorage.removeItem('imosync_properties');
    localStorage.removeItem('imosync_reminders');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Componenta de Login/Signup
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    agency: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      // Signup
      if (formData.password !== formData.confirmPassword) {
        setError('Parolele nu coincid');
        return;
      }
      if (formData.password.length < 6) {
        setError('Parola trebuie să aibă minim 6 caractere');
        return;
      }
    }

    // Simulare autentificare (în realitate ar fi API call)
    const users = JSON.parse(localStorage.getItem('imosync_users') || '[]');
    
    if (isLogin) {
      // Login
      const existingUser = users.find(u => u.email === formData.email && u.password === formData.password);
      if (existingUser) {
        login(existingUser);
      } else {
        setError('Email sau parolă incorectă');
      }
    } else {
      // Signup
      const existingUser = users.find(u => u.email === formData.email);
      if (existingUser) {
        setError('Există deja un cont cu acest email');
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        agency: formData.agency,
        createdAt: new Date().toISOString(),
        subscription: 'basic'
      };

      users.push(newUser);
      localStorage.setItem('imosync_users', JSON.stringify(users));
      login(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">ImoSync</h1>
          <p className="text-blue-100">Platforma ta imobiliară</p>
        </div>

        <div className="p-8">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-l-lg font-medium transition-colors ${
                isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-r-lg font-medium transition-colors ${
                !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nume complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0721.234.567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agenție</label>
                  <input
                    type="text"
                    required
                    value={formData.agency}
                    onChange={(e) => setFormData({...formData, agency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Agenția Imobiliară"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemplu.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parola</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmă parola</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              {isLogin ? 'Intră în cont' : 'Creează cont'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo Login:</p>
              <p className="text-xs text-gray-500">Email: demo@imosync.com</p>
              <p className="text-xs text-gray-500">Parola: demo123</p>
              <button
                onClick={() => {
                  setFormData({...formData, email: 'demo@imosync.com', password: 'demo123'});
                }}
                className="mt-2 text-xs text-blue-600 hover:underline"
              >
                Completează automat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Header cu user info
const AppHeader = ({ onTabChange, activeTab }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ImoSync</h1>
              <p className="text-sm text-gray-600">{user?.agency || 'Platforma Imobiliară'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.subscription}</div>
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                  <div className="p-3 border-b">
                    <div className="text-sm font-medium">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                  <div className="p-1">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Setări
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => onTabChange('clients')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'clients'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Clienți
            </button>
            <button
              onClick={() => onTabChange('properties')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'properties'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building className="w-5 h-5 mr-2" />
              Proprietăți
            </button>
            <button
              onClick={() => onTabChange('reminders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'reminders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="w-5 h-5 mr-2" />
              Remindere
            </button>
            <button
              onClick={() => onTabChange('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              Rapoarte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard component
const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalClients: 0,
    hotLeads: 0,
    totalProperties: 0,
    thisMonthDeals: 0
  });

  useEffect(() => {
    // Calculează statisticile din localStorage
    const clients = JSON.parse(localStorage.getItem(`imosync_clients_${user.id}`) || '[]');
    const properties = JSON.parse(localStorage.getItem(`imosync_properties_${user.id}`) || '[]');
    
    setStats({
      totalClients: clients.length,
      hotLeads: clients.filter(c => c.status === 'hot').length,
      totalProperties: properties.length,
      thisMonthDeals: Math.floor(Math.random() * 5) // Mock data
    });
  }, [user.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Bună, {user.name.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-600">Iată o privire de ansamblu asupra activității tale</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clienți</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalClients}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hot Leads</p>
              <p className="text-3xl font-bold text-red-600">{stats.hotLeads}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Proprietăți</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalProperties}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Building className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deals Luna Asta</p>
              <p className="text-3xl font-bold text-purple-600">{stats.thisMonthDeals}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Activitate Recentă</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Client nou adăugat</p>
                <p className="text-xs text-gray-500">Acum 2 ore</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Vizionare programată</p>
                <p className="text-xs text-gray-500">Ieri</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Remindere Urgente</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <Bell className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Follow-up urgent</p>
                <p className="text-xs text-red-600">Azi, 14:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">Vizionare programată</p>
                <p className="text-xs text-yellow-600">Mâine, 10:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main CRM Component (refolosim cel anterior dar cu data persistentă)
const CRMMain = ({ user, activeTab }) => {
  const [clients, setClients] = useState([]);
  const [properties, setProperties] = useState([]);
  const [reminders, setReminders] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem(`imosync_clients_${user.id}`) || '[]');
    const savedProperties = JSON.parse(localStorage.getItem(`imosync_properties_${user.id}`) || '[]');
    const savedReminders = JSON.parse(localStorage.getItem(`imosync_reminders_${user.id}`) || '[]');
    
    setClients(savedClients);
    setProperties(savedProperties);
    setReminders(savedReminders);
  }, [user.id]);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(`imosync_clients_${user.id}`, JSON.stringify(clients));
  }, [clients, user.id]);

  useEffect(() => {
    localStorage.setItem(`imosync_properties_${user.id}`, JSON.stringify(properties));
  }, [properties, user.id]);

  useEffect(() => {
    localStorage.setItem(`imosync_reminders_${user.id}`, JSON.stringify(reminders));
  }, [reminders, user.id]);

  // Placeholder pentru diferite tab-uri
  if (activeTab === 'clients') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestionare Clienți</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Client Nou
          </button>
        </div>
        
        {clients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nu ai clienți încă</h3>
            <p className="text-gray-500 mb-4">Adaugă primul tău client pentru a începe</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Adaugă primul client
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aici ar fi cards cu clienți */}
          </div>
        )}
      </div>
    );
  }

  // Similar pentru celelalte tab-uri...
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12">
        <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          {activeTab === 'properties' && 'Gestionare Proprietăți'}
          {activeTab === 'reminders' && 'Sistem Remindere'}
          {activeTab === 'reports' && 'Rapoarte și Analize'}
        </h3>
        <p className="text-gray-500">Funcționalitatea va fi disponibilă în curând</p>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onTabChange={setActiveTab} activeTab={activeTab} />
      
      {activeTab === 'dashboard' && <Dashboard user={user} />}
      {activeTab !== 'dashboard' && <CRMMain user={user} activeTab={activeTab} />}
    </div>
  );
};

// Root component cu provider
const ImoSyncApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default ImoSyncApp;
