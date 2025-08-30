
import React from 'react';

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, className = '' }) => {
  const baseClasses = 'text-white text-2xl font-bold rounded-2xl h-20 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  const colorClasses = className.includes('bg-') ? '' : 'bg-slate-700 hover:bg-slate-600';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
