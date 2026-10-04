import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Chatbot from '@/Components/Chatbot';
import { PropsWithChildren, useEffect, useState } from 'react';

interface PublicLayoutProps extends PropsWithChildren {
    title: string;
    description?: string;
}

/** Max wait for full asset load before revealing anyway (slow-network safety). */
const REVEAL_TIMEOUT_MS = 5000;

export default function PublicLayout({ title, description, children }: PublicLayoutProps) {
    const { url } = usePage();
    const [ready, setReady] = useState(false);

    // Reveal the page only after all (eager) images/assets are loaded.
    // Lazy images never block window.load, so below-fold content stays fast.
    useEffect(() => {
        if (document.readyState === 'complete') {
            setReady(true);
            return;
        }
        const fallback = setTimeout(() => setReady(true), REVEAL_TIMEOUT_MS);
        const onLoad = () => {
            clearTimeout(fallback);
            setReady(true);
        };
        window.addEventListener('load', onLoad);
        return () => {
            window.removeEventListener('load', onLoad);
            clearTimeout(fallback);
        };
    }, []);

    return (
        <div className="bg-white text-gray-900 antialiased">
            <Head>
                <title>{title}</title>
                {description && <meta name="description" content={description} />}
            </Head>
            <Navbar currentPath={url} />
            <main>{children}</main>
            <Footer />
            <Chatbot />

            {/* Splash overlay until assets loaded */}
            <div
                aria-hidden={ready}
                className={`fixed inset-0 z-[60] bg-galaxy flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${
                    ready ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                <img
                    src="/images/logosmk.png"
                    alt=""
                    className="w-16 h-16 object-contain brightness-0 invert"
                />
                <p className="font-display text-white text-lg font-bold">SMK Negeri 1 Cimahi</p>
                <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}
