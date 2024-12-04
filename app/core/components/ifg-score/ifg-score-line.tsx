import React, {FC} from 'react';
import { View } from 'react-native';
import { ProgressBar } from '../../../screens/ifg-home/components/progressBar';
import colors from '../../colors/colors';
import gs from '../../styles/global';
import { IfgText } from '../text/ifg-text';


export const IFGScoreLine: FC<{score: number, title: string}> = ({score, title}) => <>
        <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
        <IfgText style={[gs.fontCaption2, gs.bold]}>{title}</IfgText>
        <IfgText color={colors.GREEN_COLOR} style={[gs.fontCaption, gs.bold]}>{score}</IfgText>
        </View>
        <ProgressBar color={colors.GREEN_LIGHT_COLOR} width={score} unfilledColor="#EDEDED" />
    </>;
