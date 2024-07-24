// src/assets/platformicons/Chevron.tsx
import React from "react";

interface ChevronProps {
  className?: string;
}

const Chevron: React.FC<ChevronProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L7 7L13 1" stroke="#737373" strokeWidth="2" />
    </svg>
  );
};

export default Chevron;
