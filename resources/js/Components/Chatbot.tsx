import { useState, useRef, useEffect, useCallback } from 'react';
import { chatService, createMessageId, type ChatMessage } from '@/services/chatService';

const SUGGESTED_TOPICS = [
    'Jurusan apa saja yang ada?',
    'Informasi PPDB',
    'Prestasi sekolah',
    'Informasi PKL',
    'Produk unggulan BLUD',
    'Kontak sekolah',
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesRef = useRef<ChatMessage[]>([]);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isLoading) return;

        setInput('');
        setHasError(false);

        const userMsg: ChatMessage = {
            id: createMessageId(),
            role: 'user',
            content: messageText,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(messageText, messages);
            const assistantMsg: ChatMessage = {
                id: createMessageId(),
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMsg]);
        } catch {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    // External opener: window.dispatchEvent(new CustomEvent('sapa:open', { detail: 'pesan?' }))
    useEffect(() => {
        const open = (e: Event) => {
            setIsOpen(true);
            setHasError(false);
            const preset = (e as CustomEvent<string | undefined>).detail;
            if (typeof preset !== 'string' || !preset.trim()) return;
            const text = preset.trim();
            const userMsg: ChatMessage = {
                id: createMessageId(),
                role: 'user',
                content: text,
                timestamp: new Date(),
            };
            const history = [...messagesRef.current, userMsg];
            setMessages(history);
            setIsLoading(true);
            chatService
                .sendMessage(text, messagesRef.current)
                .then((response) => {
                    setMessages((prev) => [
                        ...prev,
                        { id: createMessageId(), role: 'assistant', content: response, timestamp: new Date() },
                    ]);
                })
                .catch(() => setHasError(true))
                .finally(() => setIsLoading(false));
        };
        window.addEventListener('sapa:open', open);
        return () => window.removeEventListener('sapa:open', open);
    }, []);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-galaxy text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
                aria-label={isOpen ? 'Tutup chatbot' : 'Buka chatbot SAPA'}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed right-6 bottom-24 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[540px] max-h-[calc(100vh-120px)] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in">
                    {/* Header */}
                    <div className="bg-galaxy text-white px-5 py-4 flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-planetary flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 01-2.25 2.25H7.25A2.25 2.25 0 015 17v-2.5" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm">SAPA</h3>
                            <p className="text-xs text-white/70">Asisten SMKN 1 Cimahi</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Tutup chatbot"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {messages.length === 0 ? (
                            /* Empty State */
                            <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                <div className="w-16 h-16 rounded-full bg-sky/50 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-planetary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-galaxy text-sm">Halo! Saya SAPA</h4>
                                <p className="text-xs text-gray-500 mt-1.5 mb-5">
                                    Asisten virtual SMKN 1 Cimahi. Ada yang bisa saya bantu?
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {SUGGESTED_TOPICS.map((topic) => (
                                        <button
                                            key={topic}
                                            onClick={() => handleSend(topic)}
                                            className="text-xs px-3 py-1.5 rounded-full border border-venus text-planetary hover:bg-sky/30 transition-colors"
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                                                msg.role === 'user'
                                                    ? 'bg-galaxy text-white rounded-2xl rounded-br-md'
                                                    : 'bg-meteor text-gray-900 rounded-2xl rounded-bl-md'
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {/* Loading */}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-meteor text-gray-500 px-4 py-3 rounded-2xl rounded-bl-md">
                                            <div className="flex gap-1.5">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Error */}
                                {hasError && (
                                    <div className="flex justify-start">
                                        <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm">
                                            Maaf, terjadi kesalahan. Silakan coba lagi.
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-100 px-4 py-3 shrink-0">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik pertanyaan..."
                                className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary/30"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 rounded-xl bg-planetary text-white flex items-center justify-center hover:bg-galaxy transition-colors disabled:opacity-40 disabled:cursor-default shrink-0"
                                aria-label="Kirim pesan"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .animate-in {
                    animation: chatSlideIn 200ms ease-out;
                }
                @keyframes chatSlideIn {
                    from { opacity: 0; transform: translateY(12px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </>
    );
}
