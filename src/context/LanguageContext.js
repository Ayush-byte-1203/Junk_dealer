import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    // Load saved language from local storage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('appLanguage');
        if (savedLanguage && translations[savedLanguage]) {
            setLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (langCode) => {
        if (translations[langCode]) {
            setLanguage(langCode);
            localStorage.setItem('appLanguage', langCode);
        }
    };

    // Translation function
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key; // Return key if translation not found
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
