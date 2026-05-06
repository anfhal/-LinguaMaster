import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Volume2, RotateCcw, Check, Mic, MicOff, Clock, Play, Pause } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { vocabularyWords, grammarQuestions, speakingPrompts, listeningClips } from '../data/mockData';

export default function Learn() {
  const { courseId, module } = useParams<{ courseId: string; module: string }>();
  const navigate = useNavigate();
  const { courses, updateProgress } = useAppStore();

  const course = courses.find((c) => c.id === courseId);
  const currentModule = course?.modules.find((m) => m.type === module);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const timerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const getModuleData = () => {
    switch (module) {
      case 'vocabulary':
        return vocabularyWords;
      case 'grammar':
        return grammarQuestions;
      case 'speaking':
        return speakingPrompts;
      case 'listening':
        return listeningClips;
      default:
        return [];
    }
  };

  const data = getModuleData();

  useEffect(() => {
    if (completedCount > 0 && data.length > 0) {
      const progress = completedCount / data.length;
      if (currentModule) {
        updateProgress(courseId!, currentModule.id, progress);
      }
    }
  }, [completedCount, data.length, courseId, currentModule, updateProgress]);

  useEffect(() => {
    if (module === 'speaking' && isSpeaking && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleNext();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSpeaking, module]);

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsSpeaking(false);
    setTimeLeft(30);
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompletedCount((prev) => prev + 1);
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    const correct = answer === (data[currentIndex] as any)?.answer;
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setShowAnswer(true);
  };

  const startSpeaking = () => {
    setIsSpeaking(true);
    setIsRecording(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.start();
        })
        .catch((err) => console.error('Error accessing microphone:', err));
    }
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setScore((prev) => prev + 1);
    handleNext();
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setScore(0);
    setCompletedCount(0);
  };

  if (!course || !currentModule || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Module not found</h1>
          <button onClick={() => navigate('/courses')} className="btn-primary mt-4">
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    const item = data[currentIndex];
    
    switch (module) {
      case 'vocabulary': {
        const word = item as { word: string; meaning: string; example: string };
        return (
          <div className="card text-center">
            <div className="mb-6">
              <button className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary-200 transition-colors">
                <Volume2 className="w-8 h-8 text-primary-600" />
              </button>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{word.word}</h2>
              <p className="text-gray-500">Click the button to hear pronunciation</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="text-xl font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {showAnswer ? word.meaning : 'Click to reveal meaning'}
              </button>
            </div>
            
            {showAnswer && (
              <div className="animate-fade-in">
                <p className="text-gray-600 mb-4">Example: {word.example}</p>
                <div className="flex justify-center gap-4">
                  <button onClick={handlePrev} disabled={currentIndex === 0} className="btn-secondary disabled:opacity-50">
                    Previous
                  </button>
                  <button onClick={handleNext} className="btn-primary">
                    {currentIndex < data.length - 1 ? 'Next Word' : 'Complete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      }
      
      case 'grammar': {
        const question = item as { question: string; options: string[]; answer: string; explanation: string };
        return (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
            
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                let buttonClass = 'p-4 rounded-xl border-2 text-left transition-all duration-300';
                if (showAnswer) {
                  if (option === question.answer) {
                    buttonClass += ' border-green-500 bg-green-50 text-green-700';
                  } else if (option === selectedAnswer && isCorrect === false) {
                    buttonClass += ' border-red-500 bg-red-50 text-red-700';
                  } else {
                    buttonClass += ' border-gray-200 text-gray-500';
                  }
                } else {
                  buttonClass += selectedAnswer === option
                    ? ' border-primary-500 bg-primary-50'
                    : ' border-gray-200 hover:border-primary-300';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={showAnswer}
                    className={buttonClass}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                    {showAnswer && option === question.answer && (
                      <Check className="w-5 h-5 inline-block ml-2 text-green-500" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {showAnswer && (
              <div className="animate-fade-in bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-blue-700">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Score: {score}/{currentIndex + 1}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="btn-secondary disabled:opacity-50">
                  Previous
                </button>
                <button onClick={handleNext} className="btn-primary">
                  {currentIndex < data.length - 1 ? 'Next Question' : 'Complete'}
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      case 'speaking': {
        const prompt = item as { prompt: string; duration: number };
        return (
          <div className="card text-center">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Speak about:</h2>
              <p className="text-2xl text-primary-600">{prompt.prompt}</p>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
                {timeLeft}s
              </span>
            </div>
            
            {!isSpeaking ? (
              <button
                onClick={startSpeaking}
                className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto hover:bg-red-200 transition-colors"
              >
                <Mic className="w-12 h-12 text-red-500" />
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={stopSpeaking}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto hover:bg-green-200 transition-colors"
                >
                  <MicOff className="w-12 h-12 text-green-500" />
                </button>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 bg-green-400 rounded-full animate-pulse"
                      style={{
                        height: `${10 + Math.random() * 20}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <p className="text-gray-500 mt-4">
              {isSpeaking ? 'Recording... speak into your microphone' : 'Click the button to start recording'}
            </p>
            
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="btn-secondary disabled:opacity-50">
                Previous
              </button>
              <button onClick={handleNext} className="btn-primary">
                {currentIndex < data.length - 1 ? 'Skip' : 'Complete'}
              </button>
            </div>
          </div>
        );
      }
      
      case 'listening': {
        const clip = item as { text: string; questions: string[] };
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [userAnswer, setUserAnswer] = useState('');
        const [showResult, setShowResult] = useState(false);
        
        const handleSubmit = () => {
          setShowResult(true);
          if (userAnswer.toLowerCase().includes('new york') || userAnswer.toLowerCase().includes('basketball')) {
            setScore((prev) => prev + 1);
          }
        };
        
        const nextQuestion = () => {
          if (currentQuestion < clip.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setUserAnswer('');
            setShowResult(false);
          } else {
            handleNext();
            setCurrentQuestion(0);
            setUserAnswer('');
            setShowResult(false);
          }
        };
        
        return (
          <div className="card">
            <div className="flex items-center justify-center gap-4 mb-6">
              <button className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors">
                {isSpeaking ? <Pause className="w-8 h-8 text-primary-600" /> : <Play className="w-8 h-8 text-primary-600" />}
              </button>
              <span className="text-gray-600">Click to play audio</span>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-800 font-medium">Listen and answer:</p>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {clip.questions[currentQuestion]}
            </h3>
            
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer..."
              disabled={showResult}
              className="input-field mb-4"
            />
            
            {showResult ? (
              <div className="animate-fade-in">
                <div className="bg-green-50 rounded-xl p-4 mb-4">
                  <p className="text-green-700">
                    <strong>Answer:</strong> {currentQuestion === 0 ? 'New York' : 'Play basketball'}
                  </p>
                </div>
                <button onClick={nextQuestion} className="btn-primary">
                  {currentQuestion < clip.questions.length - 1 ? 'Next Question' : 'Next Clip'}
                </button>
              </div>
            ) : (
              <button onClick={handleSubmit} className="btn-primary">
                Submit Answer
              </button>
            )}
            
            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-500">Score: {score}</span>
              <button onClick={handlePrev} disabled={currentIndex === 0} className="text-gray-500 hover:text-gray-700 disabled:opacity-50">
                Previous Clip
              </button>
            </div>
          </div>
        );
      }
      
      default:
        return null;
    }
  };

  const moduleNames: Record<string, string> = {
    vocabulary: 'Vocabulary',
    grammar: 'Grammar',
    speaking: 'Speaking',
    listening: 'Listening',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Course
          </button>
          <button onClick={resetProgress} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{moduleNames[module!]}</h1>
            <p className="text-gray-500">{course?.title}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Progress</p>
            <p className="text-xl font-bold text-primary-600">{currentIndex + 1}/{data.length}</p>
          </div>
        </div>

        <div className="progress-bar mb-8">
          <div className="progress-bar-fill" style={{ width: `${((currentIndex + 1) / data.length) * 100}%` }} />
        </div>

        {renderContent()}

        <div className="mt-8 flex justify-center gap-4">
          {course?.modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => navigate(`/learn/${courseId}/${mod.type}`)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                mod.type === module
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {moduleNames[mod.type]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
