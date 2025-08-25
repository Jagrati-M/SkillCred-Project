import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SyllabusInputForm } from './components/SyllabusInputForm';
import { GeneratedContent } from './components/GeneratedContent';
import { Loader } from './components/Loader';
import { generateContentFromSyllabus } from './services/geminiService';
import type { FormState, GeneratedResult } from './types';
import { BrainCircuitIcon as BookIcon } from './components/icons/BrainCircuitIcon';
import { Features } from './components/Features';

type Theme = 'light' | 'dark';

const initialFormState: FormState = {
  title: '',
  targetAudience: '',
  durationScope: '',
  topics: [''],
};

const Particles: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full" aria-hidden="true">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute bg-white/50 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          animation: `float ${Math.random() * 20 + 10}s linear infinite`,
          animationDelay: `${Math.random() * -30}s`,
        }}
      />
    ))}
  </div>
);

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleCreateNew = useCallback(() => {
    setFormState(initialFormState);
    setResult(null);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedResult = await generateContentFromSyllabus(formState);
      setResult(generatedResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  return (
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 selection:bg-purple-500/30">
      
      <header className="relative overflow-hidden text-center text-white animated-gradient bg-[linear-gradient(-45deg,_#300268,_#4f0375,_#931983,_#d6547f)]">
        <div className="absolute top-4 right-4 z-20">
          <Header theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24">
          <Particles />
          <BookIcon className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            EduGuide Generator
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/80">
            Transform syllabi into comprehensive educational guides
          </p>
          <div className="mt-4 text-sm text-white/60 flex items-center justify-center space-x-2">
            <span>●</span>
            <span>Powered by AI</span>
            <span>●</span>
          </div>
        </div>
      </header>

      <main className="relative -mt-8 md:-mt-12 z-10">
         <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 h-[500px] -z-10 bg-gradient-to-b from-purple-50 dark:from-purple-900/10 to-transparent"
        />
         <div className="container mx-auto p-4 md:p-8 pt-10 relative">
          <div className="max-w-4xl mx-auto">

            {isLoading && <Loader />}

            {error && !isLoading && (
              <div className="my-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {!isLoading && result ? (
               <div className="animate-fade-in">
                 <GeneratedContent result={result} onCreateNew={handleCreateNew} />
               </div>
            ) : !isLoading && !error && (
              <>
                <Features />
                <SyllabusInputForm
                  formState={formState}
                  setFormState={setFormState}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;