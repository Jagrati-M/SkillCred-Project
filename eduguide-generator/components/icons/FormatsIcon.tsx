import React from 'react';

export const FormatsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12.25 2.25 10 10l-7.75 2.25L10 14.5l2.25 7.75L14.5 14.5l7.75-2.25L14.5 10l-2.25-7.75Z" />
    <path d="M4.5 4.5 2 7l2.5 2.5L7 7l-2.5-2.5Z" />
    <path d="m19.5 19.5 2.5-2.5-2.5-2.5-2.5 2.5 2.5 2.5Z" />
  </svg>
);
