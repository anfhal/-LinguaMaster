import { useAppStore } from '../store/appStore';
import { TrendingUp, Calendar, Target, Award, BookOpen, Clock } from 'lucide-react';

export default function Progress() {
  const { user, courses, getUserProgressForCourse, userAchievements } = useAppStore();

  const completedCourses = courses.filter((c) => getUserProgressForCourse(c.id) >= 0.5).length;
  const totalProgress = courses.reduce((acc, course) => acc + getUserProgressForCourse(course.id), 0) / courses.length;

  const weeklyData = [
    { day: 'Mon', hours: 1.5, words: 20 },
    { day: 'Tue', hours: 2.0, words: 25 },
    { day: 'Wed', hours: 1.0, words: 15 },
    { day: 'Thu', hours: 2.5, words: 30 },
    { day: 'Fri', hours: 1.5, words: 22 },
    { day: 'Sat', hours: 3.0, words: 35 },
    { day: 'Sun', hours: 2.0, words: 28 },
  ];

  const maxHours = Math.max(...weeklyData.map((d) => d.hours));

  const stats = [
    { icon: TrendingUp, label: 'Weekly Learning', value: weeklyData.reduce((a, b) => a + b.hours, 0).toFixed(1) + 'h', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: Target, label: 'Words Learned', value: weeklyData.reduce((a, b) => a + b.words, 0).toString(), color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Award, label: 'Achievements', value: userAchievements.length.toString(), color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { icon: BookOpen, label: 'Courses Completed', value: completedCourses.toString(), color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Progress</h1>
          <p className="text-gray-500">Track your journey to language mastery</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Weekly Activity</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                This week
              </div>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-700 mb-1">{data.hours}h</span>
                    <div className="w-full max-w-12 bg-gray-100 rounded-t-lg overflow-hidden">
                      <div
                        className="bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-500"
                        style={{ height: `${(data.hours / maxHours) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-2">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Streak</h2>
            <div className="text-center py-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-orange-100 rounded-full blur-xl" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex flex-col items-center justify-center text-white">
                  <span className="text-5xl mb-2">🔥</span>
                  <span className="text-3xl font-bold">{user?.streak || 0}</span>
                  <span className="text-sm opacity-80">days</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600">Keep it up! Your streak is impressive!</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Course Progress</h2>
            <div className="space-y-4">
              {courses.map((course) => {
                const progress = getUserProgressForCourse(course.id);
                return (
                  <div key={course.id} className="flex items-center gap-4">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-800">{course.title}</h3>
                        <span className="badge badge-primary">
                          {{ en: '🇺🇸', ja: '🇯🇵', ko: '🇰🇷' }[course.language]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }} />
                        </div>
                        <span className="text-sm text-gray-500 w-12 text-right">{Math.round(progress * 100)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Goals</h2>
            <div className="space-y-4">
              {[
                { goal: 'Learn 500 words', progress: 44, icon: '📚' },
                { goal: 'Complete Basic Course', progress: 67, icon: '✅' },
                { goal: 'Daily 30 mins practice', progress: 85, icon: '⏰' },
                { goal: 'Master 10 grammar topics', progress: 60, icon: '📖' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-gray-700">{item.goal}</span>
                    </span>
                    <span className="text-sm font-medium text-primary-600">{item.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
