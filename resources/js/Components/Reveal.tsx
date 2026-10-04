import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    /** Stagger delay in ms (e.g. (i % 4) * 80 for grids). */
    delay?: number;
    className?: string;
}

/**
 * Fade-and-rise on first scroll into view. Respects
 * prefers-reduced-motion via CSS. Keep usage tasteful:
 * section blocks and cards, not every single element.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
