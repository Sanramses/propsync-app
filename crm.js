import React, { useState, useEffect, createContext, useContext } from 'react';
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
  ArrowLeft,
  Save,
  X,
  Bell,
  MessageSquare,
  Euro,
  LogOut,
  User,
  Settings,
  Building,
  TrendingUp,
  FileText,
  Sparkles,
  Shield,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
  Award
} from 'lucide-react';

// Context pentru autentificare
const AuthContext = createContext();

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

  return React.createElement(AuthContext.Provider, { value }, children);
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
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          setError('Parolele nu coincid');
          return;
        }
        if (formData.password.length < 6) {
          setError('Parola trebuie să aibă minim 6 caractere');
          return;
        }
      }

      // Simulare delay pentru experiență realistă
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = JSON.parse(localStorage.getItem('imosync_users') || '[]');
      
      if (isLogin) {
        const existingUser = users.find(u => u.email === formData.email && u.password === formData.password);
        if (existingUser) {
          login(existingUser);
        } else {
          setError('Email sau parolă incorectă');
        }
      } else {
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
          subscription: 'pro',
          avatar: formData.name.charAt(0).toUpperCase()
        };

        users.push(newUser);
        localStorage.setItem('imosync_users', JSON.stringify(users));
        login(newUser);
      }
    } catch (err) {
      setError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  return React.createElement('div', {
    className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4"
  },
    React.createElement('div', {
      className: "bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
    },
      React.createElement('div', {
        className: "relative overflow-hidden"
      },
        React.createElement('div', {
          className: "absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
        }),
        React.createElement('div', {
          className: "absolute inset-0 bg-black opacity-10"
        }),
        React.createElement('div', {
          className: "relative p-8 text-center"
        },
          React.createElement('div', {
            className: "bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          },
            React.createElement(Home, {
              className: "w-10 h-10 text-blue-600"
            })
          ),
          React.createElement('h1', {
            className: "text-3xl font-bold text-white mb-2"
          }, "ImoSync"),
          React.createElement('p', {
            className: "text-blue-100 text-lg"
          }, "CRM Inteligent pentru Imobiliare")
        )
      ),

      React.createElement('div', {
        className: "p-8"
      },
        React.createElement('div', {
          className: "flex bg-gray-100 rounded-xl p-1 mb-6"
        },
          React.createElement('button', {
            onClick: () => setIsLogin(true),
            className: `flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              isLogin ? 'bg-white text-blue-600 shadow-md' : 'text-gray-600'
            }`
          }, "Login"),
          React.createElement('button', {
            onClick: () => setIsLogin(false),
            className: `flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              !isLogin ? 'bg-white text-blue-600 shadow-md' : 'text-gray-600'
            }`
          }, "Sign Up")
        ),

        error && React.createElement('div', {
          className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm"
        }, error),

        React.createElement('div', {
          className: "space-y-4"
        },
          !isLogin && React.createElement('div', null,
            React.createElement('label', {
              className: "block text-sm font-semibold text-gray-700 mb-2"
            }, "Nume complet"),
            React.createElement('input', {
              type: "text",
              required: true,
              value: formData.name,
              onChange: (e) => setFormData({...formData, name: e.target.value}),
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
              placeholder: "Ion Popescu"
            })
          ),
          
          !isLogin && React.createElement('div', null,
            React.createElement('label', {
              className: "block text-sm font-semibold text-gray-700 mb-2"
            }, "Agenție"),
            React.createElement('input', {
              type: "text",
              required: true,
              value: formData.agency,
              onChange: (e) => setFormData({...formData, agency: e.target.value}),
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
              placeholder: "Agenția Imobiliară Premium"
            })
          ),

          React.createElement('div', null,
            React.createElement('label', {
              className: "block text-sm font-semibold text-gray-700 mb-2"
            }, "Email"),
            React.createElement('input', {
              type: "email",
              required: true,
              value: formData.email,
              onChange: (e) => setFormData({...formData, email: e.target.value}),
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
              placeholder: "email@exemplu.com"
            })
          ),

          React.createElement('div', null,
            React.createElement('label', {
              className: "block text-sm font-semibold text-gray-700 mb-2"
            }, "Parola"),
            React.createElement('input', {
              type: "password",
              required: true,
              value: formData.password,
              onChange: (e) => setFormData({...formData, password: e.target.value}),
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
              placeholder: "••••••••"
            })
          ),

          !isLogin && React.createElement('div', null,
            React.createElement('label', {
              className: "block text-sm font-semibold text-gray-700 mb-2"
            }, "Confirmă parola"),
            React.createElement('input', {
              type: "password",
              required: true,
              value: formData.confirmPassword,
              onChange: (e) => setFormData({...formData, confirmPassword: e.target.value}),
              className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
              placeholder: "••••••••"
            })
          ),

          React.createElement('button', {
            onClick: handleSubmit,
            disabled: isLoading,
            className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
          }, 
            isLoading && React.createElement('div', {
              className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
            }),
            isLoading ? 'Se încarcă...' : (isLogin ? 'Intră în cont' : 'Creează cont')
          )
        ),

        isLogin && React.createElement('div', {
          className: "mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
        },
          React.createElement('p', {
            className: "text-sm text-gray-600 mb-2 font-medium"
          }, "🚀 Demo Login:"),
          React.createElement('p', {
            className: "text-xs text-gray-500"
          }, "Email: demo@imosync.com"),
          React.createElement('p', {
            className: "text-xs text-gray-500 mb-3"
          }, "Parola: demo123"),
          React.createElement('button', {
            onClick: () => {
              setFormData({...formData, email: 'demo@imosync.com', password: 'demo123'});
            },
            className: "text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline"
          }, "✨ Completează automat")
        )
      )
    )
  );
};

// Header cu design îmbunătățit
const AppHeader = ({ onTabChange, activeTab }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return React.createElement('div', {
    className: "bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
  },
    React.createElement('div', {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    },
      React.createElement('div', {
        className: "flex justify-between items-center py-4"
      },
        React.createElement('div', {
          className: "flex items-center"
        },
          React.createElement('div', {
            className: "bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 rounded-2xl mr-4 shadow-lg"
          },
            React.createElement(Home, {
              className: "w-8 h-8"
            })
          ),
          React.createElement('div', null,
            React.createElement('h1', {
              className: "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            }, "ImoSync"),
            React.createElement('p', {
              className: "text-sm text-gray-600"
            }, user && user.agency || 'CRM Inteligent pentru Imobiliare')
          )
        ),
        
        React.createElement('div', {
          className: "flex items-center gap-4"
        },
          React.createElement('div', {
            className: "relative"
          },
            React.createElement('button', {
              onClick: () => setShowUserMenu(!showUserMenu),
              className: "flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100"
            },
              React.createElement('div', {
                className: "w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md"
              }, user && user.avatar || 'U'),
              React.createElement('div', {
                className: "text-left hidden sm:block"
              },
                React.createElement('div', {
                  className: "text-sm font-semibold text-gray-800"
                }, user && user.name),
                React.createElement('div', {
                  className: "text-xs text-gray-500 capitalize"
                }, user && user.subscription, " Plan")
              )
            ),
            
            showUserMenu && React.createElement('div', {
              className: "absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 overflow-hidden"
            },
              React.createElement('div', {
                className: "p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100"
              },
                React.createElement('div', {
                  className: "text-sm font-semibold text-gray-800"
                }, user && user.name),
                React.createElement('div', {
                  className: "text-xs text-gray-500"
                }, user && user.email),
                React.createElement('div', {
                  className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2"
                },
                  React.createElement(Award, {
                    className: "w-3 h-3 mr-1"
                  }),
                  user && user.subscription, " Plan"
                )
              ),
              React.createElement('div', {
                className: "p-2"
              },
                React.createElement('button', {
                  className: "w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center transition-colors"
                },
                  React.createElement(User, {
                    className: "w-4 h-4 mr-3"
                  }),
                  "Profilul meu"
                ),
                React.createElement('button', {
                  className: "w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center transition-colors"
                },
                  React.createElement(Settings, {
                    className: "w-4 h-4 mr-3"
                  }),
                  "Setări"
                ),
                React.createElement('button', {
                  className: "w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex items-center transition-colors"
                },
                  React.createElement(Shield, {
                    className: "w-4 h-4 mr-3"
                  }),
                  "Securitate"
                ),
                React.createElement('div', {
                  className: "border-t border-gray-100 my-2"
                }),
                React.createElement('button', {
                  onClick: logout,
                  className: "w-full text-left px-3 py-2 text-sm hover:bg-red-50 rounded-lg flex items-center text-red-600 transition-colors"
                },
                  React.createElement(LogOut, {
                    className: "w-4 h-4 mr-3"
                  }),
                  "Logout"
                )
              )
            )
          )
        )
      )
    ),

    React.createElement('div', {
      className: "border-t border-gray-100"
    },
      React.createElement('div', {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      },
        React.createElement('div', {
          className: "flex space-x-8"
        },
          React.createElement('button', {
            onClick: () => onTabChange('dashboard'),
            className: `py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`
          },
            React.createElement(BarChart3, {
              className: "w-5 h-5 mr-2"
            }),
            "Dashboard"
          ),
          React.createElement('button', {
            onClick: () => onTabChange('clients'),
            className: `py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-300 ${
              activeTab === 'clients'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`
          },
            React.createElement(Users, {
              className: "w-5 h-5 mr-2"
            }),
            "Clienți"
          ),
          React.createElement('button', {
            onClick: () => onTabChange('properties'),
            className: `py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-300 ${
              activeTab === 'properties'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`
          },
            React.createElement(Building, {
              className: "w-5 h-5 mr-2"
            }),
            "Proprietăți"
          ),
          React.createElement('button', {
            onClick: () => onTabChange('social'),
            className: `py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-300 ${
              activeTab === 'social'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`
          },
            React.createElement(Sparkles, {
              className: "w-5 h-5 mr-2"
            }),
            "Social Media"
          ),
          React.createElement('button', {
            onClick: () => onTabChange('reports'),
            className: `py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-300 ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`
          },
            React.createElement(FileText, {
              className: "w-5 h-5 mr-2"
            }),
            "Rapoarte"
          )
        )
      )
    )
  );
};

// Dashboard îmbunătățit
const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalClients: 0,
    hotLeads: 0,
    warmLeads: 0,
    coldLeads: 0,
    totalProperties: 0,
    thisMonthDeals: 0,
    revenue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    const clients = JSON.parse(localStorage.getItem(`imosync_clients_${user.id}`) || '[]');
    const properties = JSON.parse(localStorage.getItem(`imosync_properties_${user.id}`) || '[]');
    
    const hotLeads = clients.filter(c => c.status === 'hot').length;
    const warmLeads = clients.filter(c => c.status === 'warm').length;
    const coldLeads = clients.filter(c => c.status === 'cold').length;
    
    setStats({
      totalClients: clients.length,
      hotLeads,
      warmLeads,
      coldLeads,
      totalProperties: properties.length,
      thisMonthDeals: Math.floor(Math.random() * 8) + 2,
      revenue: Math.floor(Math.random() * 50000) + 25000,
      conversionRate: clients.length > 0 ? Math.round((hotLeads / clients.length) * 100) : 0
    });
  }, [user.id]);

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
    React.createElement('div', {
      className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
    },
      React.createElement('div', {
        className: "flex items-center justify-between mb-4"
      },
        React.createElement('div', {
          className: `p-3 rounded-xl ${color}`
        },
          React.createElement(Icon, {
            className: "w-6 h-6 text-white"
          })
        ),
        trend && React.createElement('div', {
          className: `text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`
        },
          trend === 'up' ? '↗' : '↘', ' ', trendValue
        )
      ),
      React.createElement('div', null,
        React.createElement('p', {
          className: "text-sm font-medium text-gray-600 mb-1"
        }, title),
        React.createElement('p', {
          className: "text-3xl font-bold text-gray-800"
        }, value)
      )
    )
  );

  return React.createElement('div', {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
  },
    React.createElement('div', {
      className: "mb-8"
    },
      React.createElement('h2', {
        className: "text-3xl font-bold text-gray-800 mb-2"
      }, `Bună, ${user.name.split(' ')[0]}! 👋`),
      React.createElement('p', {
        className: "text-gray-600 text-lg"
      }, "Iată o privire de ansamblu asupra performanțelor tale")
    ),

    React.createElement('div', {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    },
      React.createElement(StatCard, {
        title: "Total Clienți",
        value: stats.totalClients,
        icon: Users,
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
        trend: "up",
        trendValue: "+12%"
      }),
      React.createElement(StatCard, {
        title: "Hot Leads",
        value: stats.hotLeads,
        icon: Target,
        color: "bg-gradient-to-br from-red-500 to-red-600",
        trend: "up",
        trendValue: "+8%"
      }),
      React.createElement(StatCard, {
        title: "Proprietăți Active",
        value: stats.totalProperties,
        icon: Building,
        color: "bg-gradient-to-br from-green-500 to-green-600",
        trend: "up",
        trendValue: "+15%"
      }),
      React.createElement(StatCard, {
        title: "Conversie",
        value: `${stats.conversionRate}%`,
        icon: TrendingUp,
        color: "bg-gradient-to-br from-purple-500 to-purple-600",
        trend: "up",
        trendValue: "+5%"
      })
    ),

    React.createElement('div', {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
    },
      React.createElement('div', {
        className: "lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      },
        React.createElement('h3', {
          className: "text-xl font-bold text-gray-800 mb-6"
        }, "Distribuția Leads"),
        React.createElement('div', {
          className: "space-y-4"
        },
          React.createElement('div', {
            className: "flex items-center justify-between"
          },
            React.createElement('div', {
              className: "flex items-center"
            },
              React.createElement('div', {
                className: "w-4 h-4 bg-red-500 rounded-full mr-3"
              }),
              React.createElement('span', {
                className: "text-sm font-medium text-gray-700"
              }, "Hot Leads")
            ),
            React.createElement('div', {
              className: "flex items-center gap-3"
            },
              React.createElement('div', {
                className: "w-32 bg-gray-200 rounded-full h-3"
              },
                React.createElement('div', {
                  className: "bg-red-500 h-3 rounded-full transition-all duration-500",
                  style: {width: `${stats.totalClients > 0 ? (stats.hotLeads / stats.totalClients) * 100 : 0}%`}
                })
              ),
              React.createElement('span', {
                className: "text-sm font-bold text-gray-800 w-8"
              }, stats.hotLeads)
            )
          ),
          React.createElement('div', {
            className: "flex items-center justify-between"
          },
            React.createElement('div', {
              className: "flex items-center"
            },
              React.createElement('div', {
                className: "w-4 h-4 bg-yellow-500 rounded-full mr-3"
              }),
              React.createElement('span', {
                className: "text-sm font-medium text-gray-700"
              }, "Warm Leads")
            ),
            React.createElement('div', {
              className: "flex items-center gap-3"
            },
              React.createElement('div', {
                className: "w-32 bg-gray-200 rounded-full h-3"
              },
                React.createElement('div', {
                  className: "bg-yellow-500 h-3 rounded-full transition-all duration-500",
                  style: {width: `${stats.totalClients > 0 ? (stats.warmLeads / stats.totalClients) * 100 : 0}%`}
                })
              ),
              React.createElement('span', {
                className: "text-sm font-bold text-gray-800 w-8"
              }, stats.warmLeads)
            )
          ),
          React.createElement('div', {
            className: "flex items-center justify-between"
          },
            React.createElement('div', {
              className: "flex items-center"
            },
              React.createElement('div', {
                className: "w-4 h-4 bg-blue-500 rounded-full mr-3"
              }),
              React.createElement('span', {
                className: "text-sm font-medium text-gray-700"
              }, "Cold Leads")
            ),
            React.createElement('div', {
              className: "flex items-center gap-3"
            },
              React.createElement('div', {
                className: "w-32 bg-gray-200 rounded-full h-3"
              },
                React.createElement('div', {
                  className: "bg-blue-500 h-3 rounded-full transition-all duration-500",
                  style: {width: `${stats.totalClients > 0 ? (stats.coldLeads / stats.totalClients) * 100 : 0}%`}
                })
              ),
              React.createElement('span', {
                className: "text-sm font-bold text-gray-800 w-8"
              }, stats.coldLeads)
            )
          )
        )
      ),

      React.createElement('div', {
        className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      },
        React.createElement('h3', {
          className: "text-xl font-bold text-gray-800 mb-6"
        }, "Acțiuni Rapide"),
        React.createElement('div', {
          className: "space-y-3"
        },
          React.createElement('button', {
            className: "w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center font-medium"
          },
            React.createElement(Plus, {
              className: "w-5 h-5 mr-2"
            }),
            "Client Nou"
          ),
          React.createElement('button', {
            className: "w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center font-medium"
          },
            React.createElement(Building, {
              className: "w-5 h-5 mr-2"
            }),
            "Proprietate Nouă"
          ),
          React.createElement('button', {
            className: "w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center font-medium"
          },
            React.createElement(Sparkles, {
              className: "w-5 h-5 mr-2"
            }),
            "Social Media"
          ),
          React.createElement('button', {
            className: "w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center font-medium"
          },
            React.createElement(FileText, {
              className: "w-5 h-5 mr-2"
            }),
            "Export Raport"
          )
        )
      )
    ),

    React.createElement('div', {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-8"
    },
      React.createElement('div', {
        className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      },
        React.createElement('h3', {
          className: "text-xl font-bold text-gray-800 mb-6"
        }, "Activitate Recentă"),
        React.createElement('div', {
          className: "space-y-4"
        },
          React.createElement('div', {
            className: "flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100"
          },
            React.createElement('div', {
              className: "w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center"
            },
              React.createElement(Users, {
                className: "w-6 h-6 text-white"
              })
            ),
            React.createElement('div', {
              className: "flex-1"
            },
              React.createElement('p', {
                className: "text-sm font-semibold text-gray-800"
              }, "Client nou adăugat"),
              React.createElement('p', {
                className: "text-xs text-gray-500"
              }, "Acum 2 ore")
            ),
            React.createElement(ChevronRight, {
              className: "w-5 h-5 text-gray-400"
            })
          ),
          React.createElement('div', {
            className: "flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
          },
            React.createElement('div', {
              className: "w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center"
            },
              React.createElement(Eye, {
                className: "w-6 h-6 text-white"
              })
            ),
            React.createElement('div', {
              className: "flex-1"
            },
              React.createElement('p', {
                className: "text-sm font-semibold text-gray-800"
              }, "Vizionare programată"),
              React.createElement('p', {
                className: "text-xs text-gray-500"
              }, "Ieri, 14:30")
            ),
            React.createElement(ChevronRight, {
              className: "w-5 h-5 text-gray-400"
            })
          ),
          React.createElement('div', {
            className: "flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100"
          },
            React.createElement('div', {
              className: "w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"
            },
              React.createElement(Sparkles, {
                className: "w-6 h-6 text-white"
              })
            ),
            React.createElement('div', {
              className: "flex-1"
            },
              React.createElement('p', {
                className: "text-sm font-semibold text-gray-800"
              }, "Post social media generat"),
              React.createElement('p', {
                className: "text-xs text-gray-500"
              }, "Ieri, 10:15")
            ),
            React.createElement(ChevronRight, {
              className: "w-5 h-5 text-gray-400"
            })
          )
        )
      ),

      React.createElement('div', {
        className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      },
        React.createElement('h3', {
          className: "text-xl font-bold text-gray-800 mb-6"
        }, "Remindere Urgente"),
        React.createElement('div', {
          className: "space-y-4"
        },
          React.createElement('div', {
            className: "flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-200"
          },
            React.createElement('div', {
              className: "w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center"
            },
              React.createElement(Bell, {
                className: "w-6 h-6 text-white"
              })
            ),
            React.createElement('div', {
              className: "flex-1"
            },
              React.createElement('p', {
                className: "text-sm font-semibold text-gray-800"
              }, "Follow-up urgent cu Ion Popescu"),
              React.createElement('p', {
                className: "text-xs text-red-600 font-medium"
              }, "Azi, 14:00")
            ),
            React.createElement(ChevronRight, {
              className: "w-5 h-5 text-gray-400"
            })
          ),
          React.createElement('div', {
            className: "flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200"
          },
            React.createElement('div', {
              className: "w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center"
            },
              React.createElement(Calendar, {
                className: "w-6 h-6 text-white"
              })
            ),
            React.createElement('div', {
              className: "flex-1"
            },
              React.createElement('p', {
                className: "text-sm font-semibold text-gray-800"
              }, "Vizionare programată"),
              React.createElement('p', {
                className: "text-xs text-yellow-600 font-medium"
              }, "Mâine, 10:00")
            ),
            React.createElement(ChevronRight, {
              className: "w-5 h-5 text-gray-400"
            })
          ),
          React.createElement('div', {
            className: "text-center py-4"
          },
            React.createElement('button', {
              className: "text-blue-600 hover:text-blue-700 text-sm font-medium"
            }, "Vezi toate remindere")
          )
        )
      )
    )
  );
};

