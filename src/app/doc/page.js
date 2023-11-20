import React from 'react';
import Image from 'next/image'

const Documentation = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">CIAM Documentation</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Getting Started</h2>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-lg mr-4">
            <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
            </div>
            <div>
              <p className="text-gray-700 mb-2">Step 1: Create you account</p>
              
                <p className="text-gray-700 mb-2">Login to our /auth directory to get a privatised api to CIAM</p>
            </div>
          </div>
          {/* Add more steps with images and code */}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-lg mr-4"></div>
            <div>
              <p className="text-gray-700 mb-2">Step 1: Install Dependencies</p>
              <pre className="bg-gray-200 p-2 rounded-lg">
                <code className="text-sm font-mono text-gray-700">
                  {`npm install next react react-dom`}
                </code>
              </pre>
            </div>
          </div>
          {/* Add more steps with images and code */}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
