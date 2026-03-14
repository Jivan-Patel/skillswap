import { MapPin, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import RequestButton from './RequestButton';

const levelColors = {
    Advanced: 'bg-teal-500/20 text-teal-400',
    Intermediate: 'bg-amber-500/20 text-amber-400',
    Beginner: 'bg-slate-500/20 text-slate-400',
};

const MarketplaceSkillCard = ({ skill, onRequest }) => {
    const user = skill.userId;
    const userName = user?.name || 'Unknown User';
    const userLocation = user?.location || '';
    const badgeClass = levelColors[skill.level] || levelColors.Beginner;

    return (
        <div className="group relative flex flex-col rounded-2xl border border-white/5 bg-slate-900/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1">
            {/* Category Tag */}
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-3">
                {skill.category || 'General'}
            </span>

            {/* Skill Title + Level */}
            <h3 className="text-lg font-bold text-white mb-2">{skill.title}</h3>
            <span className={`text-xs px-2.5 py-0.5 rounded-full w-fit mb-3 ${badgeClass}`}>
                {skill.level}
            </span>

            {/* Description */}
            {skill.description && (
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{skill.description}</p>
            )}

            {/* Divider */}
            <div className="mt-auto border-t border-white/5 pt-4">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400 text-slate-950">
                        <UserIcon size={16} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{userName}</p>
                        {userLocation && (
                            <p className="flex items-center gap-1 text-xs text-slate-400">
                                <MapPin size={11} className="text-emerald-400 shrink-0" />
                                <span className="truncate">{userLocation}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <RequestButton onRequest={() => onRequest(skill._id)} />
                </div>
            </div>
        </div>
    );
};

export default MarketplaceSkillCard;
