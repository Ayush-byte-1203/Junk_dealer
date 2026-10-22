/**
 * Translation utilities for dynamic data
 * Provides helper functions to translate data that comes from backend/CSV
 */

// Scrap type translations
export const translateScrapType = (type, language = 'en') => {
    const map = {
        paper: {
            en: "Paper & Cardboard",
            hi: "कागज और कार्डबोर्ड",
            gu: "કાગળ અને કાર્ડબોર્ડ"
        },
        plastic: {
            en: "Plastic",
            hi: "प्लास्टिक",
            gu: "પ્લાસ્ટિક"
        },
        metal: {
            en: "Metals (Iron, etc)",
            hi: "धातु (लोहा, आदि)",
            gu: "ધાતુ (લોખંડ, વગેરે)"
        },
        metals: {
            en: "Metals",
            hi: "धातु",
            gu: "ધાતુ"
        },
        ewaste: {
            en: "E-Waste",
            hi: "ई-कचरा",
            gu: "ઈ-કચરો"
        },
        electronics: {
            en: "Electronics",
            hi: "इलेक्ट्रॉनिक्स",
            gu: "ઈલેક્ટ્રોનિક્સ"
        },
        glass: {
            en: "Glass",
            hi: "कांच",
            gu: "કાચ"
        },
        brass: {
            en: "Brass",
            hi: "पीतल",
            gu: "પિત્તળ"
        },
        copper: {
            en: "Copper",
            hi: "तांबा",
            gu: "તાંબુ"
        },
        plastics: {
            en: "Plastics",
            hi: "प्लास्टिक",
            gu: "પ્લાસ્ટિક"
        }
    };

    const lowerType = type?.toLowerCase() || '';
    return map[lowerType]?.[language] || type;
};

// Status translations
export const translateStatus = (status, language = 'en') => {
    const map = {
        scheduled: {
            en: "Scheduled",
            hi: "निर्धारित",
            gu: "સુનિશ્ચિત"
        },
        pending: {
            en: "Pending",
            hi: "लंबित",
            gu: "બાકી"
        },
        completed: {
            en: "Completed",
            hi: "पूर्ण",
            gu: "પૂર્ણ"
        },
        cancelled: {
            en: "Cancelled",
            hi: "रद्द",
            gu: "રદ"
        },
        active: {
            en: "Active",
            hi: "सक्रिय",
            gu: "સક્રિય"
        },
        inactive: {
            en: "Inactive",
            hi: "निष्क्रिय",
            gu: "નિષ્ક્રિય"
        },
        rejected: {
            en: "Rejected",
            hi: "अस्वीकृत",
            gu: "નકારી"
        }
    };

    const lowerStatus = status?.toLowerCase() || '';
    return map[lowerStatus]?.[language] || status;
};

// Category translations
export const translateCategory = (category, language = 'en') => {
    const map = {
        metals: {
            en: "Metals",
            hi: "धातु",
            gu: "ધાતુ"
        },
        plastics: {
            en: "Plastics",
            hi: "प्लास्टिक",
            gu: "પ્લાસ્ટિક"
        },
        paper: {
            en: "Paper",
            hi: "कागज",
            gu: "કાગળ"
        },
        electronics: {
            en: "Electronics",
            hi: "इलेक्ट्रॉनिक्स",
            gu: "ઈલેક્ટ્રોનિક્સ"
        },
        glass: {
            en: "Glass",
            hi: "कांच",
            gu: "કાચ"
        },
        other: {
            en: "Other",
            hi: "अन्य",
            gu: "અન્ય"
        }
    };

    const lowerCategory = category?.toLowerCase() || '';
    return map[lowerCategory]?.[language] || category;
};

// Role translations
export const translateRole = (role, language = 'en') => {
    const map = {
        customer: {
            en: "Customer",
            hi: "ग्राहक",
            gu: "ગ્રાહક"
        },
        dealer: {
            en: "Dealer",
            hi: "डीलर",
            gu: "ડીલર"
        },
        admin: {
            en: "Admin",
            hi: "व्यवस्थापक",
            gu: "વ્યવસ્થાપક"
        }
    };

    const lowerRole = role?.toLowerCase() || '';
    return map[lowerRole]?.[language] || role;
};

// Unit translations
export const translateUnit = (unit, language = 'en') => {
    const map = {
        kg: {
            en: "kg",
            hi: "किलो",
            gu: "કિલો"
        },
        tons: {
            en: "tons",
            hi: "टन",
            gu: "ટન"
        },
        pieces: {
            en: "pieces",
            hi: "टुकड़े",
            gu: "ટુકડાઓ"
        }
    };

    const lowerUnit = unit?.toLowerCase() || '';
    return map[lowerUnit]?.[language] || unit;
};

// Format material label (e.g., "paper" -> "Paper & Cardboard")
export const formatMaterialLabel = (material, language = 'en') => {
    return translateScrapType(material, language);
};
