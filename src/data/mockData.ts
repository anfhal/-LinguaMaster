import { Course, Achievement, ForumPost, StudyGroup, User } from '../types';

export const mockUser: User = {
  id: 'user-1',
  email: 'learner@example.com',
  displayName: 'Language Explorer',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  languagePreference: 'en',
  streak: 7,
  totalLearningHours: 42,
  createdAt: new Date('2024-01-15'),
};

export const mockCourses: Course[] = [
  {
    id: 'course-en-beginner',
    title: 'English for Beginners',
    language: 'en',
    level: 'beginner',
    description: 'Start your English learning journey with basic vocabulary, essential grammar, and simple conversations.',
    coverImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=english%20language%20learning%20concept%20with%20books%20and%20world%20map%20warm%20colors&image_size=landscape_16_9',
    estimatedHours: 20,
    rating: 4.8,
    studentsCount: 12580,
    modules: [
      { id: 'm1', courseId: 'course-en-beginner', name: 'Basic Vocabulary', type: 'vocabulary', order: 1, lessons: [] },
      { id: 'm2', courseId: 'course-en-beginner', name: 'Simple Grammar', type: 'grammar', order: 2, lessons: [] },
      { id: 'm3', courseId: 'course-en-beginner', name: 'Daily Conversations', type: 'speaking', order: 3, lessons: [] },
      { id: 'm4', courseId: 'course-en-beginner', name: 'Listening Practice', type: 'listening', order: 4, lessons: [] },
    ],
  },
  {
    id: 'course-en-intermediate',
    title: 'English Intermediate',
    language: 'en',
    level: 'intermediate',
    description: 'Build on your foundation with more complex grammar, expanded vocabulary, and practical conversation skills.',
    coverImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=intermediate%20english%20learning%20with%20conversation%20bubbles%20professional%20setting&image_size=landscape_16_9',
    estimatedHours: 35,
    rating: 4.7,
    studentsCount: 8920,
    modules: [
      { id: 'm5', courseId: 'course-en-intermediate', name: 'Advanced Vocabulary', type: 'vocabulary', order: 1, lessons: [] },
      { id: 'm6', courseId: 'course-en-intermediate', name: 'Complex Grammar', type: 'grammar', order: 2, lessons: [] },
      { id: 'm7', courseId: 'course-en-intermediate', name: 'Business Conversations', type: 'speaking', order: 3, lessons: [] },
      { id: 'm8', courseId: 'course-en-intermediate', name: 'Advanced Listening', type: 'listening', order: 4, lessons: [] },
    ],
  },
  {
    id: 'course-ja-beginner',
    title: 'Japanese for Beginners',
    language: 'ja',
    level: 'beginner',
    description: 'Learn Hiragana, Katakana, and basic Japanese phrases for everyday communication.',
    coverImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=japanese%20language%20learning%20with%20kanji%20characters%20cherry%20blossoms%20traditional%20style&image_size=landscape_16_9',
    estimatedHours: 25,
    rating: 4.9,
    studentsCount: 9840,
    modules: [
      { id: 'm9', courseId: 'course-ja-beginner', name: 'Hiragana', type: 'vocabulary', order: 1, lessons: [] },
      { id: 'm10', courseId: 'course-ja-beginner', name: 'Katakana', type: 'vocabulary', order: 2, lessons: [] },
      { id: 'm11', courseId: 'course-ja-beginner', name: 'Basic Grammar', type: 'grammar', order: 3, lessons: [] },
      { id: 'm12', courseId: 'course-ja-beginner', name: 'Daily Japanese', type: 'speaking', order: 4, lessons: [] },
    ],
  },
  {
    id: 'course-ja-intermediate',
    title: 'Japanese Intermediate',
    language: 'ja',
    level: 'intermediate',
    description: 'Expand your Japanese skills with Kanji, more complex grammar, and conversational practice.',
    coverImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=japanese%20kanji%20learning%20modern%20city%20background%20professional%20atmosphere&image_size=landscape_16_9',
    estimatedHours: 40,
    rating: 4.8,
    studentsCount: 6720,
    modules: [
      { id: 'm13', courseId: 'course-ja-intermediate', name: 'Kanji Level 1', type: 'vocabulary', order: 1, lessons: [] },
      { id: 'm14', courseId: 'course-ja-intermediate', name: 'Advanced Grammar', type: 'grammar', order: 2, lessons: [] },
      { id: 'm15', courseId: 'course-ja-intermediate', name: 'Conversational Japanese', type: 'speaking', order: 3, lessons: [] },
      { id: 'm16', courseId: 'course-ja-intermediate', name: 'Listening Comprehension', type: 'listening', order: 4, lessons: [] },
    ],
  },
  {
    id: 'course-ko-beginner',
    title: 'Korean for Beginners',
    language: 'ko',
    level: 'beginner',
    description: 'Start learning Korean with Hangul, basic vocabulary, and essential phrases for travel and daily life.',
    coverImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=korean%20language%20learning%20hangul%20characters%20colorful%20modern%20design&image_size=landscape_16_9',
    estimatedHours: 22,
    rating: 4.8,
    studentsCount: 11230,
    modules: [
      { id: 'm17', courseId: 'course-ko-beginner', name: 'Hangul Basics', type: 'vocabulary', order: 1, lessons: [] },
      { id: 'm18', courseId: 'course-ko-beginner', name: 'Essential Vocabulary', type: 'vocabulary', order: 2, lessons: [] },
      { id: 'm19', courseId: 'course-ko-beginner', name: 'Basic Grammar', type: 'grammar', order: 3, lessons: [] },
      { id: 'm20', courseId: 'course-ko-beginner', name: 'Everyday Korean', type: 'speaking', order: 4, lessons: [] },
    ],
  },
  {
    id: 'course-ko-intermediate',
    title: 'Korean Intermediate',
    language: 'ko',
    level: 'intermediate',
    description: 'Advance your Korean skills with more vocabulary, complex grammar, and practical conversation practice.',
    coverImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=intermediate%20korean%20learning%20korean%20drama%20scene%20professional%20education&image_size=landscape_16_9',
    estimatedHours: 38,
    rating: 4.7,
    studentsCount: 7560,
    modules: [
      { id: 'm21', courseId: 'course-ko-intermediate', name: 'Expanded Vocabulary', type: 'vocabulary', order: 1, lessons: [] },
      { id: 'm22', courseId: 'course-ko-intermediate', name: 'Complex Sentences', type: 'grammar', order: 2, lessons: [] },
      { id: 'm23', courseId: 'course-ko-intermediate', name: 'Fluent Conversations', type: 'speaking', order: 3, lessons: [] },
      { id: 'm24', courseId: 'course-ko-intermediate', name: 'Korean Media Listening', type: 'listening', order: 4, lessons: [] },
    ],
  },
];

