/**
 * Formats a 24-hour time number to 12-hour format with AM/PM
 * @param hour - Hour in 24-hour format (0-23)
 * @returns Formatted time string (e.g., "12 AM", "2 PM")
 */
export function formatTime(hour: number): string {
    if (hour === new Date().getHours()) return "Now";
  
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${displayHour}${period}`;
  }