// Tab pentru clienți - simplificat dar funcțional
const ClientsTab = ({ user }) => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem(`imosync_clients_${user.id}`) || '[]');
    if (savedClients.length === 0) {
      const demoClients = [
        {
          id: 1,
          name: "Ion Popescu",
          email: "ion.popescu@email.com",
          phone: "0721.234.567",
          status: "hot",
          budget: "80000-120000",
          notes: []
        },
        {
          id: 2,
          name: "Maria Ionescu", 
          email: "maria.ionescu@email.com",
          phone: "0734.567.890",
          status: "warm",
          budget: "150000-200000",
          notes: []
        }
      ];
      setClients(demoClients);
      localStorage.setItem(`imosync_clients_${user.id}`, JSON.stringify(demoClients));
    } else {
      setClients(savedClients);
    }
  }, [user.id]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'warm': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return React.createElement('div', {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
  },
    React.createElement('div', {
      className: "flex justify-between items-center mb-8"
    },
      React.createElement('div', null,
        React.createElement('h2', {
          className: "text-3xl font-bold text-gray-800"
        }, "Gestionare Clienți"),
        React.createElement('p', {
          className: "text-gray-600 mt-1"
        }, `${clients.length} clienți în total`)
      ),
      React.createElement('button', {
        onClick: () => setShowModal(true),
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center font-medium shadow-lg"
      },
        React.createElement(Plus, {
          className: "w-5 h-5 mr-2"
        }),
        "Client Nou"
      )
    ),

    React.createElement('div', {
      className: "mb-6"
    },
      React.createElement('div', {
        className: "relative max-w-md"
      },
        React.createElement(Search, {
          className: "absolute left-4 top-4 w-5 h-5 text-gray-400"
        }),
        React.createElement('input', {
          type: "text",
          placeholder: "Caută clienți...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        })
      )
    ),

    filteredClients.length === 0 ? (
      React.createElement('div', {
        className: "text-center py-16"
      },
        React.createElement('div', {
          className: "w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        },
          React.createElement(Users, {
            className: "w-12 h-12 text-gray-400"
          })
        ),
        React.createElement('h3', {
          className: "text-xl font-semibold text-gray-600 mb-2"
        }, "Nu ai clienți încă"),
        React.createElement('p', {
          className: "text-gray-500 mb-6"
        }, "Adaugă primul tău client pentru a începe"),
        React.createElement('button', {
          onClick: () => setShowModal(true),
          className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium"
        }, "Adaugă primul client")
      )
    ) : (
      React.createElement('div', {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      },
        filteredClients.map(client =>
          React.createElement('div', {
            key: client.id,
            className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          },
            React.createElement('div', {
              className: "flex justify-between items-start mb-4"
            },
              React.createElement('div', {
                className: "flex items-center gap-3"
              },
                React.createElement('div', {
                  className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                }, client.name.charAt(0)),
                React.createElement('div', null,
                  React.createElement('h3', {
                    className: "text-lg font-bold text-gray-800"
                  }, client.name),
                  React.createElement('span', {
                    className: `inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`
                  }, client.status.toUpperCase())
                )
              )
            ),
            React.createElement('div', {
              className: "space-y-3 mb-4"
            },
              React.createElement('div', {
                className: "flex items-center text-gray-600"
              },
                React.createElement(Phone, {
                  className: "w-4 h-4 mr-3"
                }),
                React.createElement('span', {
                  className: "text-sm"
                }, client.phone)
              ),
              React.createElement('div', {
                className: "flex items-center text-gray-600"
              },
                React.createElement(Mail, {
                  className: "w-4 h-4 mr-3"
                }),
                React.createElement('span', {
                  className: "text-sm"
                }, client.email)
              ),
              React.createElement('div', {
                className: "flex items-center text-gray-600"
              },
                React.createElement(Euro, {
                  className: "w-4 h-4 mr-3"
                }),
                React.createElement('span', {
                  className: "text-sm font-medium"
                }, `${client.budget} €`)
              )
            ),
            React.createElement('div', {
              className: "flex gap-2"
            },
              React.createElement('button', {
                className: "flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              },
                React.createElement(Eye, {
                  className: "w-4 h-4 inline mr-1"
                }),
                "Detalii"
              ),
              React.createElement('button', {
                className: "flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              },
                React.createElement(MessageSquare, {
                  className: "w-4 h-4 inline mr-1"
                }),
                "Notă"
              )
            )
          )
        )
      )
    )
  );
};

// Tab placeholder pentru alte secțiuni
const TabPlaceholder = ({ title, icon: Icon, description }) => (
  React.createElement('div', {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
  },
    React.createElement('div', {
      className: "text-center py-16"
    },
      React.createElement('div', {
        className: "w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
      },
        React.createElement(Icon, {
          className: "w-12 h-12 text-blue-600"
        })
      ),
      React.createElement('h3', {
        className: "text-2xl font-bold text-gray-800 mb-3"
      }, title),
      React.createElement('p', {
        className: "text-gray-600 mb-6 max-w-md mx-auto"
      }, description),
      React.createElement('button', {
        className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium"
      }, "În curând disponibil")
    )
  )
);

// Main App Component
const App = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return React.createElement('div', {
      className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50"
    },
      React.createElement('div', {
        className: "text-center"
      },
        React.createElement('div', {
          className: "w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
        }),
        React.createElement('p', {
          className: "text-gray-600 font-medium"
        }, "Se încarcă...")
      )
    );
  }

  if (!user) {
    return React.createElement(AuthForm);
  }

  return React.createElement('div', {
    className: "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
  },
    React.createElement(AppHeader, {
      onTabChange: setActiveTab,
      activeTab: activeTab
    }),
    
    activeTab === 'dashboard' && React.createElement(Dashboard, { user }),
    activeTab === 'clients' && React.createElement(ClientsTab, { user }),
    activeTab === 'properties' && React.createElement(TabPlaceholder, {
      title: "Gestionare Proprietăți",
      icon: Building,
      description: "Administrează și urmărește toate proprietățile tale într-un singur loc"
    }),
    activeTab === 'social' && React.createElement(TabPlaceholder, {
      title: "Social Media Generator",
      icon: Sparkles,
      description: "Creează conținut profesional pentru toate platformele sociale"
    }),
    activeTab === 'reports' && React.createElement(TabPlaceholder, {
      title: "Rapoarte și Analize",
      icon: FileText,
      description: "Analizează performanțele și generează rapoarte detaliate"
    })
  );
};

// Root component cu provider
const ImoSyncApp = () => {
  // Inițializează demo users dacă nu există
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('imosync_users') || '[]');
    if (users.length === 0) {
      const demoUser = {
        id: 1,
        name: "Demo User",
        email: "demo@imosync.com",
        password: "demo123",
        phone: "0721.123.456",
        agency: "Agenția Demo",
        createdAt: new Date().toISOString(),
        subscription: "pro",
        avatar: "D"
      };
      localStorage.setItem('imosync_users', JSON.stringify([demoUser]));
    }
  }, []);

  return React.createElement(AuthProvider, null,
    React.createElement(App)
  );
};

export default ImoSyncApp;
