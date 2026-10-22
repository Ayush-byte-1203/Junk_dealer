import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminHeader = () => {
    const location = useLocation();

    // Map routes to titles
    const getPageTitle = (pathname) => {
        const path = pathname.substring(1); // remove leading slash
        if (path === 'admin-dashboard') return 'Admin Dashboard';

        // Convert kebab-case to Title Case (e.g., user-management -> User Management)
        return path
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-end px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">A</div>
                    <span className="text-sm font-medium text-slate-700">Admin</span>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
