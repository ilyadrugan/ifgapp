import React from 'react';
import Events from '../../../../assets/icons/menuOptions/events';
import EventsActive from '../../../../assets/icons/menuOptions/eventsActive';
import Exit from '../../../../assets/icons/menuOptions/exit';
import Materials from '../../../../assets/icons/menuOptions/materials';
import MaterialsActive from '../../../../assets/icons/menuOptions/materialsActive';
import Tests from '../../../../assets/icons/menuOptions/tests';
import TestsActive from '../../../../assets/icons/menuOptions/testsActive';
import Settings from '../../../../assets/icons/menuOptions/settings';
import SettingsActive from '../../../../assets/icons/menuOptions/settingsActive';
import Subscription from '../../../../assets/icons/menuOptions/subscription';
import SubscriptionActive from '../../../../assets/icons/menuOptions/subscriptionActive';

const Icon = (icon: string, active?: boolean) => {
    switch (icon){
        case 'events': {
            return active ? <EventsActive/> : <Events/>;
        }
        case 'tests':{
            return active ? <TestsActive/> : <Tests/>;
        }
        case 'materials':{
            return active ? <MaterialsActive/> : <Materials/>;
        }
        case 'settings':{
            return active ? <SettingsActive/> : <Settings/>;
        }
        case 'subscription':{
            return active ? <SubscriptionActive/> : <Subscription/>;
        }
        case 'exit':{
            return <Exit/>;
        }
    }
};

export const menuOptions = [
    {
        id: 0,
        name: 'Мои события',
        icon: Icon('events'),
        iconActive: Icon('events', true),
    },
    {
        id: 1,
        name: 'Мои тесты',
        icon: Icon('tests'),
        iconActive: Icon('tests', true),
    },
    {
        id: 2,
        name: 'Мои материалы',
        icon: Icon('materials'),
        iconActive: Icon('materials', true),
    },
    {
        id: 3,
        name: 'Настройки',
        icon: Icon('settings'),
        iconActive: Icon('settings', true),
    },
    {
        id: 4,
        name: 'Подписка',
        icon: Icon('subscription'),
        iconActive: Icon('subscription', true),
    },
    {
        id: 5,
        name: 'Выйти',
        icon: Icon('exit'),
        iconActive: Icon('exit', true),
    },
];
