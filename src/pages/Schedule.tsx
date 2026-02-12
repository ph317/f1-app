import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSchedule } from '@/api';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { formatToEST } from '@/utils/dateUtils';

export default function Schedule() {
    const [races, setRaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getSchedule();
            setRaces(data);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">Loading Calendar...</div>;

    return (
        <div className="space-y-12">
            <header className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter mb-4">
                    Race <span className="text-f1-red">Calendar</span> {new Date().getFullYear()}
                </h1>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {races.map((race, index) => {
                    const raceDate = new Date(race.date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const raceDateOnly = new Date(raceDate);
                    raceDateOnly.setHours(0, 0, 0, 0);
                    const isCompleted = raceDateOnly < today;

                    return (
                        <motion.div
                            key={race.round}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`group relative p-6 rounded-3xl border border-white/10 hover:border-f1-red/50 transition-all duration-300 ${isCompleted ? 'bg-zinc-900/50 grayscale' : 'bg-zinc-800'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono font-bold">
                                    ROUND {race.round}
                                </div>
                                {isCompleted ? (
                                    <span className="text-xs font-bold text-gray-500 uppercase">Completed</span>
                                ) : (
                                    <span className="text-xs font-bold text-f1-red uppercase animate-pulse">Upcoming</span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold uppercase leading-tight mb-2 group-hover:text-f1-red transition-colors">
                                {race.raceName}
                            </h3>

                            <div className="flex flex-col gap-2 text-gray-400 text-sm mb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{raceDate.toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} />
                                    <span>{race.Circuit.circuitName}, {race.Circuit.Location.locality}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>{formatToEST(race.date, race.time)} EST</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                <div className="text-xs text-gray-500 uppercase">Winner</div>
                                <div className="font-bold">
                                    {isCompleted ? "TBD" : "—"}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
