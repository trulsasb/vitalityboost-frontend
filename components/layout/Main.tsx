import * as React from "react";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className = "" }) => {
  return (
    <main
      className={`w-full min-h-screen bg-white ${className}`}
    >
      {children}
    </main>
  );
};
