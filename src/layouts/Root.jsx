import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div>
            <header><Navbar/></header>
            <main className='pt-10'><Outlet/></main>
            <footer><Footer/></footer>
        </div>
    );
};

export default Root;