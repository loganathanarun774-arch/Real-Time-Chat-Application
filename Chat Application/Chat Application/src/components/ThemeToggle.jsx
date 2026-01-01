import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none
        ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}
      `}
            aria-label="Toggle Dark Mode"
        >
            {/* Track Icons */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
                <Sun size={14} className="text-yellow-500 opacity-100 dark:opacity-0 transition-opacity duration-300" />
                <Moon size={14} className="text-yellow-300 opacity-0 dark:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Thumb */}
            <div
                className={`
          w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center
          ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}
        `}
            >
                {/* Optional: Icon inside thumb if preferred, currently empty for clean look or tracking track icons */}
                {theme === 'dark'
                    ? <Moon size={12} className="text-gray-800 block md:hidden" />
                    : <Sun size={12} className="text-orange-500 block md:hidden" />
                }
            </div>
        </button>
    );
};

export default ThemeToggle;
