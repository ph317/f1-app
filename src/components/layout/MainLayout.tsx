import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { motion } from 'framer-motion';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-f1-dark text-white relative overflow-hidden font-sans selection:bg-f1-red selection:text-white">
            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-f1-red/20 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <main className="relative z-10 container mx-auto px-4 py-8 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>

            {/* Footer - Bottom Right Corner */}
            <footer className="fixed bottom-6 right-6 z-40 pointer-events-none">
                <a
                    href="https://honeypatel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto text-[9px] md:text-[10px] text-gray-500 font-mono tracking-wider opacity-60 hover:opacity-100 transition-all duration-300 group"
                >
                    <span className="text-gray-600">by</span> <span className="text-f1-red font-bold group-hover:underline decoration-f1-red/30 underline-offset-2">Honey Patel</span>
                </a>
            </footer>

            <Navbar />
        </div>
    );
}
