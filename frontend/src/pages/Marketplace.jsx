import { useState, useEffect, useCallback } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, LogOut, Compass, Loader2, AlertCircle, Sun, Moon } from 'lucide-react';

import SkillSearchBar from '../components/marketplace/SkillSearchBar';
import SkillFilters from '../components/marketplace/SkillFilters';
import MarketplaceSkillCard from '../components/marketplace/MarketplaceSkillCard';
import Pagination from '../components/marketplace/Pagination';

import { Helmet } from "react-helmet";

const LIMIT = 9;

const Marketplace = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [mySkills, setMySkills] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalSkills, setTotalSkills] = useState(0);

    // Fetch skills from API with server-side pagination, search, category, and level
    const fetchSkills = useCallback(async (query = '', page = 1, level = 'All', category = 'All') => {
        try {
            setLoading(true);
            setError('');

            const params = new URLSearchParams({
                page: String(page),
                limit: String(LIMIT),
            });

            if (query.trim()) {
                params.append('query', query.trim());
            }
            if (level !== 'All') {
                params.append('level', level);
            }
            if (category !== 'All') {
                params.append('category', category);
            }

            const endpoint = query.trim() ? '/api/skills/search' : '/api/skills';
            const url = `${endpoint}?${params.toString()}`;

            const { data } = await api.get(url);
            setSkills(data.skills || []);
            setCurrentPage(data.currentPage || 1);
            setTotalPages(data.totalPages || 1);
            setTotalSkills(data.totalSkills || 0);
        } catch {
            setError('Failed to load skills. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch current user's offered skills once
    useEffect(() => {
        if (!user?.email) return;
        api.get('/api/users/me')
            .then(({ data }) => setMySkills(data.skillsOffered || []))
            .catch(() => { });
    }, [user?.email]);

    useEffect(() => {
        fetchSkills(searchQuery, currentPage, selectedLevel, selectedCategory);
    }, [searchQuery, currentPage, selectedLevel, selectedCategory, fetchSkills]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    const handleLevelChange = (level) => {
        setSelectedLevel(level);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRequest = async (skillId, offeredSkill) => {
        try {
            const { data } = await api.post('/api/requests', { skillId, offeredSkill });
            toast.success('Request sent successfully!');
            return data;
        } catch (err) {
            const message = err?.response?.data?.message || 'Failed to send request.';
            toast.error(message);
            throw err;
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-emerald-500/30 pb-20`}>
            <Helmet>
                <title>Marketplace - SkillSwap</title>
                <meta name="description" content="Browse available skills on SkillSwap" />
            </Helmet>

            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.1),transparent_40%)]" />
                <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/20" />
                <div className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/20" />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 mb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="p-2 text-gray-500 hover:text-gray-950 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline font-medium text-sm">Dashboard</span>
                            </Link>
                            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-white/10">
                                <Compass size={18} className="text-emerald-600 dark:text-emerald-400" />
                                <span className="font-[Space_Grotesk] text-lg font-bold tracking-wider text-gray-900 dark:text-white">Marketplace</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <span className="font-[Space_Grotesk] text-lg font-bold tracking-widest text-emerald-600 dark:text-emerald-300 sm:hidden">
                                MKT
                            </span>
                            <div className="flex items-center gap-3 border-l border-gray-200 dark:border-white/10 pl-4">
                                <Link 
                                    to="/profile" 
                                    className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md px-2 py-1"
                                >
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="rounded-lg p-2 text-gray-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
                                    title="Log out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                        <h1 className="font-[Space_Grotesk] text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            Skill Marketplace
                        </h1>
                        <p className="text-gray-600 dark:text-slate-400">Discover skills from the community and send a request to learn.</p>
                    </div>
                    {totalSkills > 0 && (
                        <p className="text-sm text-gray-500 dark:text-slate-500 shrink-0">
                            {totalSkills} skill{totalSkills !== 1 ? 's' : ''} available
                        </p>
                    )}
                </div>

                {/* Search + Filters */}
                <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 space-y-5">
                    <SkillSearchBar onSearch={handleSearch} />
                    <SkillFilters
                        selectedLevel={selectedLevel}
                        selectedCategory={selectedCategory}
                        onLevelChange={handleLevelChange}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={32} className="animate-spin text-emerald-600 dark:text-emerald-400" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <AlertCircle size={40} className="text-rose-600 dark:text-rose-400 mb-3" />
                        <p className="text-rose-600 dark:text-rose-400 mb-2">{error}</p>
                        <button
                            onClick={() => fetchSkills(searchQuery, currentPage, selectedLevel, selectedCategory)}
                            className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                ) : skills.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-300 dark:border-white/10 rounded-2xl bg-white/30 dark:bg-slate-900/30">
                        <Compass size={40} className="text-gray-400 dark:text-slate-600 mb-3" />
                        <p className="text-gray-600 dark:text-slate-400 mb-1 font-medium text-lg">No skills found</p>
                        <p className="text-sm text-gray-500 dark:text-slate-500 text-center max-w-md">
                            {searchQuery || selectedLevel !== 'All' || selectedCategory !== 'All'
                                ? 'No skills match your search or filter criteria. Try clearing some filters or searching for something else.'
                                : 'No skills are currently listed in the marketplace. Check back soon or be the first to share one!'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((skill) => (
                                <MarketplaceSkillCard
                                    key={skill._id}
                                    skill={skill}
                                    onRequest={handleRequest}
                                    currentUserSkills={mySkills}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default Marketplace;
