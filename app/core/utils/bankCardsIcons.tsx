import Visa from '../../../assets/icons/visa.svg';
import Mastercard from '../../../assets/icons/mastercard.svg';
import React from 'react';

export const LogoBankCard = (card_type: string) => {
    switch (card_type) {
        case 'Visa':
            return <Visa />;
        case 'MasterCard':
            return <Mastercard />;
    }
};
