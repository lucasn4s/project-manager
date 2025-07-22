export default (value, [minDate]) => {
    if (!value) {
        return 'Selecione uma data válida';
    }

    const [valueDay, valueMonth, valueYear] = value.split('/');
    const [minValueDay, minValueMonth, minValueYear] = minDate.split('/');
    const dateValue = new Date(valueYear, valueMonth - 1, valueDay);
    const dateMin = new Date(minValueYear, minValueMonth - 1, minValueDay);

    if (isNaN(dateValue.getTime()) || isNaN(dateMin.getTime())) {
        return 'Selecione uma data válida';
    }

    if (dateMin > dateValue) {
        return `A data não pode ser anterior a ${dateMin.toLocaleDateString('pt-BR')}`;
    }

    return true;
};
