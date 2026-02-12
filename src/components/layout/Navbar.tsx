import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Trophy, Users, History, Map, Calendar } from 'lucide-react';

const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Rankings', path: '/rankings', icon: Trophy },
    { name: 'Drivers', path: '/drivers', icon: Users },
    { name: 'History', path: '/history', icon: History },
    { name: 'Tracks', path: '/tracks', icon: Map },
];

export function Navbar() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 p-2 rounded-full glass shadow-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "relative flex items-center justify-center p-3 rounded-full transition-all duration-300",
                                isActive ? "text-f1-red bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-full border border-white/10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="sr-only">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
