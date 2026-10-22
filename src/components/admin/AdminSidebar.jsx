import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Store,
    Package,
    ClipboardList,
    Truck,
    Banknote,
    FileText,
    Settings,
    LogOut,
    User,
    Recycle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../LanguageSelector';

const AdminSidebar = ({ onLogout }) => {
    const { t } = useLanguage();

    const NavItem = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 transition-all duration-200 group border-l-4 ${isActive
                    ? "border-emerald-300 bg-teal-800 text-white"
                    : "border-transparent text-teal-100 hover:bg-teal-800 hover:text-white"
                }`
            }
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{label}</span>
        </NavLink>
    );

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-teal-700 text-white flex flex-col shadow-xl z-50">
            {/* Header */}
            <div className="h-20 flex items-center px-6 border-b border-teal-600 bg-teal-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                        <Recycle className="w-6 h-6 text-teal-300" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none">Junk Dealer</h1>
                        <span className="text-[10px] text-teal-300 font-medium tracking-[0.2em] uppercase">{t('sidebar.adminSubtitle')}</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 space-y-1 scrollbar-thin scrollbar-thumb-teal-900 scrollbar-track-transparent">
                <div className="px-6 mb-2 text-xs font-semibold text-teal-300 uppercase tracking-wider opacity-80">
                    {t('sidebar.dashboard')}
                </div>
                <NavItem to="/admin-dashboard" icon={LayoutDashboard} label={t('sidebar.dashboard')} />
                <NavItem to="/user-management" icon={Users} label={t('adminPanel.users')} />
                <NavItem to="/dealer-management" icon={Store} label={t('adminPanel.dealers')} />
                <NavItem to="/product-management" icon={Package} label={t('adminPanel.products')} />
                <NavItem to="/admin-orders" icon={ClipboardList} label={t('adminPanel.orders')} />
                <NavItem to="/admin-pickups" icon={Truck} label={t('dealerPanel.pickups')} />

                <div className="px-6 mt-6 mb-2 text-xs font-semibold text-teal-300 uppercase tracking-wider opacity-80">
                    {t('sidebar.system')}
                </div>
                <NavItem to="/rates-management" icon={Banknote} label={t('rates.title')} />
                <NavItem to="/admin-reports" icon={FileText} label={t('adminPanel.reports')} />
                <NavItem to="/admin-settings" icon={Settings} label={t('sidebar.settings')} />
            </nav>

            {/* Footer */}
            <div className="p-4 bg-teal-800/50 border-t border-teal-600">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-900/50 mb-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Ayush Admin</p>
                        <p className="text-xs text-teal-300 truncate">admin@junkdealer.com</p>
                    </div>
                </div>

                {/* Language Selector */}
                <div className="mb-2">
                    <LanguageSelector />
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-teal-200 hover:text-white hover:bg-teal-800 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>{t('sidebar.logout')}</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
