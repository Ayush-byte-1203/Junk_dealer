import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './admin/Admin.css'; // Reusing admin styles for consistency

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });
    const [originalData, setOriginalData] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // Load profile data from localStorage on mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('user_profile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            const data = {
                fullName: profile.fullName || '',
                email: profile.email || '',
                phone: profile.phone || '',
                address: profile.address || ''
            };
            setFormData(data);
            setOriginalData(data);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = () => {
        // Validate required fields
        if (!formData.fullName.trim()) {
            alert('Please enter your full name');
            return;
        }
        if (!formData.email.trim()) {
            alert('Please enter your email address');
            return;
        }
        if (!formData.phone.trim()) {
            alert('Please enter your phone number');
            return;
        }
        if (!formData.address.trim()) {
            alert('Please enter your complete address');
            return;
        }

        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            // Save to localStorage
            localStorage.setItem('user_profile', JSON.stringify(formData));
            setOriginalData(formData);

            // Dispatch event to update other components
            window.dispatchEvent(new Event('user-profile-updated'));

            setIsSaving(false);
            alert('Profile updated successfully! ✅');
        }, 500);
    };

    const handleCancel = () => {
        // Reset form to original data
        setFormData(originalData);
        // Navigate back to dashboard
        navigate('/user-dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex-1 py-8">
                <div className="admin-container">
                    <div className="admin-header" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h1>Profile Settings</h1>
                        <p>Manage your account information and preferences</p>
                    </div>

                    <div className="settings-card">
                        {/* Personal Information */}
                        <div className="settings-section-title">
                            <div className="settings-icon">👤</div>
                            Personal Information
                        </div>
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled
                            />
                            <small style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>Email cannot be changed for security reasons</small>
                        </div>
                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Address Information */}
                        <div className="settings-section-title" style={{ marginTop: '2rem' }}>
                            <div className="settings-icon">📍</div>
                            Address Information
                        </div>
                        <div className="form-group">
                            <label>Complete Address *</label>
                            <textarea
                                name="address"
                                placeholder="Enter your complete address for pickup and delivery"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows="4"
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                className="admin-btn primary"
                                onClick={handleSaveChanges}
                                disabled={isSaving}
                            >
                                <span>💾</span> {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                className="admin-btn secondary"
                                onClick={handleCancel}
                                disabled={isSaving}
                            >
                                <span>↩️</span> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
