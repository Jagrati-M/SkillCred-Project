import React from 'react';

export const RocketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.12-.67-.82-2.32-1.01-3.12-.05z" />
    <path d="m12 15-3-3a9 9 0 0 1 3-7 9 9 0 0 1 7 3l-3 3" />
    <path d="m9 12 3 3" />
    <path d="M19 2c-2.34 2.34-3 5.66-3 5.66" />
  </svg>
);