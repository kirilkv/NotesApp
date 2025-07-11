export function formatUTCDateToLocalTimeZone(
    utcDateString: string,
    timeZone: string = 'America/Toronto',
    locale: string = 'en-CA'
): string {
    const sanitized = utcDateString.includes('Z') ? utcDateString : `${utcDateString}Z`;
    const date = new Date(sanitized);

    return date.toLocaleString(locale, {
        timeZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}
