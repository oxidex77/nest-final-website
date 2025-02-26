import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    LineChart,
    Line,
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
} from 'recharts';
import {
    Database,
    ShoppingCart,
    Filter,
    Map,
    Home,
    Star,
    TrendingUp,
    Zap,
    Download,
    Package,
    Clock,
    Plus,
    Minus,
    FileText,
    Users,
    Building,
    Check,
    Search,
    CreditCard,
    Lock,
    DollarSign,
    Shield,
    Grid,
    List,
    MapPin,
    ChevronDown,
    AlertCircle,
    Info,
    ArrowRight,
    X,
    HelpCircle,
    Phone,
    MessageCircle,
    ExternalLink,
    ChevronLeft,
    Mail
} from 'lucide-react';

// Import Navigation and Footer from App
import { Navigation } from './App';
import { Footer } from './App';
// Helper function to open WhatsApp
const openWhatsApp = (message) => {
    const whatsappNumber = "9322434882";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
};

// Tutorial Tooltip Component for helping older users
const TutorialTooltip = ({ isOpen, onClose, children, position = 'bottom' }) => {
    if (!isOpen) return null;

    const positions = {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
        left: "right-full mr-2",
        right: "left-full ml-2"
    };

    return (
        <div className={`absolute ${positions[position]} z-50 bg-purple-800 text-white p-3 rounded-lg shadow-lg max-w-xs`}>
            <button
                onClick={onClose}
                className="absolute top-1 right-1 text-white hover:text-purple-200"
            >
                <X className="h-4 w-4" />
            </button>
            <div className="text-sm">{children}</div>
        </div>
    );
};

