import React, { useState, useEffect } from 'react';

const messages = [
  'Generating your guide, please wait...',
  'Consulting the digital library...',
  'Structuring the content...',
  'Finding the best examples...',
  'Almost there, polishing the final draft...',
];

export const Loader: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-12 animate-fade-in">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 dark:text-slate-400 text-center px-4">{message}</p>
    </div>
  );
};
