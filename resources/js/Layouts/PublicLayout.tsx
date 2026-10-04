import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Chatbot from '@/Components/Chatbot';
import { PropsWithChildren } from 'react';

interface PublicLayoutProps extends PropsWithChildren {
    title: string;
    description?: string;
}

export default function PublicLayout({ title, description, children }: PublicLayoutProps) {
    const { url } = usePage();

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
        </div>
    );
}
