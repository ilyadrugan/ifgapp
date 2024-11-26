import colors from '../../../core/colors/colors';

export const BalanceLevel = {
    'Питание' : {
        'level': 12,
        'color': colors.GREEN_COLOR,
    },
    'Антистресс' : {
        'level': 60,
        'color': colors.OLIVE_COLOR,
    },
    'Сон' : {
        'level': 40,
        'color': colors.ORANGE_COLOR,
    },
    'Активность' : {
        'level': 8,
        'color': colors.PINK_COLOR,
    },
};

export const ActivityStats = {
    'Шаги' : {
        'value': 10567,
        'standart_value': 30000,
        'color': colors.GREEN_COLOR,

    },
    'Калории' : {
        'value': 35,
        'standart_value': 65,
        'color': colors.OLIVE_COLOR,
    },
    'Пролеты' : {
        'value': 20,
        'standart_value': 100,
        'color': colors.ORANGE_COLOR,
    },
};

export const Stories = [
    {
        id: 0,
        borderColor: '#835CC2',
        bgColor: '#f0e8f3',
        title: 'Хочу правильно питаться',
    },
    {
        id: 1,
        borderColor: '#FFAC44',
        bgColor: '#f3eee8',
        title: 'Хочу больше двигаться',
    },
    {
        id: 2,
        borderColor: '#5C9DC2',
        bgColor: '#e9eef4',
        title: 'Хочу высыпаться',
    },
];
