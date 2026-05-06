import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Edit, Save, Settings, Bell, Globe, Shield, HelpCircle } from 'lucide-react';
import { Language } from '../types';

export default function Profile() {
  const { user, logout } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [languagePreference, setLanguagePreference] = useState<Language>(user?.languagePreference || 'en');

  const handleSave = () => {
    setIsEditing(false);
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  const menuItems = [
    { icon: Bell, label: 'Notifications', description: 'Manage your notification preferences' },
    { icon: Globe, label: 'Language', description: 'Preferred learning language' },
    { icon: Shield, label: 'Privacy', description: 'Your data and privacy settings' },
    { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>

        <div className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative">
              <img
                src={user?.avatarUrl}
                alt={user?.displayName}
                className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input-field w-64"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
                )}
                {isEditing ? (
                  <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <span>{email}</span>
                <span className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span>{user?.streak} day streak</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-bold text-gray-800 mb-4">Learning Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Learning Hours</span>
                <span className="font-bold text-primary-600">{user?.totalLearningHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Courses Completed</span>
                <span className="font-bold text-green-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Words Learned</span>
                <span className="font-bold text-blue-600">450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Achievements Unlocked</span>
                <span className="font-bold text-yellow-600">5</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-gray-800 mb-4">Preferred Language</h3>
            <p className="text-sm text-gray-500 mb-4">Select your preferred learning language</p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguagePreference(lang.code)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                    languagePreference === lang.code
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <h3 className="font-bold text-gray-800 mb-4">Account Settings</h3>
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <Settings className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="card mt-6">
          <button
            onClick={logout}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 p-4 rounded-xl transition-colors font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
