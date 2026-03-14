import { MapPin, User as UserIcon } from 'lucide-react';

const ProfileHeader = ({ profile, onEditClick }) => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-6">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400 text-slate-950 shadow-lg">
                    <UserIcon size={40} strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{profile.name}</h1>
                    <p className="text-slate-400 mb-3">{profile.email}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                        {profile.location && (
                            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                                <MapPin size={14} className="text-emerald-400" />
                                {profile.location}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full md:w-auto md:max-w-xs text-left md:text-right">
                {profile.bio ? (
                    <p className="text-sm text-slate-300 italic mb-4">"{profile.bio}"</p>
                ) : (
                    <p className="text-sm text-slate-500 italic mb-4">No bio added yet.</p>
                )}

                <button
                    onClick={onEditClick}
                    className="w-full md:w-auto rounded-xl border border-white/10 bg-slate-800/80 px-5 py-2.5 font-medium text-slate-200 shadow-sm backdrop-blur-md transition hover:bg-slate-700 hover:text-white"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;
