import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    ClipboardList,
    Truck,
    BarChart3,
    Settings,
    Users,
    Store,
    Banknote,
    FileText,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Recycle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ userRole, onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useLanguage();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
        // Dispatch event for layout to adjust
        window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { collapsed: !collapsed } }));
    };

    const NavItem = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 transition-all duration-200 group relative ${isActive
                    ? "border-l-4 border-emerald-300 bg-teal-800 text-white"
                    : "border-l-4 border-transparent text-teal-100 hover:bg-teal-800 hover:text-white"
                }`
            }
            title={collapsed ? label : ""}
        >
            <Icon className={`w-5 h-5 flex-shrink-0 ${collapsed ? "mx-auto" : ""}`} />
            {!collapsed && <span className="text-sm font-medium">{label}</span>}

            {/* Tooltip for collapsed state */}
            {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-teal-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg">
                    {label}
                </div>
            )}
        </NavLink>
    );

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-teal-700 text-white transition-all duration-300 z-50 flex flex-col shadow-xl ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-4 border-b border-teal-600 bg-teal-800/50">
                {!collapsed && (
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                            <Recycle className="w-6 h-6 text-teal-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg leading-none">Junk Dealer</span>
                            <span className="text-[10px] text-teal-300 font-medium tracking-[0.2em] uppercase mt-1">Marketplace</span>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="w-10 h-10 mx-auto rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                        <Recycle className="w-6 h-6 text-teal-300" />
                    </div>
                )}

                {!collapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 hover:bg-teal-600 rounded-md text-teal-200 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Toggle Button for Collapsed State */}
            {collapsed && (
                <button
                    onClick={toggleSidebar}
                    className="w-full py-2 flex justify-center text-teal-300 hover:text-white transition-colors bg-teal-800/30 hover:bg-teal-800/50"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 space-y-1 scrollbar-thin scrollbar-thumb-teal-900 scrollbar-track-transparent">
                {/* Dealer Navigation */}
                {userRole === 'dealer' && (
                    <>
                        <div className={`px-4 mb-2 text-xs font-semibold text-teal-300 uppercase tracking-wider opacity-80 ${collapsed ? 'text-center' : ''}`}>
                            {collapsed ? 'DLR' : 'Dealer Console'}
                        </div>
                        <NavItem to="/dashboard" icon={LayoutDashboard} label={t('sidebar.dashboard')} />
                        <NavItem to="/my-products" icon={Package} label={t('dealerPanel.myProducts')} />
                        <NavItem to="/add-product" icon={PlusCircle} label={t('dealerPanel.addProduct')} />
                        <NavItem to="/dealer-orders" icon={ClipboardList} label={t('dealerPanel.orders')} />
                        <NavItem to="/dealer-pickups" icon={Truck} label={t('dealerPanel.pickups')} />
                        <NavItem to="/dealer-analytics" icon={BarChart3} label={t('dealerPanel.analytics')} />
                        <NavItem to="/dealer-inventory" icon={Store} label={t('dealerPanel.inventory')} />
                        <NavItem to="/dealer-settings" icon={Settings} label={t('sidebar.settings')} />
                    </>
                )}

                {/* Admin Navigation */}
                {userRole === 'admin' && (
                    <>
                        <div className={`px-4 mb-2 text-xs font-semibold text-teal-300 uppercase tracking-wider opacity-80 ${collapsed ? 'text-center' : ''}`}>
                            {collapsed ? 'ADM' : 'Main Menu'}
                        </div>
                        <NavItem to="/admin-dashboard" icon={LayoutDashboard} label={t('sidebar.dashboard')} />
                        <NavItem to="/user-management" icon={Users} label={t('adminPanel.users')} />
                        <NavItem to="/dealer-management" icon={Store} label={t('adminPanel.dealers')} />
                        <NavItem to="/product-management" icon={Package} label={t('adminPanel.products')} />
                        <NavItem to="/admin-orders" icon={ClipboardList} label={t('adminPanel.orders')} />
                        <NavItem to="/admin-pickups" icon={Truck} label="Pickups" />

                        <div className={`px-4 mt-6 mb-2 text-xs font-semibold text-teal-300 uppercase tracking-wider opacity-80 ${collapsed ? 'text-center' : ''}`}>
                            {collapsed ? 'SYS' : 'System'}
                        </div>
                        <NavItem to="/rates-management" icon={Banknote} label="Rates" />
                        <NavItem to="/admin-reports" icon={FileText} label={t('adminPanel.reports')} />
                        <NavItem to="/admin-settings" icon={Settings} label={t('sidebar.settings')} />
                    </>
                )}
            </nav>

            {/* Footer */}
            <div className="p-4 bg-teal-800/50 border-t border-teal-600">
                {!collapsed && (
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-teal-900/50 mb-3">
                        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs">
                            {userRole === 'admin' ? 'AD' : 'DR'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-white">{userRole === 'admin' ? 'Ayush Admin' : 'Dealer Account'}</p>
                            <p className="text-xs text-teal-300 truncate">{userRole === 'admin' ? 'admin@junkdealer.com' : 'dealer@junkdealer.com'}</p>
                        </div>
                    </div>
                )}

                {collapsed && (
                    <div className="flex justify-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs cursor-help" title="Profile">
                            {userRole === 'admin' ? 'AD' : 'DR'}
                        </div>
                    </div>
                )}

                <button
                    onClick={onLogout}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-teal-200 hover:text-white hover:bg-teal-800 rounded-lg transition-colors ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? t('sidebar.logout') : ""}
                >
                    <LogOut className="w-4 h-4" />
                    {!collapsed && <span>{t('sidebar.logout')}</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
