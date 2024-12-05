import React from 'react';
import { SquareMenu } from 'lucide-react';


interface CompanyButtonProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

const CompanyButton: React.FC<CompanyButtonProps> = ({ text, onClick, isSelected }) => {
  return (
    <button
      className={`text-white text-sm py-[0.3rem] px-2 rounded-sm flex items-center gap-2 ${isSelected ? 'bg-[#2188FF] hover:bg-[#1574e1]' : 'bg-[#013B78] hover:bg-[#012852]'}`}
      onClick={onClick}
    >
      <span>
        <SquareMenu size={18} />
      </span>
      {text}
    </button>
  );
};

export default CompanyButton;