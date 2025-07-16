export const convertMealTypeToRu = (type: string) => {
    switch (type) {
        case 'breakfast': return 'Завтрак';
        case 'lunch': return 'Обед';
        case 'dinner': return 'Ужин';
        case 'snack': return 'Перекус';
    }
};

export const convertMealTypeToENG = (type: string) => {
    switch (type) {
        case 'Завтрак': return 'breakfast';
        case 'Обед': return 'lunch';
        case 'Ужин': return 'dinner';
        case 'Перекус': return 'snack';
    }
};
