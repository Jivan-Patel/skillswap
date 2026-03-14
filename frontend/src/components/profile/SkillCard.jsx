import { Trash2 } from 'lucide-react';

const levelColors = {
    Advanced: 'bg-teal-500/20 text-teal-400',
    Intermediate: 'bg-amber-500/20 text-amber-400',
    Beginner: 'bg-slate-500/20 text-slate-400',
};

const SkillCard = ({ skill, onDelete, colorTone = 'emerald' }) => {
    // Support both object { name, level } and plain string for backward compat
    const skillName = typeof skill === 'string' ? skill : skill.name;
    const skillLevel = typeof skill === 'string' ? 'Beginner' : (skill.level || 'Beginner');
    const badgeClass = levelColors[skillLevel] || levelColors.Beginner;

    return (
        <div className={`group relative rounded-xl border border-white/5 bg-slate-800/50 p-4 shadow-sm transition-all duration-200 hover:border-${colorTone}-500/50 hover:shadow-lg hover:shadow-${colorTone}-500/5 hover:-translate-y-0.5 flex justify-between items-start`}>
            <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-white">{skillName}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${badgeClass}`}>
                    {skillLevel}
                </span>
            </div>
            <button
                onClick={() => onDelete(skillName)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100 mt-0.5"
                title="Remove Skill"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

export default SkillCard;
