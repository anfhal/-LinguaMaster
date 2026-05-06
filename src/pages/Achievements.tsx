import { useAppStore } from '../store/appStore';
import { mockAchievements } from '../data/mockData';

export default function Achievements() {
  const { userAchievements } = useAppStore();

  const unlockedIds = userAchievements.map((ua) => ua.achievementId);

  const unlockedCount = unlockedIds.length;
  const totalCount = mockAchievements.length;
  const progress = (unlockedCount / totalCount) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Achievements</h1>
          <p className="text-gray-500">Unlock rewards for your learning milestones</p>
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Your Achievement Progress</h2>
              <p className="text-gray-500">Keep learning to unlock all achievements!</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#achievementGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 351.9} 351.9`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="achievementGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">{unlockedCount}</span>
                  <span className="text-sm text-gray-500">/{totalCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAchievements.map((achievement) => {
            const isUnlocked = unlockedIds.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`card text-center transition-all duration-300 ${
                  isUnlocked ? 'shadow-lg' : 'opacity-50'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl ${
                  isUnlocked ? 'bg-yellow-100' : 'bg-gray-100 grayscale'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{achievement.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>
                <div className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                  isUnlocked
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="card mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Achievement Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: 'Milestone', count: mockAchievements.filter(a => a.type === 'milestone').length, icon: '🎯' },
              { type: 'Streak', count: mockAchievements.filter(a => a.type === 'streak').length, icon: '🔥' },
              { type: 'Learning', count: mockAchievements.filter(a => a.type === 'learning').length, icon: '📚' },
            ].map((category) => {
              const unlockedInCategory = mockAchievements
                .filter(a => a.type === category.type.toLowerCase())
                .filter(a => unlockedIds.includes(a.id)).length;
              
              return (
                <div key={category.type} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.type}</h3>
                    <p className="text-sm text-gray-500">
                      {unlockedInCategory} / {category.count} achievements
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
