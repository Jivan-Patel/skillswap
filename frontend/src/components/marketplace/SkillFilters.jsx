const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Design',
    'DevOps',
    'Programming',
    'General'
];

const SkillFilters = ({ selectedLevel, selectedCategory, onLevelChange, onCategoryChange }) => {
    return (
        <div className="space-y-4">
            {/* Level Filters */}
            <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Level</p>
                <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                        <button
                            key={level}
                            onClick={() => onLevelChange(level)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all duration-200 ${
                                selectedLevel === level
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                    : 'bg-slate-800/50 text-slate-400 border-white/10 hover:bg-slate-700/50 hover:text-slate-300'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filters */}
            <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all duration-200 ${
                                selectedCategory === category
                                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                                    : 'bg-slate-800/50 text-slate-400 border-white/10 hover:bg-slate-700/50 hover:text-slate-300'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillFilters;
