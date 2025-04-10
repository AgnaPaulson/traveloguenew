
import React from 'react';

interface MarkdownContentCardProps {
  title: string;
  content: string | null;
}

const MarkdownContentCard: React.FC<MarkdownContentCardProps> = ({ title, content }) => {
  if (!content) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap text-sm text-gray-600">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default MarkdownContentCard;
