import React from 'react';
import { LightningIcon } from './icons/LightningIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { FormatsIcon } from './icons/FormatsIcon';

const featureData = [
  {
    icon: LightningIcon,
    title: 'Lightning Fast',
    description: 'Generate comprehensive guides in seconds with AI-powered content creation.',
    bgColor: 'bg-blue-100 dark:bg-blue-900/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: CheckCircleIcon,
    title: 'Professional Quality',
    description: 'Get structured content with examples, key points, and academic references.',
    bgColor: 'bg-green-100 dark:bg-green-900/50',
    iconColor: 'text-green-600 dark:text-green-400',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: FormatsIcon,
    title: 'Multiple Formats',
    description: 'Export as Markdown, blog posts, or simple text for any platform.',
    bgColor: 'bg-purple-100 dark:bg-purple-900/50',
    iconColor: 'text-purple-600 dark:text-purple-400',
    gradient: 'from-purple-500 to-fuchsia-600',
  },
];

const FeatureCard: React.FC<typeof featureData[0]> = ({ icon: Icon, title, description, gradient }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg bg-gradient-to-br ${gradient}`}>
      <Icon className="w-10 h-10" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
);


export const Features: React.FC = () => {
  return (
    <div className="mb-8 md:mb-12 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {featureData.map(feature => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
};