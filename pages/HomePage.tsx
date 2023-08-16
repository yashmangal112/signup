import React from 'react';
import Image from 'next/image';
import Main from '../components/Main'
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  return (
    <>
    <Navbar />
    <Main />
    </>
  );
};

export default HomePage;