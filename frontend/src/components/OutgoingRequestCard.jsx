import StatusBadge from './StatusBadge';

const LEVEL_STYLES = {
    Advanced: 'bg-teal-50 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400',
    Intermediate: 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    Beginner: 'bg-gray-100 text-gray-600 dark:bg-slate-500/20 dark:text-slate-400'
};

const OutgoingRequestCard = ({ request }) => {
    const receiverName = request?.receiverId?.name || 'Unknown receiver';
    const skillTitle = request?.skillId?.title || 'Skill';
    const skillLevel = request?.skillId?.level || 'Beginner';
    const levelBadgeClass = LEVEL_STYLES[skillLevel] || LEVEL_STYLES.Beginner;

    return (
        <div className="group relative rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5 dark:border-white/10 dark:bg-slate-900/60">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{skillTitle}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                        Sent to <span className="font-medium text-gray-700 dark:text-slate-300">{receiverName}</span>
                    </p>
                </div>
                <StatusBadge status={request.status} />
            </div>

            <div className="rounded-xl border border-gray-100 bg-white/80 p-4 dark:border-white/5 dark:bg-slate-800/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500">Requested Skill Level</p>
                <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${levelBadgeClass}`}>
                    {skillLevel}
                </span>
            </div>
        </div>
    );
};

export default OutgoingRequestCard;