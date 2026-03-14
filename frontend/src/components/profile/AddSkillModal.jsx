import { useState } from 'react';
import { X } from 'lucide-react';

const AddSkillModal = ({ title, onClose, onSubmit }) => {
    const [skill, setSkill] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (skill.trim()) {
            onSubmit(skill.trim());
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white transition">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        autoFocus
                        type="text"
                        value={skill}
                        onChange={e => setSkill(e.target.value)}
                        placeholder="e.g. React.js, Python, UI Design"
                        className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 mb-6 transition"
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!skill.trim()}
                            className="rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-sm transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSkillModal;
