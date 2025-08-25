import React from 'react';

export const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M9.5 2.5 12 8l2.5-5.5L17 5.5l5.5-2.5L20 8l2.5 2.5-5.5 2.5L14.5 17l-2.5-5.5L6.5 14l2.5-5.5Z"/>
        <path d="M2.5 9.5 8 12l-5.5 2.5L5.5 17l-2.5 5.5L8 20l2.5 2.5-2.5-5.5L11.5 14.5"/>
    </svg>
);
