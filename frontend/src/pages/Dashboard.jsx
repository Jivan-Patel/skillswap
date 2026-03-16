import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    LogOut, User, Sun, Moon, Plus, Compass, Settings,
    BookOpen, Target, Send, Inbox, Edit2, Trash2
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('incoming');

    // Simple mock data for presentation
    const stats = [
        { label: 'Skills Offered', value: '3', icon: BookOpen, color: 'text-emerald-400' },
        { label: 'Skills Wanted', value: '2', icon: Target, color: 'text-sky-400' },
        { label: 'Requests Sent', value: '5', icon: Send, color: 'text-purple-400' },
        { label: 'Requests Received', value: '8', icon: Inbox, color: 'text-rose-400' },
    ];

    const skillsOffered = [
        { id: 1, name: 'React.js', level: 'Advanced' },
        { id: 2, name: 'UI/UX Design', level: 'Intermediate' },
        { id: 3, name: 'Node.js', level: 'Beginner' },
    ];

    const skillsWanted = [
        { id: 1, name: 'Python Data Science', level: 'Beginner' },
        { id: 2, name: 'AWS Cloud', level: 'Intermediate' },
    ];

    const incomingRequests = [
        { id: 1, name: 'Alex Johnson', skill: 'React.js', status: 'Pending' },
        { id: 2, name: 'Maria Garcia', skill: 'UI/UX Design', status: 'Accepted' },
    ];

    const outgoingRequests = [
        { id: 1, name: 'David Smith', skill: 'Python Data Science', status: 'Pending' },
    ];


    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-gray-50'}`}>
            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.1),transparent_40%)]" />
                <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/20" />
                <div className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/20" />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-[Space_Grotesk] text-xl font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                                SKILLSWAP
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</span>
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400 text-white shadow-sm">
                                    <User size={18} />
                                </div>
                                <button
                                    onClick={logout}
                                    className="ml-2 rounded-lg p-2 text-gray-500 hover:bg-rose-50 hover:text-rose-600 dark:text-gray-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-colors"
                                    title="Log out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header & Quick Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="font-[Space_Grotesk] text-4xl font-bold text-gray-900 dark:text-white">
                            Welcome back, {user?.name?.split(' ')[0] || 'Jivan'} <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Here's what's happening with your skills today.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:from-emerald-600 hover:to-emerald-700 dark:from-emerald-400 dark:to-cyan-400 dark:text-slate-950 dark:hover:brightness-110">
                            <Plus size={18} />
                            Add Skill
                        </button>
                        <Link to="/marketplace" className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-800/80">
                            <Compass size={18} />
                            Browse Skills
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-800/80">
                            <Settings size={18} />
                            Profile
                        </Link>
                        <Link to="/requests" className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-800/80">
                            <Inbox size={18} />
                            Requests
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                </div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-800/50 border border-gray-100 dark:border-white/5`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Grid Area */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Left Column: Skills */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Skills Offered */}
                        <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills Offered</h2>
                                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">View all</button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {skillsOffered.map(skill => (
                                    <div key={skill.id} className="group relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-emerald-200 dark:border-white/5 dark:bg-slate-800/50 dark:hover:border-emerald-500/50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                                                <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                                                    {skill.level}
                                                </span>
                                            </div>
                                            <div className="flex opacity-0 transition group-hover:opacity-100 gap-1">
                                                <button className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Wanted */}
                        <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills Wanted</h2>
                                <button className="text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">View all</button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {skillsWanted.map(skill => (
                                    <div key={skill.id} className="relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-slate-800/50">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                                        <span className="mt-2 inline-flex items-center rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30">
                                            Desired: {skill.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Requests */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-xl h-full dark:border-white/10 dark:bg-slate-900/60 flex flex-col">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Requests</h2>

                            {/* Tabs */}
                            <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-slate-800/80 mb-6">
                                <button
                                    onClick={() => setActiveTab('incoming')}
                                    className={`w-full rounded-lg py-2 text-sm font-medium leading-5 transition-colors ${activeTab === 'incoming'
                                        ? 'bg-white text-emerald-600 shadow dark:bg-slate-700 dark:text-emerald-400'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                        }`}
                                >
                                    Incoming
                                </button>
                                <button
                                    onClick={() => setActiveTab('outgoing')}
                                    className={`w-full rounded-lg py-2 text-sm font-medium leading-5 transition-colors ${activeTab === 'outgoing'
                                        ? 'bg-white text-sky-600 shadow dark:bg-slate-700 dark:text-sky-400'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                        }`}
                                >
                                    Outgoing
                                </button>
                            </div>

                            {/* Request List */}
                            <div className="flex-1 space-y-4">
                                {activeTab === 'incoming' ? (
                                    incomingRequests.length > 0 ? incomingRequests.map(req => (
                                        <div key={req.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white dark:border-white/5 dark:bg-slate-800/50">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white text-sm">{req.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">wants to learn <span className="text-emerald-600 dark:text-emerald-400">{req.skill}</span></p>
                                            </div>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${req.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                    )) : <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No incoming requests.</p>
                                ) : (
                                    outgoingRequests.length > 0 ? outgoingRequests.map(req => (
                                        <div key={req.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white dark:border-white/5 dark:bg-slate-800/50">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white text-sm">{req.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">can teach <span className="text-sky-600 dark:text-sky-400">{req.skill}</span></p>
                                            </div>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${req.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                    )) : <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No outgoing requests.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom Animation for Wave */}
            <style>{`
                @keyframes wave {
                    0% { transform: rotate(0.0deg) }
                    10% { transform: rotate(14.0deg) }
                    20% { transform: rotate(-8.0deg) }
                    30% { transform: rotate(14.0deg) }
                    40% { transform: rotate(-4.0deg) }
                    50% { transform: rotate(10.0deg) }
                    60% { transform: rotate(0.0deg) }
                    100% { transform: rotate(0.0deg) }
                }
                .animate-wave {
                    animation: wave 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
