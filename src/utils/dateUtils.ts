export function formatToEST(dateStr: string, timeStr: string): string {
    try {
        // Construct UTC date string
        // API format: date: "2026-03-08", time: "04:00:00Z" (sometimes with Z, sometimes without)
        const utcString = `${dateStr}T${timeStr.includes('Z') ? timeStr : timeStr + 'Z'}`;
        const date = new Date(utcString);

        return date.toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error("Error formatting date to EST:", error);
        return timeStr.slice(0, 5) + " GMT";
    }
}
