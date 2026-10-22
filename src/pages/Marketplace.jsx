import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, Filter, ShoppingCart, AlertCircle } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import productImages from '../Product_img';
import { translateCategory } from '../utils/dataTranslation';


const Marketplace = () => {
    const { t, language } = useLanguage();
    const { isAuthenticated, openLoginModal } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/admin/marketplace/');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className=" pb-12">
                {/* Header Section */}
                <div className="bg-slate-900 text-white py-12 mb-8">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            {t('marketplace.title')}
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            {t('marketplace.subtitle')}
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Search and Filter Controls */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder={t('marketplace.searchPlaceholder')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="w-full md:w-64">
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger>
                                        <div className="flex items-center gap-2">
                                            <Filter className="w-4 h-4 text-slate-400" />
                                            <SelectValue placeholder="Category" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('marketplace.allCategories')}</SelectItem>
                                        <SelectItem value="Metal">{t('marketplace.categories.metal')}</SelectItem>
                                        <SelectItem value="Plastic">{t('marketplace.categories.plastic')}</SelectItem>
                                        <SelectItem value="Paper">{t('marketplace.categories.paper')}</SelectItem>
                                        <SelectItem value="Electronics">{t('marketplace.categories.electronics')}</SelectItem>
                                        <SelectItem value="Glass">{t('marketplace.categories.glass')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                            <p className="text-slate-500 font-medium">{t('marketplace.loading')}</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-slate-200">
                                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                                        {/* Product Image */}
                                        <img
                                            src={
                                                product.image?.startsWith('http')
                                                    ? product.image
                                                    : product.image?.startsWith('/')
                                                        ? `http://localhost:8000${product.image}`
                                                        : productImages[product.image] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="2"%3E%3Cpath d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"%3E%3C/path%3E%3Cline x1="3" y1="6" x2="21" y2="6"%3E%3C/line%3E%3Cpath d="M16 10a4 4 0 0 1-8 0"%3E%3C/path%3E%3C/svg%3E'
                                            }
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="2"%3E%3Cpath d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"%3E%3C/path%3E%3Cline x1="3" y1="6" x2="21" y2="6"%3E%3C/line%3E%3Cpath d="M16 10a4 4 0 0 1-8 0"%3E%3C/path%3E%3C/svg%3E';
                                            }}
                                        />
                                        <Badge className="absolute top-3 left-3 bg-white/90 text-slate-700 hover:bg-white backdrop-blur-sm shadow-sm pointer-events-none">
                                            {translateCategory(product.category, language)}
                                        </Badge>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1" title={product.name}>
                                            {product.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-4">
                                        <p className="text-slate-500 text-sm line-clamp-2 h-10 mb-4">
                                            {product.description}
                                        </p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-emerald-600">₹{product.price_per_kg}</span>
                                            <span className="text-slate-400 text-sm">/ kg</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                                            onClick={() => {
                                                if (!isAuthenticated) {
                                                    openLoginModal();
                                                    return;
                                                }
                                                // Add to Cart Logic
                                                const currentCart = JSON.parse(localStorage.getItem('cart_items') || '[]');
                                                const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

                                                if (existingItemIndex > -1) {
                                                    currentCart[existingItemIndex].quantity += 1;
                                                } else {
                                                    currentCart.push({
                                                        id: product.id,
                                                        name: product.name,
                                                        price: product.price_per_kg,
                                                        category: product.category,
                                                        image: product.image,
                                                        quantity: 1
                                                    });
                                                }

                                                localStorage.setItem('cart_items', JSON.stringify(currentCart));
                                                window.dispatchEvent(new CustomEvent('cart-updated'));
                                                alert(`${product.name} added to cart! 🛒`);
                                            }}
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            {t('marketplace.addToCart')}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                We couldn't find any products matching your search. Try checking for spelling errors or using different keywords.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => {
                                    setSearchTerm('');
                                    setCategoryFilter('all');
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Marketplace;
