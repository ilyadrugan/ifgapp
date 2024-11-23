

export const hashTags = [
    {
        id: 0,
        name: '#хороший сон',
    },
    {
        id: 1,
        name: '#Как быть здоровым?',
    },
    {
        id: 2,
        name: '#Займемся спортом',
    },
    {
        id: 3,
        name: '#полезные девайсы',
    },
];

export const switchs = [
    {
        id: 0,
        name: 'Актуальные',
    },
    {
        id: 1,
        name: 'Будущие',
    },
];


export interface InterViewType {
    id: number,
    person: string,
    title: string,
    img?: string
}

export const interViews = [
    {
        id: 0,
        person: 'Дима Зицер',
        title: 'Как мотивировать ребенка заниматься своим здоровьем?',
        img: require('../../../../assets/backgrounds/interviewExample.png'),
    },
    {
        id: 1,
        person: 'Яна Пешкова',
        title: '7 простых шагов к хорошему самочувствию',
        img: require('../../../../assets/backgrounds/interviewExample2.png'),
    },
    {
        id: 2,
        person: 'Дима Зицер',
        title: 'Как мотивировать ребенка заниматься своим здоровьем?',
        img: require('../../../../assets/backgrounds/interviewExample.png'),
    },
    {
        id: 3,
        person: 'Яна Пешкова',
        title: '7 простых шагов к хорошему самочувствию',
        img: require('../../../../assets/backgrounds/interviewExample2.png'),
    },
    {
        id: 4,
        person: 'Дима Зицер',
        title: 'Как мотивировать ребенка заниматься своим здоровьем?',
        img: require('../../../../assets/backgrounds/interviewExample.png'),
    },
    {
        id: 5,
        person: 'Яна Пешкова',
        title: '7 простых шагов к хорошему самочувствию',
        img: require('../../../../assets/backgrounds/interviewExample2.png'),
    },
];
