import { ImageSourcePropType } from 'react-native';

export type ContestType = {
    id: number;
    title: string;
    description: string;
    img: ImageSourcePropType;
    isOver: boolean;
    winners?: string[]
}
