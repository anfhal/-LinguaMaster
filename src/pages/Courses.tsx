import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import CourseCard from '../components/CourseCard';
import LanguageSelector from '../components/LanguageSelector';
import { LevelSelector } from '../components/LanguageSelector';
import { Language, CourseLevel } from '../types';

export default function Courses() {
  const { currentLanguage, currentLevel, setCurrentLanguage, setCurrentLevel, getFilteredCourses } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const handleLevelChange = (level: string) => {
    setCurrentLevel(level as CourseLevel);
  };

  const allCourses = getFilteredCourses();
  const filteredCourses = allCourses.filter((course) => {
    const matchesLang = !currentLanguage || course.language === currentLanguage;
    const matchesLevel = !currentLevel || course.level === currentLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Courses</h1>
          <p className="text-gray-500">Find the perfect course for your language learning journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <LanguageSelector onChange={handleLanguageChange} selectedLang={currentLanguage} />
              <LevelSelector onChange={handleLevelChange} selectedLevel={currentLevel} />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500">Showing {filteredCourses.length} courses</span>
          </div>
          <select className="input-field w-auto px-3 py-2">
            <option>Popular</option>
            <option>Newest</option>
            <option>Highest Rated</option>
            <option>Most Students</option>
          </select>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="card flex gap-4 cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-primary">
                      {{ en: '🇺🇸', ja: '🇯🇵', ko: '🇰🇷' }[course.language]}
                    </span>
                    <span className={`badge ${
                      course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{course.estimatedHours}h</span>
                    <span>⭐ {course.rating}</span>
                    <span>{course.studentsCount.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