export const mockAchievements: Achievement[] = [
  { id: 'ach1', name: 'First Lesson', description: 'Complete your first lesson', icon: '🎯', type: 'milestone', requiredProgress: { type: 'lessons_completed', value: 1 } },
  { id: 'ach2', name: '7-Day Streak', description: 'Study for 7 consecutive days', icon: '🔥', type: 'streak', requiredProgress: { type: 'streak', value: 7 } },
  { id: 'ach3', name: 'Vocabulary Master', description: 'Learn 100 words', icon: '📚', type: 'learning', requiredProgress: { type: 'words_learned', value: 100 } },
  { id: 'ach4', name: 'Grammar Pro', description: 'Complete 50 grammar exercises', icon: '✅', type: 'learning', requiredProgress: { type: 'grammar_exercises', value: 50 } },
  { id: 'ach5', name: 'Speaking Star', description: 'Complete 20 speaking exercises', icon: '🎤', type: 'learning', requiredProgress: { type: 'speaking_exercises', value: 20 } },
  { id: 'ach6', name: 'Listening Expert', description: 'Complete 30 listening exercises', icon: '👂', type: 'learning', requiredProgress: { type: 'listening_exercises', value: 30 } },
  { id: 'ach7', name: 'Course Finisher', description: 'Complete your first course', icon: '🏆', type: 'milestone', requiredProgress: { type: 'courses_completed', value: 1 } },
  { id: 'ach8', name: 'Language Explorer', description: 'Learn 3 different languages', icon: '🌍', type: 'milestone', requiredProgress: { type: 'languages_learned', value: 3 } },
];

