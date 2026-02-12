export interface Driver {
    meeting_key: number;
    session_key: number;
    driver_number: number;
    broadcast_name: string;
    full_name: string;
    name_acronym: string;
    team_name: string;
    team_colour: string;
    first_name: string;
    last_name: string;
    headshot_url: string | null;
    country_code: string | null;
}

export interface Standing {
    position: string;
    points: string;
    wins: string;
    Driver: {
        driverId: string;
        permanentNumber: string;
        code: string;
        givenName: string;
        familyName: string;
        nationality: string;
    };
    Constructors: {
        constructorId: string;
        name: string;
        nationality: string;
    }[];
}

export interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    description: string;
    thumbnail: string;
    category?: string;
}

const OPENF1_API = 'https://api.openf1.org/v1';
// Dynamic year calculation
const CURRENT_YEAR = new Date().getFullYear();
const PREVIOUS_YEAR = CURRENT_YEAR - 1;
const JOLPICA_API_PREVIOUS = `https://api.jolpi.ca/ergast/f1/${PREVIOUS_YEAR}`;
const JOLPICA_API_CURRENT = `https://api.jolpi.ca/ergast/f1/${CURRENT_YEAR}`;
const RSS_TO_JSON_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';
const NEWS_FEED_URL = 'https://www.autosport.com/rss/f1/news/';

export async function getLatestNews(): Promise<NewsItem[]> {
    try {
        const response = await fetch(`${RSS_TO_JSON_PROXY}${encodeURIComponent(NEWS_FEED_URL)}`);
        const data = await response.json();
        if (data.status === 'ok') {
            return data.items.map((item: any) => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                content: item.content,
                description: item.description,
                thumbnail: item.thumbnail,
                category: item.categories[0] || 'Formula 1'
            }));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}

export async function getDrivers(): Promise<Driver[]> {
    try {
        // Fetch drivers from the latest session to get the current grid
        const response = await fetch(`${OPENF1_API}/drivers?session_key=latest`);
        const data = await response.json();

        // Filter out duplicates (sometimes drivers appear multiple times in a session)
        const uniqueDrivers = Array.from(new Map(data.map((item: Driver) => [item.driver_number, item])).values());
        return uniqueDrivers as Driver[];
    } catch (error) {
        console.error("Failed to fetch drivers:", error);
        return [];
    }
}

// Fetch previous year's final standings (for displaying last season's champions)
export async function getDriverStandings(): Promise<Standing[]> {
    try {
        const response = await fetch(`${JOLPICA_API_PREVIOUS}/driverStandings.json`);
        const data = await response.json();
        return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    } catch (error) {
        console.error("Failed to fetch standings:", error);
        return [];
    }
}

// Fetch previous year's final constructor standings (for displaying last season's champions)
export async function getConstructorStandings() {
    try {
        const response = await fetch(`${JOLPICA_API_PREVIOUS}/constructorStandings.json`);
        const data = await response.json();
        return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
    } catch (error) {
        console.error("Failed to fetch constructor standings:", error);
        return [];
    }
}

// Fetch current year's race schedule
export async function getSchedule() {
    try {
        const response = await fetch(`${JOLPICA_API_CURRENT}.json`);
        const data = await response.json();
        return data.MRData.RaceTable.Races || [];
    } catch (error) {
        console.error("Failed to fetch schedule:", error);
        return [];
    }
}

export async function getCircuits() {
    try {
        const response = await fetch(`${JOLPICA_API_CURRENT}/circuits.json?limit=100`);
        const data = await response.json();
        return data.MRData.CircuitTable.Circuits || [];
    } catch (error) {
        console.error("Failed to fetch circuits:", error);
        return [];
    }
}
