import React from 'react';

interface SocialProps {
  url: string;
  children: React.ReactNode;
}

export const Social = ({ url, children }: SocialProps) => {
  return (
    <a
      className="transition-transform hover:scale-105 cursor:pointer"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};
