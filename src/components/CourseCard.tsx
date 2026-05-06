import { useNavigate } from 'react-router-dom';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { Course } from '../types';
import { useAppStore } from '../store/appStore';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  const progress = useAppStore((state) => state.getUserProgressForCourse(course.id));

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
    <div
      className="card card-hover cursor-pointer group"
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-primary">{languageFlags[course.language]}</span>
          <span className={`badge ${levelColors[course.level]}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }} />
              </div>
              <span className="text-white text-sm font-medium">{Math.round(progress * 100)}%</span>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
        {course.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.estimatedHours}h
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.studentsCount.toLocaleString()}
          </span>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
