export const serializeData = (data) => data.map(item => ({
    ...item,
    _id: item._id.toString()
}));

export const serializeSubService = (data) => data.map(item => ({
    ...item,
    _id: item._id.toString(),
    serviceId: item.serviceId.toString()
}));

export const serializeServiceRequest = (data) => data.map(item => ({
    ...item,
    _id: item._id.toString(),
    userId: item.userId.toString(),
    serviceId: item.serviceId?.toString(),
    subServiceId: item.subServiceId?.toString(),
    appliedDate: item.appliedDate.toISOString()
}));

export function formatDate(isoString) {
    const date = new Date(isoString);

    // Get day, month, and year
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });

    // Function to get the ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        const lastDigit = day % 10;
        return lastDigit === 1 ? 'st' : lastDigit === 2 ? 'nd' : lastDigit === 3 ? 'rd' : 'th';
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function truncateString(str) {
    return str.length > 20 ? str.slice(0, 35) + "..." : str;
}

export const arrangeDocs = (str) => {
    if (str.length === 0) return []
    let arr = str.split("||")
    return arr.map((item, index) => (
      <li key={index}>{item.trim()}.</li>
    ))
  }