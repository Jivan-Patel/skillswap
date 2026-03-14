import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, onClose, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger fade-in
        const showTimer = setTimeout(() => setVisible(true), 10);

        // Auto-dismiss
        const hideTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // wait for fade-out before unmounting
        }, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [duration, onClose]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-slate-900/95 px-5 py-3.5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl transition-all duration-300 ${
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
            }`}
        >
            <CheckCircle size={18} className="text-emerald-400 shrink-0" />
            <span className="text-sm font-medium text-slate-200">{message}</span>
            <button
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="ml-2 rounded-full p-1 text-slate-500 hover:bg-white/10 hover:text-white transition-colors"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default Toast;
