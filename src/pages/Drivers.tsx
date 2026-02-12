import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { Driver } from '@/api';

// Map API driver data to local filenames in public/images/
const DRIVER_IMAGE_MAP: Record<string, string> = {
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
    'bearman': 'oliver.png',
    'antonelli': 'kimi.png',
    'lawson': 'liam.png',
    'colapinto': 'franco.png',
    'bortoleto': 'gabriel.png',
    'hadjar': 'isack.png',
    'lindblad': 'arvid.png'
};

// Static 2026 Grid Lineup
const STATIC_DRIVERS: Driver[] = [
    // McLaren (Reigning Champs)
    { driver_number: 1, full_name: "Lando Norris", first_name: "Lando", last_name: "Norris", team_name: "McLaren", team_colour: "FF8000", broadcast_name: "L NORRIS", name_acronym: "NOR", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "GBR" },
    { driver_number: 81, full_name: "Oscar Piastri", first_name: "Oscar", last_name: "Piastri", team_name: "McLaren", team_colour: "FF8000", broadcast_name: "O PIASTRI", name_acronym: "PIA", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "AUS" },

    // Ferrari
    { driver_number: 16, full_name: "Charles Leclerc", first_name: "Charles", last_name: "Leclerc", team_name: "Ferrari", team_colour: "E80020", broadcast_name: "C LECLERC", name_acronym: "LEC", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "MON" },
    { driver_number: 44, full_name: "Lewis Hamilton", first_name: "Lewis", last_name: "Hamilton", team_name: "Ferrari", team_colour: "E80020", broadcast_name: "L HAMILTON", name_acronym: "HAM", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "GBR" },

    // Mercedes
    { driver_number: 63, full_name: "George Russell", first_name: "George", last_name: "Russell", team_name: "Mercedes", team_colour: "27F4D2", broadcast_name: "G RUSSELL", name_acronym: "RUS", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "GBR" },
    { driver_number: 12, full_name: "Kimi Antonelli", first_name: "Kimi", last_name: "Antonelli", team_name: "Mercedes", team_colour: "27F4D2", broadcast_name: "K ANTONELLI", name_acronym: "ANT", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "ITA" },

    // Red Bull
    { driver_number: 3, full_name: "Max Verstappen", first_name: "Max", last_name: "Verstappen", team_name: "Red Bull Racing", team_colour: "3671C6", broadcast_name: "M VERSTAPPEN", name_acronym: "VER", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "NED" },
    { driver_number: 6, full_name: "Isack Hadjar", first_name: "Isack", last_name: "Hadjar", team_name: "Red Bull Racing", team_colour: "3671C6", broadcast_name: "I HADJAR", name_acronym: "HAD", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "FRA" },

    // Williams
    { driver_number: 23, full_name: "Alexander Albon", first_name: "Alexander", last_name: "Albon", team_name: "Williams", team_colour: "64C4FF", broadcast_name: "A ALBON", name_acronym: "ALB", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "THA" },
    { driver_number: 55, full_name: "Carlos Sainz", first_name: "Carlos", last_name: "Sainz", team_name: "Williams", team_colour: "64C4FF", broadcast_name: "C SAINZ", name_acronym: "SAI", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "ESP" },

    // Racing Bulls (RB)
    { driver_number: 30, full_name: "Liam Lawson", first_name: "Liam", last_name: "Lawson", team_name: "RB", team_colour: "6692FF", broadcast_name: "L LAWSON", name_acronym: "LAW", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "NZL" },
    { driver_number: 15, full_name: "Arvid Lindblad", first_name: "Arvid", last_name: "Lindblad", team_name: "RB", team_colour: "6692FF", broadcast_name: "A LINDBLAD", name_acronym: "LIN", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "GBR" },

    // Aston Martin
    { driver_number: 14, full_name: "Fernando Alonso", first_name: "Fernando", last_name: "Alonso", team_name: "Aston Martin", team_colour: "229971", broadcast_name: "F ALONSO", name_acronym: "ALO", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "ESP" },
    { driver_number: 18, full_name: "Lance Stroll", first_name: "Lance", last_name: "Stroll", team_name: "Aston Martin", team_colour: "229971", broadcast_name: "L STROLL", name_acronym: "STR", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "CAN" },

    // Haas
    { driver_number: 87, full_name: "Oliver Bearman", first_name: "Oliver", last_name: "Bearman", team_name: "Haas", team_colour: "B6BABD", broadcast_name: "O BEARMAN", name_acronym: "BEA", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "GBR" },
    { driver_number: 31, full_name: "Esteban Ocon", first_name: "Esteban", last_name: "Ocon", team_name: "Haas", team_colour: "B6BABD", broadcast_name: "E OCON", name_acronym: "OCO", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "FRA" },

    // Audi
    { driver_number: 27, full_name: "Nico Hulkenberg", first_name: "Nico", last_name: "Hulkenberg", team_name: "Audi", team_colour: "EE1739", broadcast_name: "N HULKENBERG", name_acronym: "HUL", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "GER" },
    { driver_number: 5, full_name: "Gabriel Bortoleto", first_name: "Gabriel", last_name: "Bortoleto", team_name: "Audi", team_colour: "EE1739", broadcast_name: "G BORTOLETO", name_acronym: "BOR", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "BRA" },

    // Alpine
    { driver_number: 10, full_name: "Pierre Gasly", first_name: "Pierre", last_name: "Gasly", team_name: "Alpine", team_colour: "0093CC", broadcast_name: "P GASLY", name_acronym: "GAS", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "FRA" },
    { driver_number: 43, full_name: "Franco Colapinto", first_name: "Franco", last_name: "Colapinto", team_name: "Alpine", team_colour: "0093CC", broadcast_name: "F COLAPINTO", name_acronym: "COL", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "ARG" },

    // Cadillac (11th Team)
    { driver_number: 11, full_name: "Sergio Perez", first_name: "Sergio", last_name: "Perez", team_name: "Cadillac", team_colour: "003366", broadcast_name: "S PEREZ", name_acronym: "PER", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "MEX" },
    { driver_number: 77, full_name: "Valtteri Bottas", first_name: "Valtteri", last_name: "Bottas", team_name: "Cadillac", team_colour: "003366", broadcast_name: "V BOTTAS", name_acronym: "BOT", meeting_key: 0, session_key: 0, headshot_url: null, country_code: "FIN" },
];

