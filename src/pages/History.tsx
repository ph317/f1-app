import { motion } from 'framer-motion';

const eras = [
    { year: '1950s', title: 'The Beginning', desc: 'The first World Championship race was held at Silverstone. Giuseppe Farina became the first champion.' },
    { year: '1960s', title: 'The Golden Age', desc: 'Rear-engined cars revolutionized the sport. Jim Clark and Graham Hill were the stars.' },
    { year: '1970s', title: 'Winged Warriors', desc: 'Aerodynamics took center stage. The rivalry between Lauda and Hunt defined the decade.' },
    { year: '1980s', title: 'Turbo Era', desc: 'Massive horsepower and legendary battles between Senna and Prost.' },
    { year: '1990s', title: 'Tech Boom', desc: 'Active suspension and electronic aids. Schumacher began his dominance.' },
    { year: '2000s', title: 'V10 Symphony', desc: 'The screaming V10 engines and Ferrari dominance with Schumacher.' },
    { year: '2010s', title: 'Hybrid Era', desc: 'Introduction of turbo-hybrid power units. Mercedes dominance with Hamilton.' },
    { year: '2020s', title: 'New Regulations', desc: 'Ground effect returns. Verstappen and Red Bull set new records.' },
];

export default function History() {
    return (
        <div className="max-w-4xl mx-auto py-12">
            <header className="mb-20 text-center">
                <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-4">
                    Through the <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1-red to-orange-500">Decades</span>
                </h1>
                <p className="text-xl text-gray-400">75 Years of speed, danger, and glory.</p>
            </header>

            <div className="relative">
                {/* Central Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-f1-red via-white/20 to-transparent -translate-x-1/2" />

                {eras.map((era, index) => (
                    <motion.div
                        key={era.year}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative flex items-center justify-between mb-24 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                        {/* Content Card */}
                        <div className={`w-[45%] ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <h2 className="text-6xl font-bold text-white/10 absolute -top-10 left-0 right-0 pointer-events-none select-none">
                                    {era.year}
                                </h2>
                                <h3 className="text-3xl font-bold text-f1-red mb-2 relative z-10">{era.title}</h3>
                                <p className="text-gray-300 relative z-10">{era.desc}</p>
                            </div>
                        </div>

                        {/* Dot */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-f1-red rounded-full ring-4 ring-black" />

                        {/* Placeholder for Image/Media */}
                        <div className="w-[45%]" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
