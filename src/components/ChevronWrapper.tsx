// src/components/ChevronWrapper.tsx
import React from "react";
import Chevron from "../assets/platformicons/Chevron";

interface ChevronWrapperProps {
  className?: string;
}

const ChevronWrapper: React.FC<ChevronWrapperProps> = ({ className }) => {
  return <Chevron className={className} />;
};

export default ChevronWrapper;
