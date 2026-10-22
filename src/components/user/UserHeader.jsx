import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { LayoutDashboard, Package, User, Settings, LogOut, ChevronDown } from 'lucide-react';

const UserHeader = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [userName, setUserName] = React.useState('John Doe');
    const [userInitials, setUserInitials] = React.useState('JD');

    const updateProfile = () => {
        const saved = localStorage.getItem('user_profile');
        if (saved) {
            const profile = JSON.parse(saved);
            setUserName(profile.fullName || 'John Doe');

            // Generate initials
            const fullName = profile.fullName || 'John Doe';
            const nameParts = fullName.trim().split(' ');

            let initials = 'JD';
            if (nameParts.length >= 2 && nameParts[0] && nameParts[1]) {
                initials = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
            } else if (nameParts.length === 1 && nameParts[0]) {
                initials = nameParts[0][0].toUpperCase();
            }
            setUserInitials(initials);
        }
    };

    React.useEffect(() => {
        updateProfile();

        // Listen for updates from Settings page
        window.addEventListener('user-profile-updated', updateProfile);
        // Listen for updates from other tabs
        window.addEventListener('storage', updateProfile);

        return () => {
            window.removeEventListener('user-profile-updated', updateProfile);
            window.removeEventListener('storage', updateProfile);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Left side - can add breadcrumbs or page title here if needed */}
            <div className="flex items-center gap-4">
                {/* Optional: Add breadcrumbs or search here */}
            </div>

            {/* Right side - User Menu Only */}
            <div className="flex items-center gap-3">
                {/* User Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-3 hover:bg-slate-100 rounded-full"
                        >
                            <Avatar className="w-9 h-9 border-2 border-emerald-400">
                                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-sm font-semibold">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <span className="hidden md:block text-sm font-medium text-slate-900">
                                {userName}
                            </span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-3 py-2">
                            <p className="text-sm font-medium text-slate-900">{userName}</p>
                            <p className="text-xs text-slate-500 capitalize">
                                Customer Account
                            </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/user-dashboard')}>
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/orders')}>
                            <Package className="w-4 h-4 mr-2" />
                            My Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                            <User className="w-4 h-4 mr-2" />
                            My Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/settings')}>
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
            </div>
        </header>
    );
};

export default UserHeader;
