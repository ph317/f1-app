// Mappings for Circuit IDs to local images in public/images/
const CIRCUIT_FILE_MAP: Record<string, string> = {
    'bahrain': 'bahrain.avif',
    'jeddah': 'saudi.avif',
    'albert_park': 'australia.avif',
    'suzuka': 'japan.avif',
    'shanghai': 'china.avif',
    'miami': 'miami.avif',
    'imola': 'italy.avif', // Fallback/Best guess if specific Imola image missing
    'monaco': 'monaco.avif',
    'catalunya': 'spain.avif', // Using spain.avif matching file list
    'villeneuve': 'canada.avif',
    'red_bull_ring': 'austrian.avif',
    'silverstone': 'british.avif',
    'hungaroring': 'hungary.avif',
    'spa': 'belgium.avif',
    'zandvoort': 'dutch.avif',
    'monza': 'italy.avif',
    'baku': 'azerbaijan.avif',
    'marina_bay': 'singapore.avif',
    'americas': 'united states.avif',
    'rodriguez': 'mexico.avif',
    'interlagos': 'sao paulo.avif',
    'vegas': 'vegas.avif',
    'losail': 'qatar.avif',
    'yas_marina': 'abu dhabi.avif',
    'madring': 'spain.avif', // Madrid circuit uses spain.avif
};

const CIRCUIT_NAMES: Record<string, string> = {
    'bahrain': 'Bahrain',
    'jeddah': 'Jeddah',
    'albert_park': 'Australia',
    'suzuka': 'Japan',
    'shanghai': 'China',
    'miami': 'Miami',
    'imola': 'Imola',
    'monaco': 'Monaco',
    'catalunya': 'Spain',
    'villeneuve': 'Canada',
    'red_bull_ring': 'Austria',
    'silverstone': 'Silverstone',
    'hungaroring': 'Hungary',
    'spa': 'Spa-Francorchamps',
    'zandvoort': 'Netherlands',
    'monza': 'Monza',
    'baku': 'Azerbaijan',
    'marina_bay': 'Singapore',
    'americas': 'Austin',
    'rodriguez': 'Mexico',
    'interlagos': 'Brazil',
    'las_vegas': 'Las Vegas',
    'losail': 'Qatar',
    'yas_marina': 'Abu Dhabi',
    'madring': 'Madrid',
};

export function getCircuitImageUrl(circuitId: string): string {
    const normalizedId = circuitId.toLowerCase();

    // Check for local file mapping
    if (CIRCUIT_FILE_MAP[normalizedId]) {
        return `/images/${CIRCUIT_FILE_MAP[normalizedId]}`;
    }

    // Fallback: Use placehold.co if no local image found
    const name = CIRCUIT_NAMES[normalizedId] || circuitId;
    return `https://placehold.co/600x400/15151E/FFFFFF/png?text=${encodeURIComponent(name)}`;
}
