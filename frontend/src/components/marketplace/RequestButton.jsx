import { Send } from 'lucide-react';

const RequestButton = ({ onRequest }) => {
    return (
        <button
            onClick={onRequest}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-500/20 dark:to-sky-500/20 px-3 py-2 text-xs font-semibold text-white border border-emerald-500/20 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-500/30 dark:hover:to-sky-500/30 transition-all duration-200"
        >
            <Send size={14} />
            Request Skill
        </button>
    );
};

export default RequestButton;
