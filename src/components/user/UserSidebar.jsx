import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Truck,
    Wallet,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Recycle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const UserSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { t } = useLanguage();
    const { logout } = useAuth();

    const [userProfile, setUserProfile] = useState({ name: 'John Doe', initials: 'JD' });

    const updateProfile = () => {
        const saved = localStorage.getItem('user_profile');
        if (saved) {
            const profile = JSON.parse(saved);
            const fullName = profile.fullName || 'John Doe';


            // Generate initials
            const nameParts = fullName.trim().split(' ');
            let initials = 'JD';
            if (nameParts.length >= 2 && nameParts[0] && nameParts[1]) {
                initials = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
            } else if (nameParts.length === 1 && nameParts[0]) {
                initials = nameParts[0][0].toUpperCase();
            }

            setUserProfile({ name: fullName, initials });
        }
    };

    React.useEffect(() => {
        updateProfile();
        // Listen for updates
        window.addEventListener('user-profile-updated', updateProfile);
        window.addEventListener('storage', updateProfile);

        return () => {
            window.removeEventListener('user-profile-updated', updateProfile);
            window.removeEventListener('storage', updateProfile);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        // Dispatch custom event for layout adjustment
        window.dispatchEvent(new CustomEvent('user-sidebar-toggle', { detail: { isOpen: !isOpen } }));
    };

    const navItems = [
        { path: '/user-dashboard', icon: LayoutDashboard, label: t('sidebar.dashboard') },
        { path: '/pickups', icon: Truck, label: t('userPanel.myPickups') },
        { path: '/my-earnings', icon: Wallet, label: t('userPanel.myEarnings') },
        { path: '/rate-card', icon: BarChart3, label: t('userPanel.rateCard') },
        { path: '/user-settings', icon: Settings, label: t('sidebar.settings') },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-lg shadow-lg"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 h-screen bg-teal-700 text-white transition-all duration-300 z-40 shadow-xl
                ${isOpen ? 'w-64' : 'w-20'}
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Header */}
                <div className={`h-20 flex items-center border-b border-teal-600 bg-teal-800/50 ${isOpen ? 'px-6' : 'justify-center'}`}>
                    {isOpen ? (
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:bg-white/20 transition-colors">
                                <Recycle className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="font-bold text-lg leading-tight text-white pt-5">JunkDealer<br /><span className="text-[10px] text-teal-200 font-medium tracking-[0.2em] uppercase pb-5">{t('sidebar.subtitle')}</span></h1>
                            </div>
                        </NavLink>
                    ) : (
                        <NavLink to="/" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                            <Recycle className="text-white w-6 h-6" />
                        </NavLink>
                    )}
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                ${isActive
                                    ? 'bg-teal-800 text-white border-l-4 border-emerald-300'
                                    : 'text-teal-100 hover:bg-teal-800 hover:text-white border-l-4 border-transparent'
                                }
                            `}
                        >
                            <item.icon size={20} className="min-w-[20px]" />
                            {isOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer User Profile */}
                <div className="absolute bottom-0 w-full p-4 border-t border-teal-600 bg-teal-800/50">
                    <div className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white border border-teal-400 font-bold text-sm">
                            {userProfile.initials}
                        </div>
                        {isOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{userProfile.name}</p>
                                <p className="text-xs text-teal-300 truncate">{t('sidebar.userAccount')}</p>
                            </div>
                        )}
                        {isOpen && (
                            <button
                                onClick={logout}
                                className="text-teal-300 hover:text-white transition-colors"
                                title={t('auth.logout')}
                            >
                                <LogOut size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default UserSidebar;