export const mockForumPosts: ForumPost[] = [
  { id: 'post1', userId: 'user-1', title: 'Best way to memorize Japanese Kanji?', content: 'I\'m struggling with Kanji memorization. Any tips?', language: 'ja', createdAt: new Date('2024-01-20'), likesCount: 24, commentsCount: 8 },
  { id: 'post2', userId: 'user-2', title: 'English conversation practice partners?', content: 'Looking for someone to practice speaking English with. DM me!', language: 'en', createdAt: new Date('2024-01-19'), likesCount: 18, commentsCount: 12 },
  { id: 'post3', userId: 'user-3', title: 'Korean drama recommendations for learning', content: 'What Korean dramas would you recommend for improving listening skills?', language: 'ko', createdAt: new Date('2024-01-18'), likesCount: 35, commentsCount: 15 },
  { id: 'post4', userId: 'user-4', title: 'How long does it take to learn basic Japanese?', content: 'Curious about how long it takes to reach conversational level.', language: 'ja', createdAt: new Date('2024-01-17'), likesCount: 42, commentsCount: 20 },
];

export const mockStudyGroups: StudyGroup[] = [
  { id: 'group1', name: 'English Morning Study', description: 'Daily morning study sessions for English learners', language: 'en', memberCount: 128, createdAt: new Date('2024-01-10') },
  { id: 'group2', name: 'Japanese Anime Club', description: 'Learn Japanese through anime and manga', language: 'ja', memberCount: 256, createdAt: new Date('2024-01-08') },
  { id: 'group3', name: 'Korean K-pop Learners', description: 'Learn Korean while enjoying K-pop music', language: 'ko', memberCount: 189, createdAt: new Date('2024-01-05') },
  { id: 'group4', name: 'Business English Mastery', description: 'Focus on business vocabulary and communication', language: 'en', memberCount: 89, createdAt: new Date('2024-01-03') },
];

export const vocabularyWords = [
  { word: 'apple', meaning: '苹果', example: 'I eat an apple every day.' },
  { word: 'book', meaning: '书', example: 'This is a good book.' },
  { word: 'computer', meaning: '电脑', example: 'I use my computer for work.' },
  { word: 'happy', meaning: '快乐的', example: 'She looks very happy.' },
  { word: 'water', meaning: '水', example: 'Drink plenty of water.' },
  { word: 'friend', meaning: '朋友', example: 'He is my best friend.' },
  { word: 'school', meaning: '学校', example: 'I go to school every day.' },
  { word: 'time', meaning: '时间', example: 'What time is it?' },
];

export const grammarQuestions = [
  { question: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'went'], answer: 'goes', explanation: 'Third person singular present tense' },
  { question: 'I have ___ finished my homework.', options: ['already', 'yet', 'ever', 'never'], answer: 'already', explanation: 'Used for actions completed before now' },
  { question: 'If I ___ rich, I would travel the world.', options: ['am', 'was', 'were', 'be'], answer: 'were', explanation: 'Subjunctive mood for hypothetical situations' },
];

export const speakingPrompts = [
  { prompt: 'Describe your favorite hobby', duration: 30 },
  { prompt: 'Talk about your last vacation', duration: 45 },
  { prompt: 'Explain why you want to learn this language', duration: 30 },
];

export const listeningClips = [
  { text: 'Hello, my name is John. I am from New York. I like to play basketball in my free time.', questions: ['Where is John from?', 'What does John like to do?'] },
  { text: 'The weather today is very nice. It is sunny and warm. Perfect day for a picnic!', questions: ['What is the weather like today?', 'What is it a perfect day for?'] },
];
