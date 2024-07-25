import React from "react";

interface PreviewHeaderProps {
  onBackClick: () => void;
  onShareClick: () => void;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  onBackClick,
  onShareClick,
}) => {
  return (
    <div className="bg-white px-4 py-3 rounded-xl">
      <header className="flex items-center justify-between mx-auto">
        <button
          onClick={onBackClick}
          className="px-4 py-2 text-[#633CFF] border border-[#633CFF] rounded-lg hover:bg-[#633CFF] hover:text-white transition-colors"
        >
          Back to Editor
        </button>
        <button
          onClick={onShareClick}
          className="px-4 py-2 text-white bg-[#633CFF] rounded-lg hover:bg-[#4f2fc7] transition-colors"
        >
          Share Link
        </button>
      </header>
    </div>
  );
};

export default PreviewHeader;
