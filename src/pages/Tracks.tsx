import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Activity, ExternalLink } from 'lucide-react';
import { getCircuits } from '@/api';
import { getCircuitImageUrl } from '@/utils/circuitImages';

export default function Tracks() {
    const [circuits, setCircuits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getCircuits();
            setCircuits(data);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">Loading Circuits...</div>;

    return (
        <div className="space-y-12 pb-20 p-8 pt-24">
            <header className="mb-12">
                <h1 className="text-6xl md:text-8xl font-bold uppercase italic tracking-tighter">
                    Global <span className="text-white/20">Circuits</span>
                </h1>
                <p className="text-xl text-gray-400">{new Date().getFullYear()} Season Venues</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {circuits.map((circuit, index) => (
                    <motion.div
                        key={circuit.circuitId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex flex-col h-[450px] rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden hover:border-f1-red/50 transition-all duration-500 shadow-2xl"
                    >
                        {/* Top: Circuit Map Section */}
                        <div className="relative h-3/5 bg-zinc-950 flex items-center justify-center p-10 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-f1-red/5 to-transparent opacity-50" />
                            <img
                                src={getCircuitImageUrl(circuit.circuitId)}
                                alt={circuit.circuitName}
                                className="w-full h-full object-contain filter invert opacity-90 group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            />
                            <div className="absolute top-4 right-4 text-f1-red/40 group-hover:text-f1-red transition-colors">
                                <Activity size={20} />
                            </div>
                        </div>

                        {/* Bottom: Content Section */}
                        <div className="h-2/5 p-6 bg-zinc-900 flex flex-col justify-between border-t border-white/5">
                            <div>
                                <h2 className="text-xl font-bold uppercase italic tracking-tight leading-none mb-3 group-hover:text-f1-red transition-colors">
                                    {circuit.circuitName}
                                </h2>
                                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                                    <MapPin size={14} className="text-f1-red" />
                                    {circuit.Location.locality}, {circuit.Location.country}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <a
                                    href={circuit.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-f1-red transition-colors group/link"
                                >
                                    Track Specs
                                    <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                </a>
                                <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-f1-red w-0 group-hover:w-full transition-all duration-700" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
