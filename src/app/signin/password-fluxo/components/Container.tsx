import React, { ReactNode } from "react";

export interface ContainerProps {
  children?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 bgcontainer">
      <div className="bg-white w-full flex-col flex max-w-md mx-4 p-6 rounded-[15px] shadow-md md:mx-auto md:max-w-lg md:p-8">
        {children}
      </div>
    </div>
  );
};

export default Container;