function getDriverImage(driver: Driver): string {
    const lastNameKey = driver.last_name.toLowerCase();
    if (DRIVER_IMAGE_MAP[lastNameKey]) {
        return `/images/${DRIVER_IMAGE_MAP[lastNameKey]}`;
    }
    return '/images/logo.png';
}

export default function Drivers() {
    const sortedDrivers = useMemo(() => {
        return [...STATIC_DRIVERS].sort((a, b) => {
            const teamCompare = a.team_name.localeCompare(b.team_name);
            if (teamCompare !== 0) return teamCompare;
            return a.driver_number - b.driver_number;
        });
    }, []);

    return (
        <div className="min-h-screen p-4 md:p-8 pt-24 pb-20">
            <header className="mb-12">
                <h1 className="text-6xl md:text-8xl font-bold uppercase italic tracking-tighter">
                    The <span className="text-f1-red">Grid</span>
                </h1>
                <p className="text-xl text-gray-400">{new Date().getFullYear()} Season Lineup</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {sortedDrivers.map((driver, index) => (
                    <motion.div
                        key={`${driver.driver_number}-${driver.team_name}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative h-[450px] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/30 transition-all duration-500"
                    >
                        <div className="absolute -right-4 -bottom-12 text-[10rem] font-bold text-white/5 font-mono select-none group-hover:text-white/10 transition-colors duration-500 leading-none">
                            {driver.driver_number}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        <img
                            src={getDriverImage(driver)}
                            alt={driver.full_name}
                            className={`absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ${['bortoleto', 'hulkenberg'].includes(driver.last_name.toLowerCase()) ? 'scale-125 origin-top' : ''
                                }`}
                        />

                        <div
                            className="absolute top-0 left-0 w-full h-1 z-30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                            style={{ backgroundColor: `#${driver.team_colour}` }}
                        />

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
