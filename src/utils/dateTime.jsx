export function getAgoDateFormatted(daysAgo) {
    let fromDate;
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - daysAgo);
    fromDate = sevenDaysAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    return fromDate
}

export function getTodayDateFormatted() {
    const today = new Date()
    const formatted = today.toISOString().split('T')[0]
    return formatted
}
