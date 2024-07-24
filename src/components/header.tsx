import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import devlinksLogo from "@/assets/Group 251.svg";
import devlinksLogoSm from "@/assets/solar_link-circle-bold.svg";

type HeaderProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const router = useRouter();

  const handlePreviewClick = () => {
    router.push("/preview/preview"); // Navigate to the preview page
  };

  return (
    <div className="bg-gray-50 p-4">
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md rounded-lg">
        <div className="flex items-center">
          <Image
            src={devlinksLogo}
            alt="devlinks logo"
            width={150}
            height={40}
            className="mr-2 hidden sm:inline"
          />
          <Image
            src={devlinksLogoSm}
            alt="devlinks logo"
            width={32}
            height={32}
            className="mr-2 sm:hidden"
          />
        </div>

        <nav className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => onSectionChange("links")}
            className={`flex items-center p-2 rounded-lg hover:bg-purple-100 ${
              activeSection === "links" ? "bg-purple-100" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span className="ml-2 hidden sm:inline">Links</span>
          </button>

          <button
            onClick={() => onSectionChange("profile")}
            className={`flex items-center p-2 rounded-lg hover:bg-purple-100 ${
              activeSection === "profile" ? "bg-purple-100" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.9999 18C17.9999 16.4087 17.3678 14.8826 16.2426 13.7574C15.1174 12.6321 13.5913 12 11.9999 12H7.99994C6.4086 12 4.88245 12.6321 3.75723 13.7574C2.63202 14.8826 1.99994 16.4087 1.99994 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 hidden sm:inline">Profile Details</span>
          </button>
        </nav>

        <button
          onClick={handlePreviewClick}
          className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <span className="hidden sm:inline">Preview</span>
          <svg
            className="w-5 h-5 sm:hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </header>
    </div>
  );
};

export default Header;
