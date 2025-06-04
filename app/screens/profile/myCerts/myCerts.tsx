import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import certsStore from '../../../../store/state/certsStore/certsStore';
import { View, StyleSheet } from 'react-native';
import gs from '../../../core/styles/global';
import { CardContainer } from '../../../core/components/card/cardContainer';
import colors from '../../../core/colors/colors';
import { CertModel } from '../../../../store/state/certsStore/models/models';
import { IfgText } from '../../../core/components/text/ifg-text';
import {getCertStatusByType} from '../../../core/utils/getCertStatus';
import { formatCertDate } from '../../../core/utils/formatDateTime';

export const MyCerts: FC = observer(() =>{

    useEffect(() => {
        certsStore.loadMoreCerts('page=1');
    }, []);

    const CardEvent: FC<CertModel> = (cert) => {
        const status = getCertStatusByType(cert.status);
        return <CardContainer style={{borderRadius: 22, gap: 24}}>
            <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]} >
                <IfgText style={[gs.fontCaptionMedium, gs.regular]}>
                    Действует до:
                </IfgText>
                <IfgText style={[gs.fontCaptionMedium, gs.regular]}>
                    {formatCertDate(cert.momentEnd)}
                </IfgText>
            </View>
            <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]} >
                <IfgText style={[gs.fontCaptionMedium]}>
                    {cert.certNumber}
                </IfgText>
                <View style={{backgroundColor: status?.bgColor, paddingHorizontal: 8, borderRadius: 4}}>
                    <IfgText style={gs.bold} color={colors.WHITE_COLOR}>
                        {status?.name}
                    </IfgText>
                </View>
            </View>
        </CardContainer>;
    };
    return certsStore.certsList.certs.map((cert, index)=><>
    <View key={index.toString()}>
        {CardEvent(cert)}
    </View>
    <View style={gs.mt16} />
    </>);
});

const s = StyleSheet.create({
    dateContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREEN_COLOR,
        height: 24,
        borderRadius: 6,
        paddingHorizontal: 8.5,
    },
    timeContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        height: 22,
        borderRadius: 6,
        paddingHorizontal: 6,
        gap: 4,
    },
    buttonResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        padding: 20,
        borderWidth: 1,
        borderColor: colors.GREEN_COLOR,
        borderRadius: 16,
    },
  });
