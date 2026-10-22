import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const MainLayout = ({ userRole, onLogout }) => {
    return (
        <div className="main-wrapper">
            <Navbar userRole={userRole} onLogout={onLogout} />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
