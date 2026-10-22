"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext" // Import useAuth
import { useLanguage } from "../context/LanguageContext"
import LanguageSelector from "./LanguageSelector"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Recycle, LayoutDashboard, Package, ClipboardList, User, LogOut, Settings, Menu, ChevronDown, Bell, Lock, ShoppingCart } from "lucide-react"

export function Navbar({ showLinks = true, showLogo = true, showMobileMenu = true }) {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout, isAuthenticated, openLoginModal } = useAuth(); // Use auth context
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo - Left */}
                    {showLogo && (
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg">
                                    <Recycle className="w-6 h-6 text-white" />
                                </div>
                                <div className="block">
                                    <span className="font-bold text-lg text-gray-900">
                                        Junk Dealer
                                    </span>
                                    <span className="block text-[10px] uppercase tracking-widest text-emerald-600">
                                        Marketplace
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Desktop Navigation - Center */}
                    <div className="flex-1 flex justify-center">
                        {showLinks && (
                            <div className="flex items-center gap-1">
                                <Link
                                    to="/about"
                                    className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 "
                                >
                                    {t('nav.about')}
                                </Link>
                                <Link
                                    to="/team"
                                    className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 "
                                >
                                    Team
                                </Link>
                                <Link
                                    to="/rates"
                                    className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    {t('nav.rates')}
                                </Link>
                                {user?.role !== 'admin' && user?.role !== 'dealer' && (
                                    <Link
                                        to="/marketplace"
                                        className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    >
                                        {t('nav.marketplace')}
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2">
                        <LanguageSelector />

                        {isAuthenticated ? (
                            <>
                                {/* Cart Icon - Customers Only */}
                                {user?.role === 'customer' && (
                                    <Link to="/cart">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            {/* We can add a badge here later if needed */}
                                        </Button>
                                    </Link>
                                )}

                                {/* Notifications */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
                                </Button>

                                {/* User Menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2 px-2 hover:bg-gray-100"
                                        >
                                            <Avatar className="w-8 h-8 border-2 border-emerald-400">
                                                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-sm font-semibold">
                                                    {user?.name?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="hidden md:block text-sm font-medium text-gray-900">
                                                {user?.name || 'User'}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-3 py-2">
                                            <p className="text-sm font-medium">{user?.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {user?.role} Account
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => {
                                            if (user.role === 'admin') navigate('/admin-dashboard');
                                            else if (user.role === 'dealer') navigate('/dashboard');
                                            else navigate('/user-dashboard');
                                        }}>
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </DropdownMenuItem>

                                        {/* Customer Links */}
                                        {user?.role === 'customer' && (
                                            <>
                                                <DropdownMenuItem onClick={() => navigate('/orders')}>
                                                    <Package className="w-4 h-4 mr-2" />
                                                    My Orders
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate('/profile')}>
                                                    <User className="w-4 h-4 mr-2" />
                                                    My Profile
                                                </DropdownMenuItem>
                                            </>
                                        )}

                                        {/* Dealer Links */}
                                        {user?.role === 'dealer' && (
                                            <>
                                                <DropdownMenuItem onClick={() => navigate('/dealer-orders')}>
                                                    <ClipboardList className="w-4 h-4 mr-2" />
                                                    Dealer Orders
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate('/dealer-profile')}>
                                                    <User className="w-4 h-4 mr-2" />
                                                    My Profile
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuItem>
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <Button
                                onClick={openLoginModal}
                                className="bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-md shadow-teal-200"
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                Sign In
                            </Button>
                        )}

                        {/* Mobile Menu */}
                        {showMobileMenu && (
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden text-stone-600 hover:bg-stone-100"
                                    >
                                        <Menu className="w-6 h-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-72">
                                    <div className="flex flex-col gap-1 mt-8">
                                        <Link
                                            to="/"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                                        >
                                            <LayoutDashboard className="w-5 h-5 text-emerald-600" />
                                            Home
                                        </Link>
                                        {!isAuthenticated && (
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    openLoginModal();
                                                }}
                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors text-left"
                                            >
                                                <Lock className="w-5 h-5 text-emerald-600" />
                                                Sign In
                                            </button>
                                        )}
                                        {isAuthenticated && (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        handleLogout();
                                                    }}
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors text-red-600 text-left"
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                    Sign Out
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    )
}