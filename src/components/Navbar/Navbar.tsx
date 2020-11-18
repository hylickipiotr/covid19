import React from "react";

const Navbar: React.FC<{}> = ({}) => {
  return (
    <div className="flex w-full justify-center items-center py-4 px-4 lg:px-8 bg-white shadow-md">
      <div className="text-gray-800">
        <div className="flex justify-center text-xl lg:text-2xl font-bold">
          COVID-19
        </div>
        <div className="flex just justify-center -mt-1 xl:-mt-2 text-xs lg:text-sm">
          Statystyki zachorowań
        </div>
      </div>
    </div>
  );
};

export default Navbar;
