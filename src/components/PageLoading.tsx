import React from 'react';

const PageLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-white">
        {/* Animated Icon (Replace with your preferred icon library) */}
        <svg className="animate-spin h-16 w-16 text-blue-600 mb-8" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        {/* Loading Message */}
        <p className="text-sm text-gray-700 mt-2 p-6 semi-bold">
          This might take a moment.  Hang tight!
        </p>
      </div>
    </div>
  );
};

export default PageLoading;
