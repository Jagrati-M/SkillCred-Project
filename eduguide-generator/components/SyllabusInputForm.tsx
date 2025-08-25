import React from 'react';
import type { FormState } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SparkleIcon } from './icons/SparkleIcon';
import { WifiIcon } from './icons/WifiIcon';
import { FormatsIcon } from './icons/FormatsIcon';
import { TargetIcon } from './icons/TargetIcon';
import { ClockIcon } from './icons/ClockIcon';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { RocketIcon } from './icons/RocketIcon';


interface SyllabusInputFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const popularTopics = [
    "Python Programming", "Machine Learning", "Web Development", "Data Science",
    "Digital Marketing", "UI/UX Design", "Business Strategy", "Project Management"
];

export const SyllabusInputForm: React.FC<SyllabusInputFormProps> = ({
  formState,
  setFormState,
  onSubmit,
  isLoading,
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...formState.topics];
    newTopics[index] = value;
    setFormState(prevState => ({ ...prevState, topics: newTopics }));
  };

  const addTopic = () => {
    setFormState(prevState => ({ ...prevState, topics: [...prevState.topics, ''] }));
  };
  
  const removeTopic = (index: number) => {
    if (formState.topics.length > 1) {
        const newTopics = formState.topics.filter((_, i) => i !== index);
        setFormState(prevState => ({ ...prevState, topics: newTopics }));
    }
  };

  const addPopularTopic = (topic: string) => {
    // If the last topic is empty, replace it. Otherwise, add a new one.
    const lastTopicIndex = formState.topics.length - 1;
    const newTopics = [...formState.topics];
    if (formState.topics[lastTopicIndex].trim() === '') {
        newTopics[lastTopicIndex] = topic;
    } else {
        newTopics.push(topic);
    }
    setFormState(prevState => ({...prevState, topics: newTopics }));
  }

  const isFormValid = formState.title.trim() !== '' && formState.topics.every(t => t.trim() !== '');

  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 transition-shadow duration-300 hover:shadow-2xl animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center px-4 py-2 mb-4 text-sm font-medium text-purple-700 bg-purple-100 rounded-full dark:bg-purple-900/50 dark:text-purple-300">
          <FormatsIcon className="w-5 h-5 mr-2" />
          AI-Powered Content Generation
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          Create Your Educational Guide
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-sm md:text-base">
          Fill in the details below and our AI will generate comprehensive, personalized educational content using advanced language models.
        </p>
        <div className="mt-4 inline-flex items-center text-xs font-medium text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-300 px-2.5 py-1 rounded-full">
            <WifiIcon className="w-3.5 h-3.5 mr-1.5" />
            AI API Connected
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
             <SparkleIcon className="w-4 h-4 mr-2 text-purple-500" />
            Course/Guide Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formState.title}
            onChange={handleInputChange}
            placeholder="e.g., Introduction to Data Science"
            className="w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:focus:ring-purple-400 transition"
            disabled={isLoading}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="targetAudience" className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <TargetIcon className="w-4 h-4 mr-2 text-green-500" />
                    Target Audience
                </label>
                <input id="targetAudience" name="targetAudience" type="text" value={formState.targetAudience} onChange={handleInputChange} placeholder="e.g., Beginners, Professionals" className="w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:focus:ring-purple-400 transition" disabled={isLoading}/>
            </div>
            <div>
                <label htmlFor="durationScope" className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <ClockIcon className="w-4 h-4 mr-2 text-sky-500" />
                    Duration/Scope
                </label>
                <input id="durationScope" name="durationScope" type="text" value={formState.durationScope} onChange={handleInputChange} placeholder="e.g., 8 Weeks, Self-paced" className="w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:focus:ring-purple-400 transition" disabled={isLoading}/>
            </div>
        </div>

        <div>
            <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <PlusIcon className="w-4 h-4 mr-2 text-fuchsia-500" />
                Topics/Modules *
            </label>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center mb-3">
                    <LightbulbIcon className="w-4 h-4 mr-2 text-amber-500"/>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Popular topics:</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {popularTopics.map(topic => (
                        <button key={topic} onClick={() => addPopularTopic(topic)} disabled={isLoading} className="px-3 py-1 text-xs font-medium text-sky-800 bg-sky-100 rounded-full hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:hover:bg-sky-900 transition-colors">
                            {topic}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    {formState.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input type="text" value={topic} onChange={(e) => handleTopicChange(index, e.target.value)} placeholder={`Topic ${index + 1}`} className="w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:focus:ring-purple-400 transition" disabled={isLoading} />
                            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{index + 1}</span>
                            <button onClick={() => removeTopic(index)} disabled={isLoading || formState.topics.length <= 1} className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <XIcon className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}
                </div>
                
                <button onClick={addTopic} disabled={isLoading} className="mt-4 w-full flex items-center justify-center text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 rounded-lg px-4 py-2 transition-colors duration-200">
                    <PlusIcon className="w-4 h-4 mr-2"/>
                    Add Another Topic
                </button>
            </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onSubmit}
            disabled={isLoading || !isFormValid}
            className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900 transition-all transform hover:scale-[1.02]"
          >
            {isLoading ? (
                <>
                    <SpinnerIcon className="w-6 h-6 mr-3" />
                    Generating...
                </>
            ) : (
                <>
                    <RocketIcon className="w-6 h-6 mr-3" />
                    Generate with AI
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};