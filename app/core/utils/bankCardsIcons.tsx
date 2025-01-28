import Visa from '../../../assets/icons/visa.svg';
import Mastercard from '../../../assets/icons/mastercard.svg';
import Mir from '../../../assets/icons/mir.svg';
import CreditCard from '../../../assets/icons/credit-card.svg';
import React from 'react';

export const LogoBankCard = (card_type: string) => {
    switch (card_type) {
        case 'Visa':
            return <Visa />;
        case 'MasterCard':
            return <Mastercard />;
        case 'Mir':
            return <Mir />;
        default:
            return <CreditCard />;
    }
};
