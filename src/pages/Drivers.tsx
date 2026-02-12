import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDrivers, type Driver } from '@/api';

// Map API driver data to local filenames in public/images/
// Filenames based on user provided list: first names mostly, some last names
const DRIVER_IMAGE_MAP: Record<string, string> = {
    // Current Champions / Veterans
    'verstappen': 'max.png',
    'perez': 'sergio.png',
    'hamilton': 'lewis.png',
    'russell': 'george.png',
    'leclerc': 'charles.png',
    'sainz': 'sainz.png',
    'alonso': 'alonso.png',
    'stroll': 'lance.png',
    'norris': 'lando.png',
    'piastri': 'oscar.png',
    'gasly': 'pierre.png',
    'ocon': 'ocon.png',
    'albon': 'albon.png',
    'hulkenberg': 'nico.png',
    'bottas': 'bottas.png',

    // New Gen / Rookies (2025/2026)
    'bearman': 'oliver.png',
    'antonelli': 'kimi.png',
    'lawson': 'liam.png',
    'colapinto': 'franco.png',
    'bortoleto': 'gabriel.png',
    'hadjar': 'isack.png',
    'lindblad': 'arvid.png',

    // Fallback/Missing from list?
    'tsunoda': 'logo.png', // Temporary fallback if Yuki image missing
};

function getDriverImage(driver: Driver): string {
    // Try matching by last name first (most common unique identifier)
    const lastNameKey = driver.last_name.toLowerCase();
    if (DRIVER_IMAGE_MAP[lastNameKey]) {
        return `/images/${DRIVER_IMAGE_MAP[lastNameKey]}`;
    }

    // Try finding by checking if any key matches the start of the full name
    // (Optimization for future if needed)

    return '/images/logo.png'; // Default fallback
}

export default function Drivers() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const data = await getDrivers();
            // Sort by team name first, then by driver number within each team
            data.sort((a, b) => {
                const teamCompare = a.team_name.localeCompare(b.team_name);
                if (teamCompare !== 0) return teamCompare;
                return a.driver_number - b.driver_number;
            });
            setDrivers(data);
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-2xl font-mono animate-pulse">Loading Grid...</div>;
    }

    return (
        <div className="min-h-screen p-4 md:p-8 pt-24 pb-20">
            <header className="mb-12">
                <h1 className="text-6xl md:text-8xl font-bold uppercase italic tracking-tighter">
                    The <span className="text-f1-red">Grid</span>
                </h1>
                <p className="text-xl text-gray-400">{new Date().getFullYear()} Season Lineup</p>
            </header>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {drivers.map((driver, index) => (
                    <motion.div
                        key={driver.driver_number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative h-[450px] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/30 transition-all duration-500"
                    >
                        {/* Background Number */}
                        <div className="absolute -right-4 -bottom-12 text-[10rem] font-bold text-white/5 font-mono select-none group-hover:text-white/10 transition-colors duration-500 leading-none">
                            {driver.driver_number}
                        </div>

                        {/* Driver Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        <img
                            src={getDriverImage(driver)}
                            alt={driver.full_name}
                            className={`absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ${['bortoleto', 'hulkenberg'].includes(driver.last_name.toLowerCase()) ? 'scale-125 origin-top' : ''
                                }`}
                        />

                        {/* Color accent bar */}
                        <div
                            className="absolute top-0 left-0 w-full h-1 z-30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                            style={{ backgroundColor: `#${driver.team_colour}` }}
                        />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-bold uppercase italic leading-none break-words drop-shadow-lg">
                                    <span className="text-xl block text-gray-300 font-normal not-italic mb-1">{driver.first_name}</span>
                                    {driver.last_name}
                                </h2>

                                <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
                                    <p className="text-lg font-bold truncate pr-4 drop-shadow-md" style={{ color: `#${driver.team_colour}` }}>
                                        {driver.team_name}
                                    </p>
                                    <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-300 backdrop-blur-md">
                                        #{driver.driver_number}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
