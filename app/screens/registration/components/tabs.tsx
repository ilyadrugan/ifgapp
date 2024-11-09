import { FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import React from 'react';

export interface TabInterface {
    id: number;
    name: string;
}

export const Tabs: FC<{
    tabs: TabInterface[],
    onTabClicked: (id: number)=> void,
    activeTab: number
 }> = ({
    tabs,
    onTabClicked,
    activeTab,
  }) => {

    useEffect(() => {

    }, [tabs]);

    return (<>
      <View style={s.tabsContainer}>
        {tabs && tabs.map((tab, index, arr)=>
            <TouchableOpacity key={index.toString()} onPress={()=>onTabClicked(tab.id)} style={[s.tab, index === 0 && s.firstTab, index === arr.length - 1 && s.lastTab]}>
                <IfgText color={tab.id === activeTab ? colors.WHITE_COLOR : colors.LIGHT_BORDER_COLOR}
                style={[gs.fontCaption2, {fontSize: 14}]}>
                {tab.name}
                </IfgText>
            </TouchableOpacity>
        )}
      </View>

    </>);
  };

const s = StyleSheet.create({
    tabsContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tab: {
      paddingVertical: 21,
      width: '33%',
      borderColor: colors.LIGHT_BORDER_COLOR,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    firstTab: {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderRightWidth: 0,
    },
    lastTab: {
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderLeftWidth: 0,
    },

  });
