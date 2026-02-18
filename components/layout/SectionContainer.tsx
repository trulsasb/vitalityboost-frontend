import * as React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={`w-full py-12 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
