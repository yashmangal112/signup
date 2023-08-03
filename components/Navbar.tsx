import React from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className=" p-4 text-black bg-white absolute">
        <div>
          <a href="/" className="">
            <img src="images/Copy of Logo without text 2.png" alt="Logo" className="w-14" />
          </a>
        </div>
    </nav>
  );
};

export default Navbar;
