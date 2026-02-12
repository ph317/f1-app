import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDriverStandings, getConstructorStandings, type Standing } from '@/api';

export default function Rankings() {
    const [driverStandings, setDriverStandings] = useState<Standing[]>([]);
    const [constructorStandings, setConstructorStandings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const drivers = await getDriverStandings();
            const constructors = await getConstructorStandings();
            setDriverStandings(drivers);
            setConstructorStandings(constructors);
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">Loading Standings...</div>;

    return (
        <div className="space-y-12">
            <header className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter mb-4">
                    Standings <span className="text-f1-red">{new Date().getFullYear() - 1}</span>
                </h1>
            </header>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Drivers Championship */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-f1-red rounded-full" /> Drivers Championship
                    </h2>
                    <div className="flex flex-col gap-3">
                        {driverStandings.map((standing, index) => (
                            <motion.div
                                key={standing.Driver.driverId}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-3xl font-bold text-gray-500 w-8">{standing.position}</span>
                                    {/* Used placeholder for image as standings API doesn't have it, or could map from driver list */}
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-white/10 text-xs font-bold text-gray-400">
                                        {standing.Driver.code}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg uppercase leading-none">{standing.Driver.givenName} {standing.Driver.familyName}</h3>
                                        <p className="text-sm text-gray-400">{standing.Constructors[0]?.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-f1-red font-mono">{standing.points}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">PTS</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Constructors Championship */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full" /> Constructors Championship
                    </h2>
                    <div className="flex flex-col gap-3">
                        {constructorStandings.map((team, index) => (
                            <motion.div
                                key={team.Constructor.constructorId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-3xl font-bold text-gray-500 w-8">{team.position}</span>
                                    <div className="w-2 h-8 rounded-full bg-white/20" />
                                    <div>
                                        <h3 className="font-bold text-xl uppercase tracking-tighter">{team.Constructor.name}</h3>
                                        <p className="text-sm text-gray-400 font-mono">{team.wins} WINS</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white font-mono">{team.points}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">PTS</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
