function diffInDays(date1: Date, date2: Date) {
  return Math.floor(
    (Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) -
      Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())) /
    (1000 * 60 * 60 * 24)
  );
}

function areDatesInSameWeek(date1: Date, date2: Date) {
  return diffInDays(date1, date2) <= 7;
}

function isYesterday(date: Date) {
  return diffInDays(new Date(), date) === 1;
}

function isToday(date: Date) {
  return diffInDays(new Date(), date) <= 0;
}

export function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(date: Date) {
  const today = new Date();

  if (!areDatesInSameWeek(date, today)) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

export function formatLastMessageAt(date: Date) {
  const today = new Date();

  if (!areDatesInSameWeek(date, today)) {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  }

  if (isToday(date)) {
    return formatTime(date);
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long'
  });
}

export function formatDateTime(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
