import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const LanguageSelector = () => {
    const { language, changeLanguage } = useLanguage();

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'gu', label: 'ગુજરાતી' }
    ];

    const currentLabel = languages.find(l => l.code === language)?.label || 'English';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-emerald-600">
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline-block">{currentLabel}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`cursor-pointer ${language === lang.code ? 'bg-emerald-50 text-emerald-700 font-medium' : ''}`}
                    >
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
