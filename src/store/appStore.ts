import { create } from 'zustand';
import { User, Course, Language, CourseLevel, ModuleType, UserProgress, UserAchievement, ForumPost, StudyGroup } from '../types';
import { mockUser, mockCourses, mockAchievements, mockForumPosts, mockStudyGroups } from '../data/mockData';

interface AppStore {
  user: User | null;
  isLoggedIn: boolean;
  currentLanguage: Language;
  currentLevel: CourseLevel;
  selectedCourse: Course | null;
  selectedModule: ModuleType | null;
  userProgress: UserProgress[];
  userAchievements: UserAchievement[];
  forumPosts: ForumPost[];
  studyGroups: StudyGroup[];
  courses: Course[];
  
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, displayName: string) => void;
  setCurrentLanguage: (lang: Language) => void;
  setCurrentLevel: (level: CourseLevel) => void;
  selectCourse: (course: Course | null) => void;
  selectModule: (module: ModuleType | null) => void;
  updateProgress: (courseId: string, moduleId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  getFilteredCourses: (language?: Language, level?: CourseLevel) => Course[];
  getUserProgressForCourse: (courseId: string) => number;
}

export const useAppStore = create<AppStore>((set, get) => ({
  user: mockUser,
  isLoggedIn: true,
  currentLanguage: 'en',
  currentLevel: 'beginner',
  selectedCourse: null,
  selectedModule: null,
  userProgress: [],
  userAchievements: [
    { userId: mockUser.id, achievementId: 'ach1', unlockedAt: new Date() },
    { userId: mockUser.id, achievementId: 'ach2', unlockedAt: new Date() },
  ],
  forumPosts: mockForumPosts,
  studyGroups: mockStudyGroups,
  courses: mockCourses,

  login: (email: string, password: string) => {
    set({ user: mockUser, isLoggedIn: true });
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
  },

  register: (email: string, password: string, displayName: string) => {
    const newUser: User = {
      id: 'new-user',
      email,
      displayName,
      languagePreference: 'en',
      streak: 0,
      totalLearningHours: 0,
      createdAt: new Date(),
    };
    set({ user: newUser, isLoggedIn: true });
  },

  setCurrentLanguage: (lang: Language) => {
    set({ currentLanguage: lang });
  },

  setCurrentLevel: (level: CourseLevel) => {
    set({ currentLevel: level });
  },

  selectCourse: (course: Course | null) => {
    set({ selectedCourse: course });
  },

  selectModule: (module: ModuleType | null) => {
    set({ selectedModule: module });
  },

  updateProgress: (courseId: string, moduleId: string, progress: number) => {
    const { userProgress, user } = get();
    if (!user) return;

    const existingIndex = userProgress.findIndex(
      (p) => p.courseId === courseId && p.moduleId === moduleId
    );

    const newProgress: UserProgress = {
      userId: user.id,
      courseId,
      moduleId,
      progress,
      lastAccessedAt: new Date(),
      completedAt: progress >= 1 ? new Date() : undefined,
    };

    if (existingIndex >= 0) {
      const updatedProgress = [...userProgress];
      updatedProgress[existingIndex] = newProgress;
      set({ userProgress: updatedProgress });
    } else {
      set({ userProgress: [...userProgress, newProgress] });
    }

    const completedLessons = userProgress.filter((p) => p.completedAt).length + (progress >= 1 ? 1 : 0);
    if (completedLessons >= 1) {
      get().unlockAchievement('ach1');
    }
  },

  unlockAchievement: (achievementId: string) => {
    const { userAchievements, user } = get();
    if (!user) return;

    const alreadyUnlocked = userAchievements.some(
      (ua) => ua.achievementId === achievementId
    );

    if (!alreadyUnlocked) {
      const newAchievement: UserAchievement = {
        userId: user.id,
        achievementId,
        unlockedAt: new Date(),
      };
      set({ userAchievements: [...userAchievements, newAchievement] });
    }
  },

  getFilteredCourses: (language?: Language, level?: CourseLevel) => {
    const { courses } = get();
    return courses.filter((course) => {
      if (language && course.language !== language) return false;
      if (level && course.level !== level) return false;
      return true;
    });
  },

  getUserProgressForCourse: (courseId: string) => {
    const { userProgress, courses } = get();
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;

    const moduleProgress = course.modules.map((module) => {
      const progress = userProgress.find(
        (p) => p.courseId === courseId && p.moduleId === module.id
      );
      return progress?.progress || 0;
    });

    if (moduleProgress.length === 0) return 0;
    return moduleProgress.reduce((a, b) => a + b, 0) / moduleProgress.length;
  },
}));
