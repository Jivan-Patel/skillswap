import { useState } from 'react';
import { Mail, Phone, Copy, CheckCheck, MessageCircle } from 'lucide-react';

// Sanitize phone number to digits only (for WhatsApp link)
const sanitizePhone = (phone) => phone.replace(/\D/g, '');

const ContactSection = ({ contact, partnerLabel = 'Connect with' }) => {
    const [copied, setCopied] = useState(false);

    if (!contact) return null;

    const { name, email, phone } = contact;
    const hasPhone = phone && phone.trim().length > 0;
    const sanitizedPhone = hasPhone ? sanitizePhone(phone) : '';
    const whatsappUrl = `https://wa.me/${sanitizedPhone}`;

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // fallback — do nothing
        }
    };

    return (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
            {/* Success banner */}
            <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <div>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Request Accepted!</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500">
                        {partnerLabel} <span className="font-semibold">{name}</span> — you can now connect and start learning together.
                    </p>
                </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 mb-3">
                {email && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                        <Mail size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="break-all">{email}</span>
                    </div>
                )}
                {hasPhone ? (
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                        <Phone size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{phone}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
                        <Phone size={13} className="shrink-0" />
                        <span>Phone number not provided</span>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
                {email && (
                    <button
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-slate-800 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                    >
                        {copied ? (
                            <>
                                <CheckCheck size={13} />
                                Email copied!
                            </>
                        ) : (
                            <>
                                <Copy size={13} />
                                Copy Email
                            </>
                        )}
                    </button>
                )}
                {hasPhone && (
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
                    >
                        <MessageCircle size={13} />
                        Chat on WhatsApp
                    </a>
                )}
            </div>
        </div>
    );
};

export default ContactSection;
