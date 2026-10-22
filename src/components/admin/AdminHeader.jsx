import React from 'react';

const AdminHeader = () => {

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
