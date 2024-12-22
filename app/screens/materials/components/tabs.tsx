import React, { FC, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';


export interface TabInterface {
    id: number;
    name: string;
}

    export const TabsMaterials: FC<{
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
                <TouchableOpacity key={index.toString() + 't'} onPress={()=>onTabClicked(tab.id)} style={[tab.id === activeTab && {backgroundColor: 'rgba(255, 255, 255, 0.35)'},s.tab, index === 0 && s.firstTab, index === arr.length - 1 && s.lastTab]}>
                    <IfgText color={tab.id === activeTab ? colors.PLACEHOLDER_COLOR : '#3737375a'}
                    style={[gs.fontCaption2]}>
                    {tab.name}
                    </IfgText>
                </TouchableOpacity>
            )}
          </View>

        </>);
      };

    const s = StyleSheet.create({
        tabsContainer:{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        tab: {
          paddingVertical: 15,
          width: '50%',
          borderColor: '#E4E4E4',
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
            // borderLeftWidth: 0,
        },

      });
