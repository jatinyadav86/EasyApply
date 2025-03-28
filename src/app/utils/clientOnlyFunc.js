export const formatDate2 = (dateStr) => {
    if (!dateStr) return "";   // Handle empty values

    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
};

export const formatDate = (dateStr) => {
    if (!dateStr) return "";   // Handle empty values

    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
};

export function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}