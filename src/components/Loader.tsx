import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center h-48"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading...</span>
      <div
        className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default Loader;
