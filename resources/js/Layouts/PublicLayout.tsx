import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Chatbot from '@/Components/Chatbot';
import { PropsWithChildren, useEffect, useState } from 'react';

interface PublicLayoutProps extends PropsWithChildren {
    title: string;
    description?: string;
}

export default function PublicLayout({ title, description, children }: PublicLayoutProps) {
    const { url } = usePage();
    const [ready, setReady] = useState(false);

    // Reveal each page only after its eager images (esp. banners) finish
    // loading. Lazy below-fold images never block. 6s safety fallback.
    useEffect(() => {
        let cancelled = false;
        setReady(false);
        const done = () => {
            if (!cancelled) setReady(true);
        };
        const fallback = setTimeout(done, 6000);

        // Wait a tick so React has painted <img> tags into the DOM.
        const timer = setTimeout(() => {
            if (cancelled) return;
            const pending = Array.from(
                document.querySelectorAll('main img, header img'),
            ).filter(
                (el) =>
                    (el as HTMLImageElement).loading !== 'lazy' &&
                    !(el as HTMLImageElement).complete,
            ) as HTMLImageElement[];

            if (pending.length === 0) {
                clearTimeout(fallback);
                done();
                return;
            }

            let remaining = pending.length;
            const one = () => {
                remaining -= 1;
                if (remaining <= 0) {
                    clearTimeout(fallback);
                    done();
                }
            };
            pending.forEach((img) => {
                img.addEventListener('load', one, { once: true });
                img.addEventListener('error', one, { once: true });
            });
        }, 60);

        return () => {
            cancelled = true;
            clearTimeout(fallback);
            clearTimeout(timer);
        };
    }, [url]);

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
                    className="w-16 h-16 object-contain"
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
