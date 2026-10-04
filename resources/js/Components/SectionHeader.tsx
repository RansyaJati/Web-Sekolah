interface SectionHeaderProps {
    title: string;
    description?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionHeader({ title, description, centered = true, light = false }: SectionHeaderProps) {
    return (
        <div className={centered ? 'text-center' : ''}>
            <h2 className={`font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] ${light ? 'text-white' : 'text-galaxy'}`}>
                {title}
            </h2>
            {description && (
                <p className={`mt-4 text-base leading-relaxed max-w-[680px] ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-gray-500'}`}>
                    {description}
                </p>
            )}
        </div>
    );
}
