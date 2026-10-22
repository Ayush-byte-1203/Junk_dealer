import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = ({ onLogout }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar onLogout={onLogout} />

            <div className="flex-1 ml-64 flex flex-col min-h-screen transition-all duration-300">
                <AdminHeader />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
