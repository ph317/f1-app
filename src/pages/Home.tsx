import { useEffect, useState, Suspense, lazy } from 'react';
import { BentoGrid, BentoItem } from '@/components/ui/BentoGrid';
import { ChevronRight, Trophy, Flag, Timer, Map as MapIcon, Calendar, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDriverStandings, getConstructorStandings, getSchedule, getLatestNews, type Standing, type NewsItem } from '@/api';
import { getCircuitImageUrl } from '@/utils/circuitImages';
import { formatToEST } from '@/utils/dateUtils';

// Lazy load the 3D scene to avoid initial load block
const Scene = lazy(() => import('@/components/3d/Scene'));

export default function Home() {
    const [topDriver, setTopDriver] = useState<Standing | null>(null);
    const [topTeam, setTopTeam] = useState<any | null>(null);
    const [nextRace, setNextRace] = useState<any | null>(null);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isNewsLoading, setIsNewsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const drivers = await getDriverStandings();
            if (drivers.length > 0) setTopDriver(drivers[0]);

            const teams = await getConstructorStandings();
            if (teams.length > 0) setTopTeam(teams[0]);

            const schedule = await getSchedule();
            const now = new Date();
            // Find the first race that is in the future
            const upcoming = schedule.find((race: any) => new Date(race.date) > now);
            setNextRace(upcoming || schedule[0]);

            setIsNewsLoading(true);
            const latestNews = await getLatestNews();
            setNews(latestNews.slice(0, 6)); // Top 6 news items
            setIsNewsLoading(false);
        }
        load();
    }, []);

    return (
        <div className="relative min-h-screen no-scrollbar">
            {/* 3D Cinematic Background */}
            <Suspense fallback={<div className="fixed inset-0 bg-zinc-950 z-0" />}>
                <Scene />
            </Suspense>

            <div className="relative z-10 p-4 md:p-8 pt-12">
                <header className="flex flex-col items-center justify-center gap-4 mb-8 mt-2">
                    <div className="relative">
                        <img
                            src="/images/logo.png"
                            alt="F1 Logo"
                            className="h-16 md:h-20 object-contain drop-shadow-[0_0_40px_rgba(225,6,0,0.8)]"
                        />
                    </div>
                </header>

                <BentoGrid>
                    {/* Featured: Next Race */}
                    <BentoItem colSpan={2} rowSpan={2} className="group relative overflow-hidden flex flex-col p-0 border-white/20 shadow-2xl">
                        {/* Top: Circuit Map Section */}
                        <div className="relative flex-grow bg-white/5 backdrop-blur-md flex items-center justify-center p-6 overflow-hidden min-h-[140px]">
                            {nextRace && nextRace.Circuit && (
                                <img
                                    src={getCircuitImageUrl(nextRace.Circuit.circuitId)}
                                    alt={nextRace.Circuit.circuitName}
                                    className={`w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-700 ${nextRace.Circuit.circuitId === 'bahrain' ? '' : 'invert opacity-80'
                                        }`}
                                />
                            )}
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 z-20">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Upcoming Race</span>
                            </div>
                        </div>

                        {/* Bottom: Info Section */}
                        <div className="bg-white/5 backdrop-blur-xl p-6 border-t border-white/10 relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2 leading-none text-white italic">
                                {nextRace ? nextRace.raceName : 'Loading...'}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4 text-sm mt-3">
                                <span className="font-mono font-bold bg-f1-red px-3 py-1 rounded text-white shadow-[0_0_15px_rgba(225,6,0,0.4)]">
                                    {nextRace ? new Date(nextRace.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '---'}
                                </span>
                                <span className="flex items-center gap-1.5 text-gray-300 font-medium">
                                    <Timer size={16} className="text-f1-red" />
                                    {nextRace ? formatToEST(nextRace.date, nextRace.time) : '--:--'} EST
                                </span>
                                <span className="flex items-center gap-1.5 text-gray-300 font-medium">
                                    <MapIcon size={16} className="text-f1-red" />
                                    {nextRace ? nextRace.Circuit.Location.locality : '---'}
                                </span>
                            </div>
                        </div>
                    </BentoItem>

                    {/* Current Leader */}
                    <BentoItem colSpan={1} className=""> {/* Removed bg-zinc-900 for glass effect */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Trophy size={80} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-bold">World Champion</h3>
                            <div>
                                <div className="text-4xl font-bold text-f1-red mb-1">{topDriver ? topDriver.position : '1'}</div>
                                <p className="text-lg font-bold leading-tight">{topDriver ? `${topDriver.Driver.givenName} ${topDriver.Driver.familyName}` : 'Max Verstappen'}</p>
                                <p className="text-xs text-gray-500 mt-1">{topDriver ? topDriver.Constructors[0].name : 'Red Bull Racing'}</p>
                            </div>
                        </div>
                    </BentoItem>

                    {/* Constructor Leader */}
                    <BentoItem colSpan={1} className=""> {/* Removed bg-zinc-800 for glass effect */}
                        <div className="h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xs text-gray-400 uppercase tracking-wider font-bold">Constructors</h3>
                                <Flag className="text-f1-red" size={20} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold leading-tight">{topTeam ? topTeam.Constructor.name : 'Red Bull'}</h4>
                                <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                                    <div className="bg-f1-red w-[80%] h-full" />
                                </div>
                                <p className="text-right text-[10px] text-gray-400 mt-1">{topTeam ? `${topTeam.points} PTS` : '450 PTS'}</p>
                            </div>
                        </div>
                    </BentoItem>

                    {/* Latest News */}
                    <BentoItem colSpan={2} rowSpan={2} className="relative p-0 flex flex-col group overflow-hidden border-white/10">
                        {/* News Feed Content */}
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">Global Feed</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[8px] font-bold text-f1-red uppercase tracking-tighter">Live</span>
                                    <Activity size={14} className="text-f1-red animate-pulse" />
                                </div>
                            </div>

                            <div className="flex-grow p-4 overflow-y-auto glass-scrollbar scroll-smooth max-h-[380px]">
                                {isNewsLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-3 opacity-50">
                                        <Activity size={24} className="animate-spin text-f1-red" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Fetching Latest...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {news.map((item, index) => {
                                            const cleanDesc = (item.description || '')
                                                .replace(/<[^>]*>?/gm, '')
                                                .replace(/&nbsp;/g, ' ')
                                                .trim();

                                            if (!item.title) return null;

                                            return (
                                                <div key={index}>
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="group/news block cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-[10px] font-bold uppercase text-f1-red tracking-wider">
                                                                {item.category || 'News'}
                                                            </span>
                                                            <span className="text-[10px] text-gray-500 font-mono">
                                                                • {new Date(item.pubDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-sm font-bold leading-tight group-hover/news:text-f1-red transition-colors italic">
                                                            {item.title}
                                                        </h4>
                                                        {cleanDesc && (
                                                            <p className="text-[11px] text-gray-400 line-clamp-2 mt-2 leading-relaxed opacity-80 group-hover/news:opacity-100 transition-opacity">
                                                                {cleanDesc.slice(0, 120)}...
                                                            </p>
                                                        )}
                                                    </a>
                                                    {index < news.length - 1 && <div className="h-px bg-white/10 mt-6" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <a
                                href="https://www.formula1.com/en/latest/all"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-auto p-4 border-t border-white/10 flex items-center justify-between text-f1-red hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-[0.2em] group/link bg-white/5 backdrop-blur-md sticky bottom-0"
                            >
                                Full Feed on F1.com
                                <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </BentoItem>

                    {/* Navigation Shortcut: Tracks */}
                    <BentoItem className="group cursor-pointer hover:bg-white/10" delay={0.2}>
                        <Link to="/tracks" className="flex flex-col items-center justify-center h-full gap-3">
                            <div className="p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                                <MapIcon size={24} />
                            </div>
                            <span className="font-bold uppercase tracking-widest text-[10px]">Explore Tracks</span>
                        </Link>
                    </BentoItem>

                    {/* Navigation Shortcut: Schedule */}
                    <BentoItem className="group cursor-pointer hover:bg-white/10" delay={0.3}>
                        <Link to="/schedule" className="flex flex-col items-center justify-center h-full gap-3">
                            <div className="p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                                <Calendar size={24} />
                            </div>
                            <span className="font-bold uppercase tracking-widest text-[10px]">Full Calendar</span>
                        </Link>
                    </BentoItem>

                </BentoGrid>
            </div>
        </div>
    );
}
