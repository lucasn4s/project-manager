export const convertDateToISO = (date) => {
    const [day, month, year] = date.split('/');

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const convertISODateToBR = (isoDate) => {
    const date = new Date(`${isoDate.split('T')[0]}T12:00:00.000Z`);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
