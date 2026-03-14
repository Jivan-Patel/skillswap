import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, LogOut, Compass, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react';

import SkillSearchBar from '../components/marketplace/SkillSearchBar';
import SkillFilters from '../components/marketplace/SkillFilters';
import MarketplaceSkillCard from '../components/marketplace/MarketplaceSkillCard';

const Marketplace = () => {
    const { user, logout } = useAuth();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [toast, setToast] = useState(null);

    const config = {
        headers: {
            'user-email': user?.email
        }
    };

    // Fetch skills from API
    const fetchSkills = useCallback(async (query = '') => {
        try {
            setLoading(true);
            setError('');
            const url = query
                ? `http://localhost:5000/api/skills/search?query=${encodeURIComponent(query)}`
                : 'http://localhost:5000/api/skills';
            const { data } = await axios.get(url, config);
            setSkills(data);
        } catch (err) {
            setError('Failed to load skills. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        fetchSkills(searchQuery);
    }, [searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleRequest = async (skillId) => {
        const { data } = await axios.post(
            'http://localhost:5000/api/requests',
            { skillId },
            config
        );
        showToast('Request sent successfully!', 'success');
        return data;
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Client-side filtering (level & category)
    const filteredSkills = skills.filter((skill) => {
        if (selectedLevel !== 'All' && skill.level !== selectedLevel) return false;
        if (selectedCategory !== 'All' && skill.category !== selectedCategory) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 pb-20">
            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.15),transparent_40%)]" />
                <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[100px]" />
                <div className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-sky-500/20 blur-[100px]" />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl mb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline font-medium text-sm">Dashboard</span>
                            </Link>
                            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
                                <Compass size={18} className="text-emerald-400" />
                                <span className="font-[Space_Grotesk] text-lg font-bold tracking-wider text-white">Marketplace</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-[Space_Grotesk] text-lg font-bold tracking-widest text-emerald-300 sm:hidden">
                                MKT
                            </span>
                            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                                <span className="text-sm font-semibold text-white">{user?.name || 'User'}</span>
                                <button
                                    onClick={logout}
                                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
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
                <div>
                    <h1 className="font-[Space_Grotesk] text-3xl font-bold text-white mb-2">
                        Skill Marketplace
                    </h1>
                    <p className="text-slate-400">Discover skills from the community and send a request to learn.</p>
                </div>

                {/* Search + Filters */}
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl space-y-5">
                    <SkillSearchBar onSearch={handleSearch} />
                    <SkillFilters
                        selectedLevel={selectedLevel}
                        selectedCategory={selectedCategory}
                        onLevelChange={setSelectedLevel}
                        onCategoryChange={setSelectedCategory}
                    />
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={32} className="animate-spin text-emerald-400" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <AlertCircle size={40} className="text-rose-400 mb-3" />
                        <p className="text-rose-400 mb-2">{error}</p>
                        <button
                            onClick={() => fetchSkills(searchQuery)}
                            className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredSkills.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-slate-900/30">
                        <Compass size={40} className="text-slate-600 mb-3" />
                        <p className="text-slate-400 mb-1">No skills found</p>
                        <p className="text-sm text-slate-500">
                            {searchQuery ? 'Try a different search term or clear filters.' : 'No skills have been shared yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSkills.map((skill) => (
                            <MarketplaceSkillCard
                                key={skill._id}
                                skill={skill}
                                onRequest={handleRequest}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-slate-900/95 px-5 py-3.5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl animate-slide-up">
                    <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{toast.message}</span>
                    <button
                        onClick={() => setToast(null)}
                        className="ml-2 rounded-full p-1 text-slate-500 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Inline animation keyframes */}
            <style>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Marketplace;
