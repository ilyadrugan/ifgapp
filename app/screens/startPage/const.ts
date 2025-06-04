import { NavigatorCardType } from './components/navigator-card';
type MediaModel = {
    id: number,
    full_path: string[]
}
export type ArticleModel = {
    title: string,
    subtitle: string,
    type: string,
    id: number,
    image: string
}
export const NavigationCards: NavigatorCardType[] = [
    {
        icon: 'fish',
        title: 'План питания',
        image: '/images/8b67a5e3f52178fe9aa0e9f647320b41.png',
        desc: 'Ваш персональный план питания на месяц. Составлен с учетом ваших целей и включает в себя рецепты и список необходимых продуктов.',
        buttonText: 'Перейти к плану',
        buttonLink: 'https://t.me/planpohudeniya_ifg_bot',
        bgColor: 'rgb(84, 182, 118)',
    },
    {
        icon: 'runningman',
        title: 'Программа тренировок',
        image: '/images/c9616b6b95ebc4c00fd44c45cdb1edb2.png',
        desc: 'Видеотренировки для разных групп мышц, физической подготовки и целей. Получите персональные рекомендации в тестировании или выбирайте комфортные комплексы.',
        buttonText: 'Перейти к тренировкам',
        buttonLink: '/articles/fizicheskaya-aktivnost/kompleksi-uprazhneniy',
        bgColor: 'rgb(108, 175, 255)',
    },
    {
        icon: 'meditate',
        title: 'ifg-помощник',
        image: '/images/Group%2014892.png',
        desc: 'Поможем разобраться как пользоваться платформой чтобы получить максимум пользы для вашего здоровья',
        buttonText: 'Перейти к помощнику',
        buttonLink: 'tel:88007003531',
        bgColor: 'rgb(195, 225, 84)',
    },
    {
        icon: 'moon',
        title: 'База знаний',
        image: '/images/109edb397eae72a1e2115221160498b3.png',
        desc: 'Более 500 экспертных материалов, статей и интервью о здоровом образе жизни, питании, тренировках и борьбе со стрессом. Найдите ответы на все ваши вопросы!',
        buttonText: 'Перейти к базе знаний ',
        buttonLink: '/articles',
        bgColor: 'rgb(255, 172, 68)',
    },
    // {
    //     icon: '/images/fluent_food-fish-24-regular.svg',
    //     title: 'План питания',
    //     image: '/images/8b67a5e3f52178fe9aa0e9f647320b41.png',
    //     desc: 'Ваш персональный план питания на месяц. Составлен с учетом ваших целей и включает в себя рецепты и список необходимых продуктов.',
    //     buttonText: 'Перейти к базе знаний',
    //     buttonLink: '/articles',
    //     bgColor: 'rgb(84, 182, 118)'
    // },
    // {
    //     icon: '/images/fluent_food-fish-24-regular.svg',
    //     title: 'План питания',
    //     image: '/images/8b67a5e3f52178fe9aa0e9f647320b41.png',
    //     desc: 'Ваш персональный план питания на месяц. Составлен с учетом ваших целей и включает в себя рецепты и список необходимых продуктов.',
    //     buttonText: 'Перейти к плану ',
    //     buttonLink: 'https://t.me/planpohudeniya_ifg_bot',
    //     bgColor: 'rgb(84, 182, 118)'
    // },
    // {
    //     icon: '/images/fluent_food-fish-24-regular.svg',
    //     title: 'План питания',
    //     image: '/images/8b67a5e3f52178fe9aa0e9f647320b41.png',
    //     desc: 'Ваш персональный план питания на месяц. Составлен с учетом ваших целей и включает в себя рецепты и список необходимых продуктов.',
    //     buttonText: 'Перейти к плану ',
    //     buttonLink: 'https://t.me/planpohudeniya_ifg_bot',
    //     bgColor: 'rgb(84, 182, 118)'
    // },

];

export const MaterialsStart: ArticleModel[] = [
    {
        id: 29,
        title: 'Можно ли изменить образ жизни?',
        subtitle: 'О мотивации и привычках от эксперта',
        type: 'verified_science',
        image: '/storage_resize/storage/library/lg4kfE8ZqhPPhwq20.73Мб/full/x0th5wVKzYhYXPiK.png',
    },
    {
        id: 53,
        title: '10 лучших советов для улучшения сна',
        subtitle: 'Простые практики, которые помогут легче засыпать и просыпаться',
        type: 'verified_researcher',
        image: '/storage_resize/storage/library/MYPwX9DWaaettJmr0.11Мб/full/alrlGtzFHNUCxZRw.jpg',
    },

    {
        id: 54,
        title: '10 лучших советов для правильного питания',
        subtitle: 'Простые практики, которые помогут сделать питание полезным и здоровым',
        type: 'verified_researcher',
        image: '/storage_resize/storage/library/DNMfIX9yGmOO1UMe0.23Мб/full/QVdzCuMxlmlOVuyn.jpg',
    },

    {
        id: 62,
        title: '10 проверенных советов по физической активности',
        subtitle: 'Простые советы, которые помогут начать и продолжить заниматься спортом',
        type: 'verified_researcher',
        image: '/storage_resize/storage/library/Y5qrRVVphiSmiURI0.11Мб/full/Wyuhbt84mndkLJA2.jpg',
    },
    {
        id: 65,
        title: '10 лучших советов для снижения стресса',
        subtitle: 'Простые практики, которые помогут восстановить энергию и отдохнуть',
        type: 'verified_researcher',
        image: '/storage_resize/storage/library/CXlxG1KOIYKt2j6T0.08Мб/full/1CsYtg3mOR1onT8w.jpg',
    },
    {
        id: 122,
        title: 'Что такое комплексный подход и чем он лучше?',
        subtitle: 'Почему одновременно важны питание, сон, физическая нагрузка и антистресс-практики',
        type: 'verified_science',
        image: '/storage_resize/storage/library/SSYXGWBRVeshoBOC0.11Мб/full/N4daQTXofDVREbdL.jpg',
    },
    {
        id: 130,
        title: 'Используем ЗОЖ-календарь правильно',
        subtitle: 'Правильный подход к улучшению своего здоровья',
        type: 'verified_science',
        image: '/storage_resize/storage/library/VCRIvDHfwIK8oEcT0.1Мб/full/n2SvdMsXHtR64VEm.jpg',
    },
    {
        id: 262,
        title: 'Основные принципы похудения: что влияет на наш вес и как привести себя в форму',
        subtitle: 'Вы хотите похудеть, иметь прекрасную форму и при этом получать удовольствие от жизни? Пробовали диеты, но они не помогли? Пора подойти к вопросу комплексно вместе с ifeelgood!',
        type: 'verified_researcher',
        image: '/storage_resize/storage/library/xIqCoJbIzOJ8Kake3.18Мб/full/l6FIwIbsoCQGoNo1.jpg',
    },
];
