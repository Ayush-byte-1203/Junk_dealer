import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/user/UserSidebar';
import UserHeader from '../components/user/UserHeader';

const UserLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Listen for sidebar toggle events from UserSidebar
        const handleSidebarToggle = (e) => {
            setIsSidebarOpen(e.detail.isOpen);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('user-sidebar-toggle', handleSidebarToggle);

        // Initial check
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('user-sidebar-toggle', handleSidebarToggle);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <UserSidebar />

            {/* Main Content Wrapper */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <UserHeader />

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
