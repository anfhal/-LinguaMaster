import { useNavigate } from 'react-router-dom';
import { BookOpen, Flame, Target, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import CourseCard from '../components/CourseCard';
import LanguageSelector from '../components/LanguageSelector';
import { Language, CourseLevel } from '../types';

export default function Home() {
  const { user, currentLanguage, currentLevel, setCurrentLanguage, setCurrentLevel, getFilteredCourses } = useAppStore();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const handleLevelChange = (level: string) => {
    setCurrentLevel(level as CourseLevel);
  };

  const filteredCourses = getFilteredCourses(currentLanguage, currentLevel);
  const recommendedCourses = getFilteredCourses(currentLanguage).slice(0, 3);

  const stats = [
    { icon: Flame, value: user?.streak || 0, label: 'Day Streak', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: BookOpen, value: user?.totalLearningHours || 0, label: 'Hours Learned', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Target, value: '120', label: 'Words Learned', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: TrendingUp, value: '85%', label: 'Weekly Goal', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Start Your Language Journey Today
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Learn Any Language
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Anytime, Anywhere
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Immersive language learning experience with interactive exercises, personalized paths, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Browse Courses
              </button>
              <button className="btn-secondary flex items-center gap-2">
                Watch Demo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card text-center">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="section-title">Recommended Courses</h2>
              <p className="text-gray-500">Based on your learning preferences</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <LanguageSelector onChange={handleLanguageChange} selectedLang={currentLanguage} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button onClick={() => navigate('/courses')} className="btn-secondary flex items-center gap-2 mx-auto">
              View All Courses
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Master a New Language with Fun
              </h2>
              <ul className="space-y-4">
                {[
                  'Interactive vocabulary flashcards with spaced repetition',
                  'Grammar exercises with instant feedback',
                  'AI-powered speaking practice with pronunciation feedback',
                  'Listening comprehension exercises with real-world content',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 bg-white text-primary-600 font-medium px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Start Learning Now
              </button>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl" />
                <img
                  src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=diverse%20group%20of%20people%20learning%20languages%20together%20with%20books%20and%20technology%20warm%20colors%20modern%20style&image_size=portrait_4_3"
                  alt="Language Learning"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Learning Path for {currentLanguage.toUpperCase()}</h2>
            <p className="text-gray-500">Choose your level and start your journey</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {(['beginner', 'intermediate', 'advanced'] as CourseLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  currentLevel === level
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
