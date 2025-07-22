export default (value, [maxDate]) => {
    if (!value) {
        return 'Selecione uma data válida';
    }

    const [valueDay, valueMonth, valueYear] = value.split('/');
    const [maxValueDay, maxValueMonth, maxValueYear] = maxDate.split('/');
    const dateValue = new Date(valueYear, valueMonth - 1, valueDay);
    const dateMax = new Date(maxValueYear, maxValueMonth - 1, maxValueDay);

    if (isNaN(dateValue.getTime()) || isNaN(dateMax.getTime())) {
        return 'Selecione uma data válida';
    }

    if (dateValue > dateMax) {
        return `A data não pode ser posterior a ${dateMax.toLocaleDateString('pt-BR')}`;
    }

    return true;
};
