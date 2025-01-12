export const RecommendationCategoryToEng = (category: string) => {
    switch(category){
        case 'Питание':
         return 'food';
        case 'Антистресс':
         return 'stress';
        case 'Сон':
         return 'sleep';
        case 'Физическая активность':
         return 'phisical_activity';
        default:
         return '';
    }
};

export const RecommendationCategoryToRu = (category: string) => {
    switch(category){
        case 'food':
         return 'Питание';
        case 'stress':
         return 'Антистресс';
        case 'sleep':
         return 'Сон';
        case 'phisical_activity':
         return 'Активность';
        default:
         return '';
    }
};
