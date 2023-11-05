import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return <input {...props} className="border-0 h-9 rounded-md outline-none px-2 mb-3" />;
};