import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { adminAuthService } from '@/services/admin/adminAuthService';

export default function AdminLogin() {
    const [email, setEmail] = useState('admin@smkn1cimahi.sch.id');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            await adminAuthService.login(email, password);
            window.location.href = '/admin/dashboard';
        } catch (err: unknown) {
            setErrorMessage(err instanceof Error ? err.message : 'Gagal login.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-milky-way flex items-center justify-center p-4 antialiased">
            <Head title="Login Admin Panel - SMKN 1 Cimahi" />

            <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header with Galaxy Navy branding */}
                <div className="bg-galaxy text-white px-8 py-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="w-40 h-40 rounded-full bg-planetary blur-2xl absolute -top-10 -right-10" />
                        <div className="w-40 h-40 rounded-full bg-universe blur-2xl absolute -bottom-10 -left-10" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-xl bg-white/10 p-2.5 backdrop-blur-md border border-white/20 mb-3 flex items-center justify-center">
                            <img
                                src="/images/logosmk.png"
                                alt="Logo SMK Negeri 1 Cimahi"
                                className="w-full h-full object-contain brightness-0 invert"
                            />
                        </div>
                        <h1 className="font-display text-2xl font-bold">Admin Panel CMS</h1>
                        <p className="text-xs text-white/70 mt-1">SMK Negeri 1 Cimahi</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {errorMessage && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-galaxy mb-1.5">
                            Email / Username
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@smkn1cimahi.sch.id"
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-galaxy mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full text-xs px-3.5 py-2.5 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                                aria-label="Toggle password"
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-planetary hover:bg-galaxy text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Memverifikasi...</span>
                            </>
                        ) : (
                            <span>Masuk ke Dashboard</span>
                        )}
                    </button>

                    <div className="pt-2 text-center border-t border-gray-100">
                        <a href="/" className="text-xs text-planetary hover:underline font-medium">
                            &larr; Kembali ke Website Publik
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
