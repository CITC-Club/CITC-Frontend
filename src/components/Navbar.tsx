import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleHomeClick = () => {
        window.scrollTo(0, 0);
    };

    const navLinks = [
        { name: 'Home', href: '/', type: 'route' },
        { name: 'About', href: '/#about', type: 'anchor' },
        { name: 'Events', href: '/events', type: 'route' },
        { name: 'Team', href: '/team', type: 'route' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div
                        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${isScrolled
                            ? 'bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg px-6 py-3'
                            : 'bg-transparent border border-transparent px-0 py-2'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-3 group" onClick={handleHomeClick}>
                                <div className={`relative flex items-center justify-center rounded-xl group-hover:scale-105 transition-all duration-300 ${isScrolled ? 'w-12 h-12' : 'w-24 h-24'}`}>
                                    <img src="/CITCLOGO.png" alt="CITC Logo" className={`object-contain transition-all duration-300 ${isScrolled ? 'w-full h-full' : 'w-full h-full'}`} />
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center bg-black/5 dark:bg-white/[0.03] rounded-full px-2 py-1 border border-black/5 dark:border-white/[0.05]">
                                {navLinks.map((link) => (
                                    link.type === 'route' ? (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={link.name === 'Home' ? handleHomeClick : undefined}
                                            className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05] rounded-full transition-all duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05] rounded-full transition-all duration-300"
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}
                            </div>

                            {/* Action Button & Theme Toggle */}
                            <div className="hidden md:flex items-center gap-4">
                                <ThemeToggle />
                                <a
                                    href="https://forms.gle/ye4PRPt5VpGiNAeF6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full overflow-hidden hover:bg-slate-800 dark:hover:bg-cyan-50 transition-colors"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                    <span className="relative flex items-center gap-2">
                                        Join Club <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex md:hidden items-center gap-4">
                                <ThemeToggle />
                                <button
                                    className="text-slate-900 dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X /> : <Menu />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
                    {navLinks.map((link) => (
                        link.type === 'route' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-2xl font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    if (link.name === 'Home') {
                                        handleHomeClick();
                                    }
                                }}
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        )
                    ))}
                    <a
                        href="https://forms.gle/ye4PRPt5VpGiNAeF6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 w-full max-w-xs text-center"
                    >
                        Join Club Now
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
