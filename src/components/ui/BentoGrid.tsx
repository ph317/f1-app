import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-7xl mx-auto", className)}>
            {children}
        </div>
    );
}

export function BentoItem({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    delay = 0
}: {
    children: ReactNode;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: delay }}
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:bg-white/10 transition-colors duration-300",
                colSpan === 2 && "md:col-span-2",
                colSpan === 3 && "md:col-span-3",
                rowSpan === 2 && "md:row-span-2",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
