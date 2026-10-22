import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ userRole, onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleSidebarToggle = (e) => {
            setCollapsed(e.detail.collapsed);
        };

        window.addEventListener('sidebar-toggle', handleSidebarToggle);
        return () => window.removeEventListener('sidebar-toggle', handleSidebarToggle);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar userRole={userRole} onLogout={onLogout} />
            <div
                className={`transition-all duration-300 flex flex-col min-h-screen ${collapsed ? 'ml-20' : 'ml-64'
                    }`}
            >
                <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
                    <Navbar userRole={userRole} onLogout={onLogout} showLinks={false} showLogo={false} showMobileMenu={false} />
                </div>
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
