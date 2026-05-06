import { useAppStore } from '../store/appStore';
import { Language } from '../types';

interface LanguageSelectorProps {
  onChange: (lang: Language) => void;
  selectedLang: Language;
  showLabel?: boolean;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function LanguageSelector({ onChange, selectedLang, showLabel = true }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {showLabel && <span className="text-sm font-medium text-gray-600 mr-2">Select Language:</span>}
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onChange(lang.code)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
              selectedLang === lang.code
                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 text-gray-600'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            {showLabel && <span className="font-medium">{lang.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LevelSelector({ onChange, selectedLevel }: { onChange: (level: string) => void; selectedLevel: string }) {
  const levels = [
    { code: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-700' },
    { code: 'intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-700' },
    { code: 'advanced', name: 'Advanced', color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600 mr-2">Level:</span>
      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level.code}
            onClick={() => onChange(level.code)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedLevel === level.code
                ? `${level.color} ring-2 ring-offset-1 ring-current`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  );
}
