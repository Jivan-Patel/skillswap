import { Trash2 } from 'lucide-react';

const SkillCard = ({ skill, onDelete, colorTone = 'emerald' }) => {
    return (
        <div className={`group relative rounded-xl border border-white/5 bg-slate-800/50 p-4 shadow-sm transition hover:border-${colorTone}-500/50 flex justify-between items-center`}>
            <div>
                <h3 className="font-semibold text-white">{skill}</h3>
            </div>
            <button
                onClick={() => onDelete(skill)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
                title="Remove Skill"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

export default SkillCard;
