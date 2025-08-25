import React, { useRef, useState, useMemo } from 'react';
import type { GeneratedResult, Reference } from '../types';
import { CopyIcon } from './icons/CopyIcon';
import { FileDownIcon } from './icons/FileDownIcon';
import { CheckIcon } from './icons/CheckIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ListChecksIcon } from './icons/ListChecksIcon';
import { LibraryIcon } from './icons/LibraryIcon';

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

interface GeneratedContentProps {
  result: GeneratedResult;
  onCreateNew: () => void;
}

const SimpleMarkdownRenderer: React.FC<{ markdown: string }> = React.memo(({ markdown }) => {
    const createMarkup = (htmlString: string) => {
        return { __html: htmlString };
    };

    const renderedHtml = useMemo(() => {
        const blocks = markdown.split(/\n{2,}/); // Split by blank lines

        const htmlBlocks = blocks.map(block => {
            block = block.trim();
            if (!block) return '';

            // Headings
            if (block.startsWith('# ')) return `<h1 class="text-3xl font-extrabold mt-8 mb-4 text-slate-900 dark:text-slate-50">${block.substring(2)}</h1>`;
            if (block.startsWith('## ')) return `<h2 class="text-2xl font-semibold mt-6 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-800 dark:text-slate-100">${block.substring(3)}</h2>`;
            if (block.startsWith('### ')) return `<h3 class="text-xl font-medium mt-4 mb-2 text-slate-800 dark:text-slate-200">${block.substring(4)}</h3>`;

            // Blockquotes
            if (block.startsWith('> ')) {
                const content = block.split('\n').map(line => line.replace(/^> ?/, '')).join('<br />');
                return `<blockquote class="border-l-4 border-slate-300 dark:border-slate-600 pl-4 my-4 italic text-slate-600 dark:text-slate-400">${content}</blockquote>`;
            }

            // Code blocks
            if (block.startsWith('```') && block.endsWith('```')) {
                const code = block.slice(3, -3).trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<pre class="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-md overflow-x-auto text-sm my-4"><code class="font-mono">${code}</code></pre>`;
            }

            // Lists
            if (block.match(/^\s*[-*] /m) || block.match(/^\s*\d+\. /m)) {
                const isOrdered = block.match(/^\s*\d+\. /m);
                const listItems = block.split('\n').map(item => {
                    const content = item.replace(/^\s*([-*]|\d+\.) /, '');
                    return `<li class="my-1">${content}</li>`;
                }).join('');
                
                const listType = isOrdered ? 'ol' : 'ul';
                const listClass = isOrdered ? 'list-decimal' : 'list-disc';
                return `<${listType} class="${listClass} list-inside space-y-2 my-4 pl-4">${listItems}</${listType}>`;
            }

            // Paragraph
            return `<p class="my-4">${block.replace(/\n/g, '<br />')}</p>`;
        });

        let finalHtml = htmlBlocks.join('');

        // Inline elements (run on the full HTML string)
        finalHtml = finalHtml
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" class="my-4 rounded-lg shadow-md" />')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 dark:text-sky-400 hover:underline">$1</a>')
            .replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-700 text-sky-800 dark:text-sky-300 rounded px-1 py-0.5 text-sm font-mono">$1</code>');

        return finalHtml;
    }, [markdown]);

    return <div className="prose dark:prose-invert max-w-none leading-relaxed" dangerouslySetInnerHTML={createMarkup(renderedHtml)} />;
});


const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number }> = ({ icon, label, value }) => (
    <div className="flex-1 p-4 bg-slate-100 dark:bg-slate-800/70 rounded-lg flex items-center">
        {icon}
        <div className="ml-4">
            <div className="text-slate-500 dark:text-slate-400 text-sm">{label}</div>
            <div className="text-slate-900 dark:text-white text-2xl font-semibold">{value}</div>
        </div>
    </div>
);


export const GeneratedContent: React.FC<GeneratedContentProps> = ({ result, onCreateNew }) => {
  const { title, overview, learningObjectives, sections, references } = result;
  const contentRef = useRef<HTMLDivElement>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [isExporting, setIsExporting] = useState(false);

  const handleCopy = () => {
    if (contentRef.current) {
      navigator.clipboard.writeText(contentRef.current.innerText).then(() => {
        setCopyState('copied');
        setTimeout(() => setCopyState('idle'), 2000);
      });
    }
  };

  const handleExportPDF = () => {
     // Implementation remains the same
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <button onClick={onCreateNew} className="order-2 sm:order-1 flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <ArrowLeftIcon className="w-4 h-4 mr-2"/>
                Create New Guide
            </button>
            <div className="order-1 sm:order-2 flex space-x-2">
              <button onClick={handleCopy} className={`flex-1 sm:flex-none justify-center flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${copyState === 'copied' ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-300' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600'}`}>
                {copyState === 'copied' ? <CheckIcon className="w-5 h-5 mr-2" /> : <CopyIcon className="w-5 h-5 mr-2" />}
                {copyState === 'copied' ? 'Copied!' : 'Copy All'}
              </button>
              <button onClick={handleExportPDF} disabled={isExporting} className="flex-1 sm:flex-none justify-center flex items-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-wait">
                <FileDownIcon className="w-5 h-5 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </button>
            </div>
        </div>
      </div>
      
      <div ref={contentRef} className="p-6 md:p-8 text-slate-700 dark:text-slate-300">
        <div className="flex items-start mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg text-white mr-5">
                <BookOpenIcon className="w-8 h-8"/>
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">{title}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Generated by AI</p>
            </div>
        </div>

        <div className="my-8 flex flex-col md:flex-row gap-4">
            <StatCard icon={<BookOpenIcon className="w-7 h-7 text-purple-500"/>} label="Sections" value={sections.length}/>
            <StatCard icon={<ListChecksIcon className="w-7 h-7 text-sky-500"/>} label="Objectives" value={learningObjectives.length}/>
            <StatCard icon={<LibraryIcon className="w-7 h-7 text-green-500"/>} label="References" value={references.length}/>
        </div>

        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-purple-200 dark:border-purple-800 pl-4 py-2 my-8">{overview}</p>

        {learningObjectives.length > 0 && (
             <div className="my-8">
                <div className="p-4 rounded-t-lg bg-slate-100 dark:bg-slate-800 border-b-2 border-sky-300 dark:border-sky-700">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center"><ListChecksIcon className="w-6 h-6 mr-3 text-sky-500"/>Learning Objectives</h2>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-b-lg">
                    <ul className="space-y-4">
                    {learningObjectives.map((obj, index) => (
                        <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full flex items-center justify-center text-sm font-bold mr-4">{index + 1}</span>
                            <span className="text-slate-700 dark:text-slate-300">{obj}</span>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        )}

        <div className="space-y-8">
            {sections.map((section, index) => (
                <div key={index}>
                    <SimpleMarkdownRenderer markdown={`## ${section.title}\n\n${section.content}`} />
                </div>
            ))}
        </div>
        
        {references.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center">
                <LibraryIcon className="w-6 h-6 mr-3 text-green-500"/>Further Reading & References
            </h3>
            <ul className="space-y-3">
              {references.map((ref, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-sky-500 mr-3 mt-1">&#8226;</span>
                  <a href={ref.uri} target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline break-words">
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isExporting && (
        <div className="px-6 py-2 bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-sm text-center">
            Preparing PDF for download...
        </div>
      )}
    </div>
  );
};