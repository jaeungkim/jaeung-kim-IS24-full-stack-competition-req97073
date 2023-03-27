import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="flex justify-between items-center p-4 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
      </nav>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
};

export default Layout;
