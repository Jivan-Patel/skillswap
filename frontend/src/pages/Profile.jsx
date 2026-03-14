import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import SkillsOffered from '../components/profile/SkillsOffered';
import SkillsWanted from '../components/profile/SkillsWanted';
import Toast from '../components/profile/Toast';

const Profile = () => {
    const { user, login, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [toast, setToast] = useState(null);

    const config = {
        headers: {
            'user-email': user?.email
        }
    };

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:5000/api/users/me', config);
            setProfile(data);
            setError('');
        } catch (err) {
            setError('Failed to load profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchProfile();
        }
    }, [user?.email]);

    const handleUpdateProfile = async (formData) => {
        try {
            const { data } = await axios.put('http://localhost:5000/api/users/update', formData, config);
            setProfile(data);
            setIsEditing(false);

            if (data.name !== user.name) {
                login({ ...user, name: data.name });
            }
        } catch (err) {
            alert('Failed to update profile.');
        }
    };

    const handleAddSkillOffered = async (skill, level) => {
        try {
            const { data } = await axios.put('http://localhost:5000/api/users/add-skill-offered', { skill, level }, config);
            setProfile(data);
        } catch (err) {
            alert('Failed to add skill.');
        }
    };

    const handleAddSkillWanted = async (skill, level) => {
        try {
            const { data } = await axios.put('http://localhost:5000/api/users/add-skill-wanted', { skill, level }, config);
            setProfile(data);
        } catch (err) {
            alert('Failed to add skill.');
        }
    };

    const showToast = useCallback((message) => {
        setToast(message);
    }, []);

    const handleRemoveSkill = async (skillName) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/users/remove-skill/${encodeURIComponent(skillName)}`, config);
            setProfile(data);
            showToast('Skill removed successfully');
        } catch (err) {
            alert('Failed to remove skill.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center font-sans">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-400"></div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
                <p className="text-rose-400 mb-4">{error}</p>
                <Link to="/" className="text-emerald-400 hover:underline">Go back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 pb-20">
            {/* Background Effects matching Dashboard */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.15),transparent_40%)]" />
                <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[100px]" />
                <div className="absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-sky-500/20 blur-[100px]" />
            </div>

            {/* Profile Navbar wrapper */}
            <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl mb-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline font-medium text-sm">Dashboard</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3 pl-4">
                            <span className="font-[Space_Grotesk] text-lg font-bold tracking-widest text-emerald-300 md:hidden">
                                SWP
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

            <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex items-center mb-2">
                    <h1 className="font-[Space_Grotesk] text-3xl font-bold text-white">My Profile</h1>
                </div>

                {isEditing ? (
                    <ProfileForm
                        profile={profile}
                        onSave={handleUpdateProfile}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <ProfileHeader
                        profile={profile}
                        onEditClick={() => setIsEditing(true)}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <SkillsOffered
                        skills={profile.skillsOffered || []}
                        onAddSkill={handleAddSkillOffered}
                        onRemoveSkill={handleRemoveSkill}
                    />

                    <SkillsWanted
                        skills={profile.skillsWanted || []}
                        onAddSkill={handleAddSkillWanted}
                        onRemoveSkill={handleRemoveSkill}
                    />
                </div>
            </main>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Profile;
