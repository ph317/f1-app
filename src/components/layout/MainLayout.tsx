import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

const SOUNDCLOUD_TRACK_URL = 'https://soundcloud.com/hans-zimmer-official/f1';
const SC_WIDGET_URL = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SOUNDCLOUD_TRACK_URL)}&auto_play=true&buying=false&liking=false&download=false&sharing=false&show_artwork=false&show_comments=false&show_playcount=false&show_user=false&hide_related=true&visual=false&start_track=0`;

export function MainLayout({ children }: MainLayoutProps) {
    const [isMuted, setIsMuted] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<any>(null);

    useEffect(() => {
        // Load SoundCloud Widget API script once
        if (document.getElementById('sc-widget-api')) return;
        const script = document.createElement('script');
        script.id = 'sc-widget-api';
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.onload = () => {
            if (!iframeRef.current) return;
            const SC = (window as any).SC;
            const widget = SC.Widget(iframeRef.current);
            widgetRef.current = widget;
            widget.bind(SC.Widget.Events.READY, () => {
                widget.setVolume(35);
                widget.play();
            });
            // Loop: restart when the track finishes
            widget.bind(SC.Widget.Events.FINISH, () => {
                widget.seekTo(0);
                widget.play();
            });
        };
        document.body.appendChild(script);
    }, []);

    const toggleMusic = () => {
        const widget = widgetRef.current;
        if (!widget) return;
        if (isMuted) {
            widget.setVolume(35);
            widget.play();
            setIsMuted(false);
        } else {
            widget.setVolume(0);
            setIsMuted(true);
        }
    };

    return (
        <div className="min-h-screen bg-f1-dark text-white relative overflow-hidden font-sans selection:bg-f1-red selection:text-white">
            {/* Hidden SoundCloud iframe */}
            <iframe
                ref={iframeRef}
                src={SC_WIDGET_URL}
                className="absolute w-0 h-0 pointer-events-none opacity-0"
                allow="autoplay"
                title="background-music"
            />

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

            {/* Music Toggle — Bottom Left */}
            <div className="fixed bottom-6 left-6 z-40">
                <button
                    onClick={toggleMusic}
                    title={isMuted ? 'Play F1 Theme Music' : 'Mute Music'}
                    className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-mono tracking-wider opacity-60 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                >
                    <span className="text-f1-red text-sm leading-none">
                        {isMuted ? '♪' : '♫'}
                    </span>
                    <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
                        {isMuted ? 'play theme' : 'mute'}
                    </span>
                </button>
            </div>

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
