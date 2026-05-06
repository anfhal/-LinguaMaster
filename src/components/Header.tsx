import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, User, LogOut, Menu, X, BookOpen, Trophy, Users, BarChart3, Home } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Header() {
  const { user, isLoggedIn, logout } = useAppStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: BarChart3, label: 'Progress', path: '/progress' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              LinguaMaster
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">🔥</span>
                  <span className="text-sm font-medium text-primary-700">{user.streak} days</span>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="hidden sm:block font-medium text-gray-700">{user.displayName}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/auth/login')}
                  className="px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/auth/signup')}
                  className="btn-primary"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-600 hover:text-primary-600 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
