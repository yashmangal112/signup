import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className=" p-4 text-black absolute z-10 bg-transparent w-11/12">
        <div className='flex justify-between'>
          <Link href='/'>
            {/* <a href="/" className=""> */}
              <img src="images/Copy of Logo without text 2.png" alt="Logo" className="w-14" />
            {/* </a> */}
          </Link>
          <Link href="/myassets"> My Assests
          </Link>
        </div>
    </nav>
  );
};

export default Navbar;
