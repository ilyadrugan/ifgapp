export const getCertStatusByType = (type: string) => {
    switch (type){
        case 'SUCCESS':
            return {name: 'Активно', bgColor: 'rgb(25, 135, 84)'};
        case 'BLOCK':
            return {name: 'Истёк', bgColor: 'rgb(185, 15, 15)'};
    }
};
