import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function parseDate(dateString: string) {
  // Use a regular expression to extract the timestamp
  const match = dateString.match(/\/Date\((\d+)([+-]\d{4})?\)\//);
  if (!match) {
    throw new Error('Invalid date format');
  }

  // Parse the timestamp (milliseconds since Unix epoch)
  const timestamp = parseInt(match[1], 10);

  // Create and return a Date object
  return new Date(timestamp);
}

// Function to format a Date object as "Jul 4, 1996"
function formatDate(date: Date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = months[date.getMonth()]; // Get the month abbreviation
  const day = date.getDate(); // Get the day of the month
  const year = date.getFullYear(); // Get the full year

  return `${month} ${day}, ${year}`;
}

export const getDateFormat = (dateString: string) => {
  const date = parseDate(dateString); // Parse into a Date object
  return formatDate(date);
};
