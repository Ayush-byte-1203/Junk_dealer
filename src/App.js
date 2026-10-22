import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Rates from './pages/ScrapRates';
import Tips from './pages/Tips';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Pickups from './pages/Pickups';
import Profile from './pages/Profile';
import FindDealers from './pages/FindDealers';
import SchedulePickup from './pages/SchedulePickup';
import Checkout from './pages/Checkout';
import { Privacy, Terms, Refund } from './pages/Legal';
import Contact from './pages/Contact';
import ScrapCalculator from './pages/ScrapCalculator';

import DealerDashboard from './pages/dealer/Dashboard';
import { MyProducts, AddProduct, DealerOrders, DealerPickups, DealerAnalytics, DealerInventory, DealerSettings } from './pages/dealer/DealerPages';
import AdminDashboard from './pages/admin/Dashboard';
import { UserManagement, DealerManagement, ProductManagement, AdminOrders, AdminPickups, RatesManagement, AdminReports, AdminSettings, Transactions } from './pages/admin/AdminPages';
import UserDashboard from './pages/user/UserDashboard';
import { MyPickups, MyEarnings, RateCard, UserSettings } from './pages/user/UserPages';

import HelloHome from './components/hellohome';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, openLoginModal } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            openLoginModal();
        }
    }, [isAuthenticated, openLoginModal]);

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === 'admin') return <Navigate to="/admin-dashboard" replace />;
        if (user.role === 'dealer') return <Navigate to="/dashboard" replace />;
        if (user.role === 'customer') return <Navigate to="/user-dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};

// Layout Wrapper
const LayoutWrapper = ({ LayoutComponent }) => {
    const { user, logout } = useAuth();
    return <LayoutComponent userRole={user?.role} onLogout={logout} />;
};

// Inner App Component that uses context
const AppContent = () => {
    const { user } = useAuth();

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Login Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminLogin />} />

                {/* Public Routes with Admin Redirect */}
                <Route path="/" element={
                    user?.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> : <HelloHome />
                } />


                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/rates" element={<Rates />} />
                <Route path="/calculator" element={<ScrapCalculator />} />
                <Route path="/tips" element={<Tips />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/find-dealers" element={<FindDealers />} />
                <Route path="/schedule-pickup" element={<SchedulePickup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />

                {/* Footer Links */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/contact" element={<Contact />} />

                {/* Dealer Dashboard Routes */}
                <Route element={
                    <ProtectedRoute allowedRoles={['dealer']}>
                        <LayoutWrapper LayoutComponent={DashboardLayout} />
                    </ProtectedRoute>
                }>
                    <Route path="/dashboard" element={<DealerDashboard />} />
                    <Route path="/my-products" element={<MyProducts />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/dealer-orders" element={<DealerOrders />} />
                    <Route path="/dealer-pickups" element={<DealerPickups />} />
                    <Route path="/dealer-analytics" element={<DealerAnalytics />} />
                    <Route path="/dealer-inventory" element={<DealerInventory />} />
                    <Route path="/dealer-settings" element={<DealerSettings />} />
                    <Route path="/dealer-profile" element={<Profile />} />
                </Route>

                {/* Admin Dashboard Routes */}
                <Route element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <LayoutWrapper LayoutComponent={AdminLayout} />
                    </ProtectedRoute>
                }>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/dealer-management" element={<DealerManagement />} />
                    <Route path="/product-management" element={<ProductManagement />} />
                    <Route path="/admin-orders" element={<AdminOrders />} />
                    <Route path="/admin-pickups" element={<AdminPickups />} />
                    <Route path="/rates-management" element={<RatesManagement />} />
                    <Route path="/admin-reports" element={<AdminReports />} />
                    <Route path="/admin-settings" element={<AdminSettings />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Route>

                {/* User Dashboard Routes */}
                <Route element={
                    <ProtectedRoute allowedRoles={['customer']}>
                        <LayoutWrapper LayoutComponent={UserLayout} />
                    </ProtectedRoute>
                }>
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/my-pickups" element={<MyPickups />} />
                    <Route path="/my-earnings" element={<MyEarnings />} />
                    <Route path="/rate-card" element={<RateCard />} />
                    <Route path="/user-settings" element={<UserSettings />} />
                    <Route path="/pickups" element={<Pickups />} />
                </Route>
            </Routes>
            <LoginModal />
        </Router>
    );
};

function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;