// Data Sample Preview Component
const DataSamplePreview = ({ data, type }) => {
    const previewData = data.slice(0, 5);

    if (type === 'table') {
        return (
            <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
                <table className="w-full text-sm">
                    <thead className="bg-purple-50">
                        <tr>
                            {Object.keys(previewData[0]).map((key) => (
                                <th key={key} className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {previewData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {Object.values(row).map((value, i) => (
                                    <td key={i} className="px-4 py-3 whitespace-nowrap text-gray-700">
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (type === 'chart') {
        return (
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={previewData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="area" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                padding: '8px 12px'
                            }}
                        />
                        <Bar dataKey="averagePrice" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    if (type === 'radar') {
        return (
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={previewData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="area" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Demand Score" dataKey="demandScore" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                        <Radar name="Supply Score" dataKey="supplyScore" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return null;
};

// Enhanced DatasetCard Component with tooltips for elderly users
const DatasetCard = ({ dataset, onAddToCart, showTooltips = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [showViewDetailsTooltip, setShowViewDetailsTooltip] = useState(false);
    const [showAddToCartTooltip, setShowAddToCartTooltip] = useState(false);

    // Show tooltips after a delay if tooltips are enabled
    useEffect(() => {
        if (showTooltips) {
            const timer = setTimeout(() => {
                setShowViewDetailsTooltip(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showTooltips]);

    const handleAddToCart = () => {
        onAddToCart(dataset);

        // Message for WhatsApp when dataset is added to cart
        const message = `I'm interested in the "${dataset.title}" dataset (₹${dataset.price.toLocaleString()}).`;

        // Show success message
        alert(`"${dataset.title}" added to your cart! You can checkout when you're ready.`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className="relative overflow-hidden">
                {dataset.badge && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                        {dataset.badge}
                    </div>
                )}

                {dataset.location && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium z-10 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {dataset.location}
                    </div>
                )}

                <div className="w-full h-48 bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: hovering ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        {dataset.icon === 'Map' && <Map className="w-16 h-16 text-purple-600" />}
                        {dataset.icon === 'Building' && <Building className="w-16 h-16 text-purple-600" />}
                        {dataset.icon === 'Home' && <Home className="w-16 h-16 text-purple-600" />}
                        {dataset.icon === 'TrendingUp' && <TrendingUp className="w-16 h-16 text-purple-600" />}
                        {dataset.icon === 'Users' && <Users className="w-16 h-16 text-purple-600" />}
                    </motion.div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{dataset.title}</h3>
                    <div className="flex items-center bg-purple-50 px-2 py-1 rounded text-xs font-medium text-purple-700">
                        <Database className="h-3.5 w-3.5 mr-1" />
                        {dataset.records}
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{dataset.description}</p>

                <div className="flex items-center mb-3 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>Updated {dataset.lastUpdated}</span>
                </div>

                <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold text-gray-900">₹{dataset.price.toLocaleString()}</span>
                    {dataset.originalPrice && (
                        <span className="ml-2 text-sm line-through text-gray-400">₹{dataset.originalPrice.toLocaleString()}</span>
                    )}
                    {dataset.originalPrice && (
                        <span className="ml-2 text-xs text-green-600 font-medium">
                            Save {Math.round((1 - dataset.price / dataset.originalPrice) * 100)}%
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-purple-600 text-white rounded-xl py-2.5 flex items-center justify-center font-medium hover:bg-purple-700 transition-colors"
                            aria-label="Add to cart"
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                        </button>
                        <TutorialTooltip
                            isOpen={showAddToCartTooltip}
                            onClose={() => setShowAddToCartTooltip(false)}
                            position="top"
                        >
                            Click here to add this dataset to your shopping cart
                        </TutorialTooltip>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="w-full bg-gray-100 text-gray-700 rounded-xl py-2.5 flex items-center justify-center font-medium hover:bg-gray-200 transition-colors"
                            aria-label={expanded ? "Hide details" : "View details"}
                        >
                            {expanded ? 'Hide Details' : 'View Details'}
                            <ChevronDown className={`h-4 w-4 ml-1.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                        <TutorialTooltip
                            isOpen={showViewDetailsTooltip}
                            onClose={() => setShowViewDetailsTooltip(false)}
                            position="top"
                        >
                            Click here to see more details about this dataset
                        </TutorialTooltip>
                    </div>
                </div>

                <button
                    onClick={() => openWhatsApp(`I'm interested in learning more about the "${dataset.title}" dataset. Can you provide more details?`)}
                    className="w-full text-purple-600 text-sm flex items-center justify-center py-2 hover:underline mb-2"
                >
                    <MessageCircle className="h-4 w-4 mr-1.5" />
                    Ask about this dataset
                </button>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="border-t border-gray-100 pt-4 mt-2">
                                <h4 className="font-medium text-gray-900 mb-2">Dataset Fields</h4>
                                <ul className="grid grid-cols-2 gap-y-1 text-sm text-gray-600 mb-4">
                                    {dataset.fields.map(field => (
                                        <li key={field} className="flex items-center">
                                            <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                                            {field}
                                        </li>
                                    ))}
                                </ul>

                                <h4 className="font-medium text-gray-900 mb-2">Data Preview</h4>
                                {dataset.sampleData && (
                                    <DataSamplePreview data={dataset.sampleData} type={dataset.previewType || 'table'} />
                                )}

                                <div className="mt-4 flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Format: {dataset.format}</span>
                                    <div className="flex items-center text-purple-600 hover:text-purple-700 cursor-pointer">
                                        <FileText className="h-4 w-4 mr-1.5" />
                                        Full Documentation
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Enhanced Shopping Cart Sidebar with WhatsApp integration
const CartSidebar = ({ isOpen, onClose, cartItems, onRemove, total }) => {
    const handleCheckout = () => {
        // Generate order summary for WhatsApp
        const itemsList = cartItems.map(item => `- ${item.title}: ₹${item.price.toLocaleString()}`).join('\n');
        const message = `*New Data Order Request*\n\nItems in cart:\n${itemsList}\n\nTotal: ₹${total.toLocaleString()}\n\nI'd like to proceed with my purchase.`;

        // Open WhatsApp with the message
        openWhatsApp(message);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? '0%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-50 flex flex-col ${isOpen ? 'visible' : 'invisible'}`}
        >
            <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-500">
                    <ShoppingCart className="h-16 w-16 mb-4 text-gray-300" />
                    <p className="mb-2">Your cart is empty</p>
                    <p className="text-sm">Add some datasets to get started</p>
                    <button
                        onClick={onClose}
                        className="mt-6 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                        Browse Datasets
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto p-6">
                        <ul className="space-y-4">
                            {cartItems.map(item => (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex gap-4 bg-gray-50 rounded-xl p-4"
                                >
                                    <div className="flex items-center justify-center h-16 w-16 bg-white rounded-lg border border-gray-100 flex-shrink-0">
                                        {item.icon === 'Map' && <Map className="h-8 w-8 text-purple-600" />}
                                        {item.icon === 'Building' && <Building className="h-8 w-8 text-purple-600" />}
                                        {item.icon === 'Home' && <Home className="h-8 w-8 text-purple-600" />}
                                        {item.icon === 'TrendingUp' && <TrendingUp className="h-8 w-8 text-purple-600" />}
                                        {item.icon === 'Users' && <Users className="h-8 w-8 text-purple-600" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{item.records}</p>
                                        <div className="text-purple-600 font-medium">₹{item.price.toLocaleString()}</div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-6 border-t">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-medium text-gray-900">₹{total.toLocaleString()}</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center"
                            onClick={handleCheckout}
                        >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Proceed to Checkout
                        </motion.button>
                        <button
                            onClick={onClose}
                            className="w-full mt-3 py-2.5 text-gray-600 hover:text-gray-800 text-sm text-center"
                        >
                            Continue Shopping
                        </button>
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 flex items-start">
                            <Info className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500 mt-0.5" />
                            <p>You'll be connected to a representative via WhatsApp to complete your purchase securely.</p>
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
};

// Trash icon component (for cart item removal)
const Trash = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

// BackToTop button for easy navigation for older users
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-3 bg-purple-600 text-white rounded-full shadow-lg z-40 ${isVisible ? 'block' : 'hidden'
                }`}
            aria-label="Back to top"
        >
            <ChevronUp className="h-6 w-6" />
        </motion.button>
    );
};

// ChevronUp icon component
const ChevronUp = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

// WhatsApp floating button
const WhatsAppButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        openWhatsApp("Hello! I'm interested in learning more about your real estate data services. Could you please provide more information?");
    };

    return (
        <div className="fixed bottom-6 left-6 z-40">
            <div className="relative group">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                    onClick={handleClick}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    aria-label="Contact via WhatsApp"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </motion.button>

                {showTooltip && (
                    <div className="absolute left-full ml-2 bottom-0 bg-white shadow-lg rounded-lg p-2 w-48 text-sm">
                        <p className="text-gray-700">Need help? Chat with us on WhatsApp</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Help button for elderly users
const HelpButton = ({ setShowTutorial }) => {
    return (
        <button
            onClick={() => setShowTutorial(true)}
            className="fixed bottom-20 left-6 z-40 bg-blue-500 text-white p-3 rounded-full shadow-lg"
            aria-label="Get help"
        >
            <HelpCircle className="h-6 w-6" />
        </button>
    );
};

// Tutorial overlay for elderly users
const TutorialOverlay = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    aria-label="Close tutorial"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use Our Data Store</h2>

                <div className="space-y-4">
                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <h3 className="font-medium text-gray-900">Browsing Datasets</h3>
                        <p className="text-gray-600 text-sm">You can browse our datasets by category using the menu on the left. Use the search bar to find specific information.</p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <h3 className="font-medium text-gray-900">View Dataset Details</h3>
                        <p className="text-gray-600 text-sm">Click the "View Details" button on any dataset card to see more information and preview the data.</p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <h3 className="font-medium text-gray-900">Adding to Cart</h3>
                        <p className="text-gray-600 text-sm">Click "Add to Cart" button to select datasets you're interested in purchasing.</p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <h3 className="font-medium text-gray-900">Checkout Process</h3>
                        <p className="text-gray-600 text-sm">When ready, click "Checkout" in your cart. You'll be connected to our team via WhatsApp to complete your purchase securely.</p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="font-medium text-gray-900">Need Help?</h3>
                        <p className="text-gray-600 text-sm">Click the green WhatsApp button at the bottom left of the screen to chat with our support team anytime.</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

// Location-specific datasets
const locationDatasets = [
    {
        id: 101,
        title: "Andheri Real Estate Trends",
        description: "Comprehensive analysis of property market in Andheri East and West, including residential and commercial sectors with price trends, demand patterns and future projections.",
        icon: "Building",
        price: 4999,
        originalPrice: 6999,
        records: "50,000+ records",
        lastUpdated: "1 week ago",
        badge: "Popular",
        format: "CSV, Excel, PDF",
        location: "Andheri",
        fields: ["Price per Sq.Ft", "Property Type", "Locality", "Demand Score", "Supply Index", "YoY Growth"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "chart",
        sampleData: [
            { area: "Andheri East", averagePrice: 18500, occupancyRate: 92 },
            { area: "Andheri West", averagePrice: 22500, occupancyRate: 94 },
            { area: "Marol", averagePrice: 16800, occupancyRate: 88 },
            { area: "JB Nagar", averagePrice: 17200, occupancyRate: 86 },
            { area: "Saki Naka", averagePrice: 15500, occupancyRate: 82 }
        ]
    },
    {
        id: 102,
        title: "Bandra Luxury Property Insights",
        description: "Exclusive dataset covering Bandra's premium real estate market with detailed analysis of high-end properties, buyer demographics, and investment opportunities in this sought-after location.",
        icon: "Home",
        price: 7999,
        originalPrice: 9999,
        records: "25,000+ records",
        lastUpdated: "2 weeks ago",
        badge: "Premium",
        format: "CSV, Excel, Interactive Maps",
        location: "Bandra",
        fields: ["Property Value", "Amenities", "Buyer Profile", "Location Score", "Luxury Index", "Historical Appreciation"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "table",
        sampleData: [
            { "Location": "Bandra West", "Avg Price/Sq.Ft": "₹65,000", "Luxury Index": "9.2/10", "YoY Appreciation": "8.5%", "Buyer Profile": "HNI, NRI" },
            { "Location": "Pali Hill", "Avg Price/Sq.Ft": "₹75,000", "Luxury Index": "9.8/10", "YoY Appreciation": "9.2%", "Buyer Profile": "Celebrities, CXOs" },
            { "Location": "Carter Road", "Avg Price/Sq.Ft": "₹78,000", "Luxury Index": "9.7/10", "YoY Appreciation": "8.9%", "Buyer Profile": "Business Owners" },
            { "Location": "Bandstand", "Avg Price/Sq.Ft": "₹80,000", "Luxury Index": "9.9/10", "YoY Appreciation": "9.5%", "Buyer Profile": "Celebrities, NRI" },
            { "Location": "Linking Road", "Avg Price/Sq.Ft": "₹62,000", "Luxury Index": "8.8/10", "YoY Appreciation": "7.8%", "Buyer Profile": "Business Owners" }
        ]
    },
    {
        id: 103,
        title: "Goregaon Market Analysis",
        description: "Comprehensive real estate data covering Goregaon East and West, with focus on residential complexes, commercial developments and upcoming projects with price predictions.",
        icon: "Building",
        price: 3999,
        originalPrice: 5499,
        records: "42,000+ records",
        lastUpdated: "3 weeks ago",
        badge: "",
        format: "CSV, Excel, JSON",
        location: "Goregaon",
        fields: ["Property Prices", "Complex Details", "Amenities", "Construction Year", "Developer Rating", "Future Value Projection"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "chart",
        sampleData: [
            { area: "Goregaon East", averagePrice: 15800, occupancyRate: 89 },
            { area: "Goregaon West", averagePrice: 16900, occupancyRate: 91 },
            { area: "Aarey Colony", averagePrice: 14500, occupancyRate: 86 },
            { area: "NESCO", averagePrice: 16200, occupancyRate: 92 },
            { area: "Film City Road", averagePrice: 15000, occupancyRate: 88 }
        ]
    },
    {
        id: 104,
        title: "Borivali Residential Data",
        description: "Detailed insights into Borivali's residential market with focus on family-friendly housing, amenities, school proximity factors and community living aspects.",
        icon: "Home",
        price: 3499,
        originalPrice: 4999,
        records: "38,000+ records",
        lastUpdated: "2 weeks ago",
        badge: "Family Focus",
        format: "CSV, Excel",
        location: "Borivali",
        fields: ["Property Type", "Family Suitability Score", "School Distance", "Park Access", "Transport Connectivity", "Community Facilities"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "table",
        sampleData: [
            { "Area": "Borivali West", "Family Score": "8.5/10", "School Proximity": "High", "Green Spaces": "Excellent", "Transport": "Very Good" },
            { "Area": "Borivali East", "Family Score": "7.8/10", "School Proximity": "Medium", "Green Spaces": "Good", "Transport": "Excellent" },
            { "Area": "IC Colony", "Family Score": "8.7/10", "School Proximity": "Very High", "Green Spaces": "Very Good", "Transport": "Good" },
            { "Area": "LIC Colony", "Family Score": "8.2/10", "School Proximity": "High", "Green Spaces": "Good", "Transport": "Very Good" },
            { "Area": "Shimpoli", "Family Score": "7.5/10", "School Proximity": "Medium", "Green Spaces": "Moderate", "Transport": "Good" }
        ]
    },
    {
        id: 105,
        title: "Powai Investment Insights",
        description: "Strategic investment analysis of Powai real estate market, focusing on ROI potential, rental yields, and appreciation forecasts across different property types.",
        icon: "TrendingUp",
        price: 5999,
        originalPrice: 7999,
        records: "30,000+ records",
        lastUpdated: "1 week ago",
        badge: "Investment Pick",
        format: "CSV, Excel, PDF Reports",
        location: "Powai",
        fields: ["Investment Rating", "Rental Yield", "5-Year Appreciation", "Risk Factor", "Best Property Types", "Future Development Impact"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "chart",
        sampleData: [
            { area: "Hiranandani Gardens", averagePrice: 22500, roiScore: 7.8 },
            { area: "Powai Lake", averagePrice: 24000, roiScore: 8.2 },
            { area: "Central Avenue", averagePrice: 21000, roiScore: 7.5 },
            { area: "Powai Plaza", averagePrice: 20500, roiScore: 7.4 },
            { area: "IIT Bombay Area", averagePrice: 19800, roiScore: 8.5 }
        ]
    },
    {
        id: 106,
        title: "Malad Property Analytics",
        description: "Comprehensive dataset covering Malad's evolving real estate landscape, with emphasis on upcoming areas, price trends and connectivity-based valuation factors.",
        icon: "Map",
        price: 3299,
        originalPrice: 4599,
        records: "35,000+ records",
        lastUpdated: "3 weeks ago",
        badge: "",
        format: "CSV, Excel, GeoJSON",
        location: "Malad",
        fields: ["Location Details", "Connectivity Score", "Price Trends", "Development Phase", "Future Prospects", "Neighborhood Profile"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "radar",
        sampleData: [
            { area: "Malad West", demandScore: 72, supplyScore: 68, averagePrice: 16200 },
            { area: "Malad East", demandScore: 65, supplyScore: 72, averagePrice: 14800 },
            { area: "Mindspace", demandScore: 78, supplyScore: 65, averagePrice: 17500 },
            { area: "Marve Road", demandScore: 70, supplyScore: 60, averagePrice: 15900 },
            { area: "Dattapada Road", demandScore: 62, supplyScore: 75, averagePrice: 13500 }
        ]
    },
    {
        id: 107,
        title: "Juhu Luxury Market Data",
        description: "Elite property market analysis of Juhu with beachfront properties, celebrity homes, and ultra-luxury segment insights with detailed valuation metrics.",
        icon: "Home",
        price: 8999,
        originalPrice: 11999,
        records: "15,000+ records",
        lastUpdated: "2 weeks ago",
        badge: "Ultra Premium",
        format: "CSV, Excel, Premium Reports",
        location: "Juhu",
        fields: ["Beachfront Factor", "Celebrity Neighborhood", "Luxury Amenities", "Privacy Score", "Brand Value", "International Buyer Interest"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "table",
        sampleData: [
            { "Area": "Juhu Beach", "Avg Price/Sq.Ft": "₹85,000", "Elite Index": "9.8/10", "Privacy": "Excellent", "International Appeal": "Very High" },
            { "Area": "JVPD Scheme", "Avg Price/Sq.Ft": "₹78,000", "Elite Index": "9.5/10", "Privacy": "Very Good", "International Appeal": "High" },
            { "Area": "Juhu Tara", "Avg Price/Sq.Ft": "₹82,000", "Elite Index": "9.7/10", "Privacy": "Excellent", "International Appeal": "Very High" },
            { "Area": "Gulmohar Road", "Avg Price/Sq.Ft": "₹72,000", "Elite Index": "9.0/10", "Privacy": "Good", "International Appeal": "Medium" },
            { "Area": "Ruia Park", "Avg Price/Sq.Ft": "₹75,000", "Elite Index": "9.2/10", "Privacy": "Very Good", "International Appeal": "High" }
        ]
    },
    {
        id: 108,
        title: "Worli Premium Insights",
        description: "Detailed analysis of Worli's premium and ultra-premium real estate market, with focus on sea-facing properties, luxury high-rises and branded residences.",
        icon: "Building",
        price: 7499,
        originalPrice: 9999,
        records: "20,000+ records",
        lastUpdated: "1 week ago",
        badge: "Luxury",
        format: "CSV, Excel, Interactive Maps",
        location: "Worli",
        fields: ["Sea View Premium", "High-rise Factor", "Brand Association", "Amenities Rating", "Investment Potential", "HNI Buyer Data"],
        category: "location-data",
        region: "Mumbai",
        dataAge: "1-3 months",
        previewType: "chart",
        sampleData: [
            { area: "Worli Sea Face", averagePrice: 65000, occupancyRate: 85 },
            { area: "Dr. Annie Besant Road", averagePrice: 58000, occupancyRate: 82 },
            { area: "Worli Naka", averagePrice: 48000, occupancyRate: 88 },
            { area: "Worli Hill", averagePrice: 52000, occupancyRate: 80 },
            { area: "Worli Koliwada", averagePrice: 45000, occupancyRate: 75 }
        ]
    }
];

// DataStore Page Component - Main Component
const DataStore = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewType, setViewType] = useState('grid');
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [filters, setFilters] = useState({
        format: [],
        region: [],
        dataAge: []
    });
    const [showTutorial, setShowTutorial] = useState(false);
    const [showWelcomeTip, setShowWelcomeTip] = useState(true);

    // Combined datasets (original + location specific)
    const [allDatasets, setAllDatasets] = useState([]);

    // Show a welcome tooltip for first-time users (simulated)
    useEffect(() => {
        // Set all datasets by combining original and location-specific ones
        const datasets = [
            {
                id: 1,
                title: "Premium Property Market Trends",
                description: "Comprehensive dataset of luxury property market trends across major Indian metropolitan areas. Includes pricing trends, demand patterns, and property types.",
                icon: "Building",
                price: 12999,
                originalPrice: 14999,
                records: "250,000+ records",
                lastUpdated: "1 week ago",
                badge: "Premium",
                format: "CSV, Excel, JSON",
                fields: ["Location", "Property Type", "Price Range", "Sq Ft", "Demand Score", "YoY Growth"],
                category: "market-trends",
                region: "National",
                dataAge: "1-3 months",
                previewType: "radar",
                sampleData: [
                    { area: "South Mumbai", demandScore: 85, supplyScore: 45, averagePrice: 42500 },
                    { area: "Bandra", demandScore: 75, supplyScore: 50, averagePrice: 38900 },
                    { area: "Juhu", demandScore: 80, supplyScore: 40, averagePrice: 36700 },
                    { area: "Worli", demandScore: 70, supplyScore: 55, averagePrice: 39800 },
                    { area: "Powai", demandScore: 65, supplyScore: 60, averagePrice: 28500 }
                ]
            },
            {
                id: 2,
                title: "Residential Buyer Demographics",
                description: "Detailed profiles of property buyers across different regions, including income brackets, profession, age group, and property preferences.",
                icon: "Users",
                price: 9999,
                records: "150,000+ records",
                lastUpdated: "2 weeks ago",
                format: "CSV, Excel",
                fields: ["Age Group", "Income Range", "Profession", "Family Size", "Preferred Locations", "Budget Range"],
                category: "buyer-demographics",
                region: "National",
                dataAge: "3-6 months",
                previewType: "table",
                sampleData: [
                    { "Age Group": "25-35", "Income Range": "₹15L-25L", "Profession": "IT Professional", "Preferred Locations": "Whitefield", "Budget Range": "₹90L-1.2Cr" },
                    { "Age Group": "35-45", "Income Range": "₹25L-40L", "Profession": "Finance", "Preferred Locations": "Indiranagar", "Budget Range": "₹1.2Cr-1.8Cr" },
                    { "Age Group": "45-55", "Income Range": "₹40L+", "Profession": "Business Owner", "Preferred Locations": "Koramangala", "Budget Range": "₹2Cr+" },
                    { "Age Group": "35-45", "Income Range": "₹20L-30L", "Profession": "Doctor", "Preferred Locations": "Jayanagar", "Budget Range": "₹1Cr-1.5Cr" },
                    { "Age Group": "25-35", "Income Range": "₹12L-20L", "Profession": "Engineer", "Preferred Locations": "Electronic City", "Budget Range": "₹70L-1Cr" }
                ]
            },
            {
                id: 3,
                title: "Commercial Real Estate Insights",
                description: "Analytics on commercial property trends including office spaces, retail, warehousing across major business districts.",
                icon: "TrendingUp",
                price: 15999,
                originalPrice: 18999,
                records: "100,000+ records",
                lastUpdated: "1 month ago",
                badge: "Exclusive",
                format: "CSV, Excel, API Access",
                fields: ["Location", "Property Type", "Rental Rates", "Occupancy Rate", "Sq Ft Range", "Asset Class"],
                category: "commercial",
                region: "Metro Cities",
                dataAge: "1-3 months",
                previewType: "chart",
                sampleData: [
                    { area: "BKC", averagePrice: 250, occupancyRate: 92 },
                    { area: "Lower Parel", averagePrice: 200, occupancyRate: 88 },
                    { area: "Andheri East", averagePrice: 150, occupancyRate: 85 },
                    { area: "Goregaon", averagePrice: 130, occupancyRate: 82 },
                    { area: "Thane", averagePrice: 110, occupancyRate: 80 }
                ]
            },
            {
                id: 4,
                title: "Locality Heatmaps & Analysis",
                description: "Comprehensive heat maps showing property demand, pricing trends, and growth potential across neighborhoods in major cities.",
                icon: "Map",
                price: 7999,
                records: "50+ cities covered",
                lastUpdated: "2 months ago",
                format: "GeoJSON, Interactive Maps",
                fields: ["Area Name", "Demand Score", "Price Growth", "Infrastructure Score", "Livability Index", "Investment Potential"],
                category: "geo-analytics",
                region: "State-wise",
                dataAge: "3-6 months",
                previewType: "table",
                sampleData: [
                    { "Area": "Koramangala", "Demand Score": "Very High", "Price Growth": "15% YoY", "Infrastructure Score": "9/10", "Investment Potential": "High" },
                    { "Area": "Whitefield", "Demand Score": "High", "Price Growth": "12% YoY", "Infrastructure Score": "8/10", "Investment Potential": "High" },
                    { "Area": "HSR Layout", "Demand Score": "Very High", "Price Growth": "14% YoY", "Infrastructure Score": "8/10", "Investment Potential": "High" },
                    { "Area": "Jayanagar", "Demand Score": "Medium", "Price Growth": "8% YoY", "Infrastructure Score": "9/10", "Investment Potential": "Medium" },
                    { "Area": "Electronic City", "Demand Score": "Medium", "Price Growth": "10% YoY", "Infrastructure Score": "7/10", "Investment Potential": "Medium" }
                ]
            },
            {
                id: 5,
                title: "Rental Market Analytics",
                description: "Detailed insights into residential and commercial rental markets, including pricing trends, tenant profiles, and market dynamics.",
                icon: "Home",
                price: 8499,
                records: "120,000+ records",
                lastUpdated: "3 weeks ago",
                format: "CSV, Excel",
                fields: ["Area", "Property Type", "Rental Rate", "YoY Change", "Tenant Demographics", "Average Lease Duration"],
                category: "rental",
                region: "Metro Cities",
                dataAge: "1-3 months",
                previewType: "chart",
                sampleData: [
                    { area: "Andheri West", averagePrice: 55000, occupancyRate: 95 },
                    { area: "Powai", averagePrice: 48000, occupancyRate: 92 },
                    { area: "Malad", averagePrice: 35000, occupancyRate: 90 },
                    { area: "Goregaon", averagePrice: 40000, occupancyRate: 88 },
                    { area: "Borivali", averagePrice: 30000, occupancyRate: 85 }
                ]
            },
            {
                id: 6,
                title: "Investment ROI Predictors",
                description: "Advanced analytics predicting ROI potential for different property types and locations based on historical data and growth indicators.",
                icon: "TrendingUp",
                price: 18999,
                originalPrice: 21999,
                records: "200,000+ records",
                lastUpdated: "1 month ago",
                badge: "Premium",
                format: "CSV, Excel, API Access",
                fields: ["Location", "Property Type", "Initial Investment", "5-Year ROI", "Risk Factor", "Growth Indicators"],
                category: "investment",
                region: "National",
                dataAge: "1-3 months",
                previewType: "chart",
                sampleData: [
                    { area: "South Mumbai", averagePrice: 42, roiScore: 12 },
                    { area: "Pune East", averagePrice: 28, roiScore: 18 },
                    { area: "Bangalore North", averagePrice: 32, roiScore: 15 },
                    { area: "Gurgaon", averagePrice: 35, roiScore: 14 },
                    { area: "Noida", averagePrice: 25, roiScore: 16 }
                ]
            },
            ...locationDatasets
        ];

        setAllDatasets(datasets);

        // Show welcome tutorial for first-time visitors (using localStorage in a real app)
        const timer = setTimeout(() => {
            setShowWelcomeTip(false);
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    // Categories (with added location data category)
    const categories = [
        { id: 'all', name: 'All Datasets', icon: Database },
        { id: 'location-data', name: 'Location Insights', icon: MapPin },
        { id: 'market-trends', name: 'Market Trends', icon: TrendingUp },
        { id: 'buyer-demographics', name: 'Buyer Demographics', icon: Users },
        { id: 'commercial', name: 'Commercial Real Estate', icon: Building },
        { id: 'geo-analytics', name: 'Geo Analytics', icon: Map },
        { id: 'rental', name: 'Rental Market', icon: Home },
        { id: 'investment', name: 'Investment Insights', icon: TrendingUp }
    ];

    // Filter options
    const filterOptions = {
        format: ['CSV', 'Excel', 'JSON', 'API Access', 'GeoJSON', 'PDF'],
        region: ['National', 'Mumbai', 'Metro Cities', 'State-wise', 'Tier-2 Cities'],
        dataAge: ['Less than 1 month', '1-3 months', '3-6 months', '6-12 months']
    };

    // Handle add to cart
    const handleAddToCart = (dataset) => {
        // Check if already in cart
        if (!cartItems.find(item => item.id === dataset.id)) {
            setCartItems([...cartItems, dataset]);
            setIsCartOpen(true);
        }
    };

    // Handle remove from cart
    const handleRemoveFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Calculate cart total
    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

    // Filter datasets based on selection
    const filteredDatasets = allDatasets.filter(dataset => {
        // Filter by category
        if (selectedCategory !== 'all' && dataset.category !== selectedCategory) {
            return false;
        }

        // Filter by search query
        if (searchQuery && !dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !(dataset.location && dataset.location.toLowerCase().includes(searchQuery.toLowerCase()))) {
            return false;
        }

        // Filter by price range
        if (dataset.price < priceRange[0] || dataset.price > priceRange[1]) {
            return false;
        }

        // Filter by other filters
        for (const [key, values] of Object.entries(filters)) {
            if (values.length > 0) {
                // Handle region specially to include location-based filtering
                if (key === 'region' && dataset.location) {
                    // If we're filtering by a region and the dataset has a location
                    // Check if either dataset.region or dataset.location matches any selected region
                    if (!values.some(v => dataset.region === v || dataset.location === v)) {
                        return false;
                    }
                }
                // Regular filter handling
                else if (key === 'format') {
                    // Handle format as a comma-separated string
                    if (!values.some(v => dataset[key] && dataset[key].includes(v))) {
                        return false;
                    }
                }
                else if (!values.includes(dataset[key])) {
                    return false;
                }
            }
        }

        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">

            <Helmet>
                <link rel="canonical" href="https://nest-crm.com/data-store" />
                <title>NEST CRM - Data Store</title>
                <meta name="description" content="Access premium real estate data insights through NEST CRM's Data Store. Market trends, buyer analytics, and location intelligence for real estate professionals." />
            </Helmet>
            <Navigation />
            {/* Navigation with back button for mobile */}


            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center">
                <Link to="/" className="flex items-center text-purple-600">
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Back to Home
                </Link>
                <div className="ml-auto">
                    <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
                        <ShoppingCart className="h-6 w-6 text-gray-700" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <Navigation />
            </div>

            {/* Helper Components */}
            <WhatsAppButton />
            <HelpButton setShowTutorial={setShowTutorial} />
            <BackToTopButton />
            <TutorialOverlay isOpen={showTutorial} onClose={() => setShowTutorial(false)} />

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-purple-900 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
                        >
                            Real Estate Data Store
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-purple-100 max-w-prose mx-auto"
                        >
                            Premium data insights to power your real estate decisions. Access market trends, buyer analytics, and location intelligence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-3"
                        >
                            <a
                                href="#datasets"
                                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-600 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Browse Datasets
                            </a>
                            <button
                                onClick={() => document.getElementById('data-features').scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-700 bg-opacity-60 hover:bg-opacity-70 transition-colors"
                            >
                                Learn More
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Stats */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-3 overflow-hidden"
                    >
                        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100 text-center">
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Database className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900">6+ Million</div>
                            <div className="text-sm text-gray-500 mt-1">Property Records</div>
                        </div>

                        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100 text-center">
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900">200+</div>
                            <div className="text-sm text-gray-500 mt-1">Cities Covered</div>
                        </div>

                        <div className="p-6 text-center">
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900">Weekly</div>
                            <div className="text-sm text-gray-500 mt-1">Data Updates</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="data-features" className="py-12 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Use Our Data?</h2>
                        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                            Premium quality real estate intelligence to power your business decisions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
                                title: "Market Trends",
                                description: "Stay ahead with real-time market trends and pricing insights across different cities and neighborhoods."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-purple-600" />,
                                title: "Buyer Behavior",
                                description: "Understand buyer preferences, demographics, and purchasing patterns to target the right audience."
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-purple-600" />,
                                title: "Verified & Accurate",
                                description: "All our data undergoes rigorous verification and cleaning processes to ensure maximum accuracy."
                            },
                            {
                                icon: <Clock className="w-8 h-8 text-purple-600" />,
                                title: "Always Fresh",
                                description: "Weekly updates ensure you always have access to the latest market movements and trends."
                            },
                            {
                                icon: <FileText className="w-8 h-8 text-purple-600" />,
                                title: "Easy Integration",
                                description: "Multiple export formats and API access for seamless integration with your existing systems."
                            },
                            {
                                icon: <Lock className="w-8 h-8 text-purple-600" />,
                                title: "Secure & Compliant",
                                description: "All data is sourced and processed in compliance with privacy regulations and industry standards."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location Highlights Section */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Mumbai Location Insights</h2>
                        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore detailed data for popular Mumbai neighborhoods and areas
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {['Andheri', 'Bandra', 'Goregaon', 'Borivali', 'Powai', 'Malad', 'Juhu', 'Worli'].map((location, index) => {
                            const matchingDataset = locationDatasets.find(d => d.location === location);
                            return (
                                <motion.div
                                    key={location}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden transition-shadow cursor-pointer"
                                    onClick={() => {
                                        setSearchQuery(location);
                                        document.getElementById('datasets').scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <div className="h-24 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center relative">
                                        <MapPin className="h-8 w-8 text-white" />
                                        <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 text-xs text-purple-700 px-2 py-0.5 rounded-full">
                                            {matchingDataset ? `₹${Math.floor(matchingDataset.price / 1000)}k` : 'View'}
                                        </div>
                                    </div>
                                    <div className="p-3 text-center">
                                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{location}</h3>
                                        <p className="text-xs text-gray-500">Explore data →</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={() => {
                                setSelectedCategory('location-data');
                                document.getElementById('datasets').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 text-sm sm:text-base"
                        >
                            View all location data
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Datasets Section */}
            <section id="datasets" className="py-12 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Available Datasets</h2>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative cursor-pointer"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <div className="p-3 bg-purple-100 rounded-full">
                                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                            </div>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-purple-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-medium">
                                    {cartItems.length}
                                </span>
                            )}
                        </motion.div>
                    </div>

                    {/* Search & Filters */}
                    <div className="bg-white rounded-xl shadow-md p-4 mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="col-span-1 lg:col-span-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search datasets or locations..."
                                        className="pl-10 py-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm rounded-lg border-gray-300"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        aria-label="Search datasets"
                                    />
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div className="col-span-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        className="pl-10 py-3 bg-gray-50 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm rounded-lg border-gray-300"
                                        onChange={(e) => {
                                            const range = e.target.value.split('-');
                                            setPriceRange([parseInt(range[0]), parseInt(range[1])]);
                                        }}
                                        aria-label="Select price range"
                                    >
                                        <option value="0-50000">All Price Ranges</option>
                                        <option value="0-5000">Under ₹5,000</option>
                                        <option value="5000-10000">₹5,000 - ₹10,000</option>
                                        <option value="10000-15000">₹10,000 - ₹15,000</option>
                                        <option value="15000-50000">Over ₹15,000</option>
                                    </select>
                                </div>
                            </div>

                            {/* View Type Toggle */}
                            <div className="col-span-1 flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`p-2 rounded ${viewType === 'grid' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}
                                    aria-label="Grid view"
                                    aria-pressed={viewType === 'grid'}
                                >
                                    <Grid className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`p-2 rounded ${viewType === 'list' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}
                                    aria-label="List view"
                                    aria-pressed={viewType === 'list'}
                                >
                                    <List className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Categories & Filters Sidebar */}
                        <div className="w-full lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm ${selectedCategory === category.id
                                                ? 'bg-purple-100 text-purple-600 font-medium'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            aria-pressed={selectedCategory === category.id}
                                        >
                                            <category.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <span className="text-left">{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Filters */}
                            <div className="bg-white rounded-xl shadow-md p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-medium text-gray-900">Additional Filters</h3>
                                    {Object.values(filters).some(arr => arr.length > 0) && (
                                        <button
                                            onClick={() => setFilters({ format: [], region: [], dataAge: [] })}
                                            className="text-xs text-purple-600 hover:text-purple-800"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Format Filter */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Format</h4>
                                    {filterOptions.format.map(format => (
                                        <div key={format} className="flex items-center mb-1">
                                            <input
                                                type="checkbox"
                                                id={`format-${format}`}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                                                checked={filters.format.includes(format)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters({ ...filters, format: [...filters.format, format] });
                                                    } else {
                                                        setFilters({ ...filters, format: filters.format.filter(f => f !== format) });
                                                    }
                                                }}
                                                aria-label={`Filter by ${format} format`}
                                            />
                                            <label htmlFor={`format-${format}`} className="ml-2 block text-sm text-gray-700">
                                                {format}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Region Filter */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Region</h4>
                                    {filterOptions.region.map(region => (
                                        <div key={region} className="flex items-center mb-1">
                                            <input
                                                type="checkbox"
                                                id={`region-${region}`}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                                                checked={filters.region.includes(region)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters({ ...filters, region: [...filters.region, region] });
                                                    } else {
                                                        setFilters({ ...filters, region: filters.region.filter(r => r !== region) });
                                                    }
                                                }}
                                                aria-label={`Filter by ${region} region`}
                                            />
                                            <label htmlFor={`region-${region}`} className="ml-2 block text-sm text-gray-700">
                                                {region}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Data Age Filter */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Data Age</h4>
                                    {filterOptions.dataAge.map(age => (
                                        <div key={age} className="flex items-center mb-1">
                                            <input
                                                type="checkbox"
                                                id={`age-${age}`}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                                                checked={filters.dataAge.includes(age)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters({ ...filters, dataAge: [...filters.dataAge, age] });
                                                    } else {
                                                        setFilters({ ...filters, dataAge: filters.dataAge.filter(a => a !== age) });
                                                    }
                                                }}
                                                aria-label={`Filter by ${age} data age`}
                                            />
                                            <label htmlFor={`age-${age}`} className="ml-2 block text-sm text-gray-700">
                                                {age}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Help box for filters */}
                                <div className="mt-6 p-3 bg-blue-50 rounded-lg flex items-start">
                                    <HelpCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                                    <p className="text-xs text-blue-700">
                                        Need help with filtering? Click the blue help button or contact us via WhatsApp for assistance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Datasets Grid/List */}
                        <div className="flex-1">
                            {filteredDatasets.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                    <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No datasets found</h3>
                                    <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setSearchQuery('');
                                            setPriceRange([0, 50000]);
                                            setFilters({ format: [], region: [], dataAge: [] });
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4 bg-blue-50 rounded-xl p-4 flex items-start">
                                        <Info className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm text-blue-700">
                                                <span className="font-medium">Found {filteredDatasets.length} datasets</span> matching your criteria.
                                                {searchQuery && (
                                                    <span> Showing results for "<span className="font-medium">{searchQuery}</span>"</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                                        {filteredDatasets.map(dataset => (
                                            <DatasetCard
                                                key={dataset.id}
                                                dataset={dataset}
                                                onAddToCart={handleAddToCart}
                                                showTooltips={dataset.id === filteredDatasets[0].id}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trusted By Industry Leaders</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            See how real estate professionals are leveraging our data to drive their business forward
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                quote: "The property market trends dataset has been invaluable for our investment decisions. The insights have helped us identify emerging areas well before they became mainstream.",
                                author: "Rahul Sharma",
                                title: "Investment Director, Urban Spaces",
                                avatar: "RS"
                            },
                            {
                                quote: "As a broker focusing on luxury properties, having access to verified buyer demographics has transformed how we target potential clients. It's increased our conversion rate by 40%.",
                                author: "Priya Mehta",
                                title: "Senior Real Estate Consultant, LuxeHomes",
                                avatar: "PM"
                            },
                            {
                                quote: "The locality heatmaps have been a game-changer for our development planning. We've been able to identify underserved areas with high growth potential.",
                                author: "Vikram Singh",
                                title: "CEO, Horizon Developers",
                                avatar: "VS"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-md"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                                            {testimonial.avatar}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">{testimonial.author}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-700 italic">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    <Star className="h-5 w-5 text-yellow-400" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* FAQ Section */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Everything you need to know about our data services
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {[
                            {
                                question: "How often is the data updated?",
                                answer: "Most of our datasets are updated on a weekly basis, with some specialized datasets being updated daily. Each dataset includes its last update date and update frequency information."
                            },
                            {
                                question: "What formats are available for download?",
                                answer: "Our datasets are available in multiple formats including CSV, Excel, JSON, and API access depending on the specific dataset. Some geo-spatial datasets also include GeoJSON formats."
                            },
                            {
                                question: "Can I request custom datasets?",
                                answer: "Yes, we offer custom data services for specific requirements. Please contact our data team through the WhatsApp button to discuss your specific needs and get a quote."
                            },
                            {
                                question: "How is the data sourced and verified?",
                                answer: "Our data is sourced from multiple channels including direct market surveys, partner real estate platforms, government records, and verified agent reports. All data undergoes a rigorous cleaning and verification process before being made available."
                            },
                            {
                                question: "What are the license terms for using the data?",
                                answer: "Each dataset comes with a commercial license that allows you to use the data within your organization. The license does not permit reselling the raw data or making it publicly available. Detailed license terms are provided with each dataset purchase."
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="mb-4 bg-white rounded-xl shadow-md overflow-hidden"
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-6"
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 pt-0.5">
                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                <Info className="h-5 w-5 text-purple-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h4>
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">Don't see your question here?</p>
                        <button
                            onClick={() => openWhatsApp("I have a question about your real estate data services that wasn't answered in the FAQ section.")}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                        >
                            Contact Our Data Team
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-900 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Supercharge Your Real Estate Business?</h2>
                        <p className="text-lg sm:text-xl text-purple-100 mb-8">
                            Access premium datasets and gain insights that will give you a competitive edge in the market
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <motion.a
                                href="#datasets"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors"
                            >
                                Browse Data Store
                            </motion.a>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openWhatsApp("I'm interested in receiving sample data from your real estate data store to evaluate before making a purchase decision.")}
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-700 bg-opacity-60 text-white rounded-xl font-bold hover:bg-opacity-70 transition-colors"
                            >
                                Request Sample Data
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shopping Cart Sidebar */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemove={handleRemoveFromCart}
                total={cartTotal}
            />

            {/* Enhanced Footer with WhatsApp Contact */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Contact Us</h4>
                            <div className="space-y-3">
                                <button
                                    onClick={() => openWhatsApp("I'd like to speak with the sales team about your real estate data services.")}
                                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    <MessageCircle className="h-5 w-5 mr-2 text-green-500" />
                                    <span>WhatsApp: +91 93224 34882</span>
                                </button>
                                <p className="flex items-center text-gray-400">
                                    <Mail className="h-5 w-5 mr-2" />
                                    <span>nestcrmandmarketing@gmail.com</span>
                                </p>
                                <p className="flex items-center text-gray-400">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>Mumbai, India</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#datasets" className="text-gray-400 hover:text-white transition-colors">
                                        Data Store
                                    </a>
                                </li>
                                <li>
                                    <Link to="/#pricing" className="text-gray-400 hover:text-white transition-colors">
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => setShowTutorial(true)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        How to Use
                                    </button>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        API Access
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Newsletter</h4>
                            <p className="text-sm text-gray-400 mb-3">
                                Subscribe to get updates on new datasets and features
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-gray-800 text-white rounded-l-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button className="bg-purple-600 text-white rounded-r-lg px-4 hover:bg-purple-700 transition-colors">
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <span className="text-xl sm:text-2xl font-bold text-white">NEST</span>
                            <span className="text-gray-400 ml-2 text-sm">
                                © {new Date().getFullYear()} NEST CRM. All rights reserved.
                            </span>
                        </div>

                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" /><path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" /><circle cx="18.406" cy="5.594" r="1.44" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DataStore;