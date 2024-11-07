import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import gs from '../../styles/global';


export interface TabInterface {
  id: number;
  active: boolean;
  name: string;
}

export const Tab: FC<{
  tab: TabInterface,
  onTabClick?: (tab: TabInterface) => void
}> = ({
  tab,
  onTabClick,
}) => {
  return (<>
    {tab &&
    <View style={s.tab}>
      <View style={[s.tabName, tab.active && s.tabNameActive]}>
        {/* <DirText key={tab.id} onPress={() => onTabClick && onTabClick(tab)} style={[tab.active && gs.h4]}>
          {tab.name}
        </DirText>    */}
      </View>
    </View>
    }
  </>);
};

const s = StyleSheet.create({
  container:{

  },
  tab: {
    paddingHorizontal: 18,
  },
  tabName: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabNameActive: {
    borderBottomColor: theme.GREEN_LOGO_COLOR,
  },
});

