import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        // Check local storage for persisted login
        const storedUser = localStorage.getItem('junkdealer_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await response.json();

            if (response.ok && data.success) {
                const userData = data.user;
                setUser(userData);
                localStorage.setItem('junkdealer_user', JSON.stringify(userData));
                setIsLoginModalOpen(false);
                return { success: true, role: userData.role };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: `Network error: ${error.message}. Is the backend running on port 8000?` };
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Optionally auto-login or just return success
                return { success: true, role: userData.role };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error. Is the backend running?' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('junkdealer_user');
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
