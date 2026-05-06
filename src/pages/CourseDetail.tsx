import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star, Users, BookOpen, CheckCircle, ChevronRight, Play, Award } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { ModuleType } from '../types';

const moduleIcons: Record<ModuleType, string> = {
  vocabulary: '📚',
  grammar: '📖',
  speaking: '🎤',
  listening: '👂',
};

const moduleColors: Record<ModuleType, string> = {
  vocabulary: 'bg-blue-100 text-blue-700 border-blue-200',
  grammar: 'bg-green-100 text-green-700 border-green-200',
  speaking: 'bg-purple-100 text-purple-700 border-purple-200',
  listening: 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, selectCourse, selectModule, getUserProgressForCourse } = useAppStore();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Course not found</h1>
          <button onClick={() => navigate('/courses')} className="btn-primary mt-4">
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const overallProgress = getUserProgressForCourse(course.id);

  const handleStartLearning = (moduleType: ModuleType) => {
    selectCourse(course);
    selectModule(moduleType);
    navigate(`/learn/${course.id}/${moduleType}`);
  };

  const languageFlags: Record<string, string> = {
    en: '🇺🇸',
    ja: '🇯🇵',
    ko: '🇰🇷',
  };

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge bg-white/20 backdrop-blur-sm">{languageFlags[course.language]}</span>
                  <span className={`badge ${levelColors[course.level]}`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-white/80">{course.description}</p>
              </div>
            </div>

            <div className="card mb-6">
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{course.estimatedHours} hours total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-600">{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{course.studentsCount.toLocaleString()} students</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">About This Course</h2>
              <p className="text-gray-600 leading-relaxed">
                {course.description} This comprehensive course is designed to help you master {course.language.toUpperCase()} through interactive lessons, practical exercises, and real-world applications. Whether you're starting from scratch or building on existing skills, this course provides a structured path to fluency.
              </p>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Modules</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => {
                  const moduleProgress = getUserProgressForCourse(course.id) * 100;
                  return (
                    <div
                      key={module.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${moduleColors[module.type]}`}
                      onClick={() => handleStartLearning(module.type)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center text-2xl">
                            {moduleIcons[module.type]}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{module.name}</h3>
                            <p className="text-sm opacity-80">
                              {module.type === 'vocabulary' && 'Build your word knowledge'}
                              {module.type === 'grammar' && 'Master sentence structure'}
                              {module.type === 'speaking' && 'Practice conversation skills'}
                              {module.type === 'listening' && 'Improve comprehension'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{Math.round(moduleProgress)}%</span>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card sticky top-24">
              <div className="text-center mb-4">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#f3f4f6"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${overallProgress * 251.2} 251.2`}
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#0d9488" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">{Math.round(overallProgress * 100)}%</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800">Course Progress</h3>
              </div>

              <button
                onClick={() => handleStartLearning('vocabulary')}
                className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
              >
                <Play className="w-5 h-5" />
                Continue Learning
              </button>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-3">What You'll Learn</h4>
                <ul className="space-y-2">
                  {['Basic to advanced vocabulary', 'Grammar rules and usage', 'Conversational skills', 'Listening comprehension'].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Course Certificate
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                Complete all modules to earn a certificate of completion
              </p>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{course.modules.length} modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
