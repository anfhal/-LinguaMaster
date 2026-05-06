export type Language = 'en' | 'ja' | 'ko';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export type ModuleType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  languagePreference: Language;
  streak: number;
  totalLearningHours: number;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  language: Language;
  level: CourseLevel;
  description: string;
  coverImage: string;
  estimatedHours: number;
  modules: Module[];
  rating: number;
  studentsCount: number;
}

export interface Module {
  id: string;
  courseId: string;
  name: string;
  type: ModuleType;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: LessonContent;
  order: number;
}

export interface LessonContent {
  text: string;
  examples?: string[];
  audioUrl?: string;
  imageUrl?: string;
}

export interface Exercise {
  id: string;
  moduleId: string;
  type: string;
  question: QuestionContent;
  answer: AnswerContent;
  difficulty: number;
}

export interface QuestionContent {
  text: string;
  options?: string[];
  audioUrl?: string;
}

export interface AnswerContent {
  text: string;
  explanation?: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  moduleId: string;
  lessonId?: string;
  progress: number;
  completedAt?: Date;
  lastAccessedAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  requiredProgress: AchievementRequirement;
}

export interface AchievementRequirement {
  type: string;
  value: number;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: Date;
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  language: Language;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  language: Language;
  memberCount: number;
  createdAt: Date;
}

export interface GroupMembership {
  userId: string;
  groupId: string;
  joinedAt: Date;
  role: 'admin' | 'member';
}
