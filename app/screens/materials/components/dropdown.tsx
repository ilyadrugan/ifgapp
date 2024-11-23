import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import Open from '../../../../assets/icons/open-up.svg';

// Активируем LayoutAnimation для Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DropdownBlock = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const [sortOption, setSortOption] = useState('По популярности');
  const [themeOption, setThemeOption] = useState('Мотивация');

  const sortOptions = ['По популярности', 'По новизне', 'По алфавиту'];
  const themeOptions = ['Мотивация', 'Фитнес', 'Продуктивность'];

  const scaleSortY = useRef(new Animated.Value(-1)).current; // Начальное значение без зеркалирования
  const scaleThemeY = useRef(new Animated.Value(-1)).current; // Начальное значение без зеркалирования

  const toggleSortDropdown = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    scaleThemeY.setValue(-1);
    setThemeOpen(false);
    setSortOpen(!sortOpen);
    Animated.timing(scaleSortY, {
      toValue: sortOpen ? -1 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    // if (!sortOpen) {
    //   Animated.timing(scaleSortY, {
    //     toValue: 1,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // } else {
    //   Animated.timing(scaleSortY, {
    //     toValue: -1,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // }
  };

  const toggleThemeDropdown = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSortOpen(false);
    scaleSortY.setValue(-1);
    setThemeOpen(!themeOpen);
    Animated.timing(scaleThemeY, {
      toValue: themeOpen ? -1 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    // if (!themeOpen) {
    //   setThemeOpen(!themeOpen);
    //   Animated.timing(scaleThemeY, {
    //     toValue: themeOpen? -1 : 1,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // } else {
    //   Animated.timing(scaleThemeY, {
    //     toValue: -1,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // }
  };

  const renderOption = (option, onSelect, type) => (
    <TouchableOpacity
      key={option}
      onPress={() => {
        onSelect(option);
        switch (type){
          case 'sort':
            toggleSortDropdown();
            break;
          case 'theme':
            toggleThemeDropdown();
            break;
        }
      }}
      style={styles.option}>
      <IfgText style={gs.fontCaptionSmall}>{option}</IfgText>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, themeOpen && {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
      {/* Сортировка */}
      <View style={[styles.dropdownContainer, {borderBottomWidth: 1}]}>
        <TouchableOpacity onPress={toggleSortDropdown} style={styles.dropdownHeader}>
          <View>
            <IfgText color="#A0A0A0" style={gs.fontCaptionSmallSmall}>Сортировка</IfgText>
            <IfgText style={gs.fontCaptionSmall}>{sortOption}</IfgText>
          </View>
          <TouchableOpacity disabled style={{ transform: [{ scaleY: scaleSortY }] }}>
            <Open />
          </TouchableOpacity>
        </TouchableOpacity>
        {sortOpen && (
          <View style={styles.dropdownBody}>
            {sortOptions.map((option) =>
              renderOption(option, (selectedOption) => setSortOption(selectedOption), 'sort')
            )}
          </View>
        )}
      </View>

      {/* Выбрать тему */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={toggleThemeDropdown} style={styles.dropdownHeader}>
        <View>
            <IfgText color="#A0A0A0" style={gs.fontCaptionSmallSmall}>Выбрать тему</IfgText>
            <IfgText style={gs.fontCaptionSmall}>{themeOption}</IfgText>
        </View>
        <TouchableOpacity disabled style={{ transform: [{ scaleY: scaleThemeY }] }}>
            <Open />
        </TouchableOpacity>
        </TouchableOpacity>
        {themeOpen && (
          <View style={styles.dropdownBody}>
            {themeOptions.map((option) =>
              renderOption(option, (selectedOption) => setThemeOption(selectedOption), 'theme')
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderColor: '#E4E4E4',
    borderWidth: 1,
  },
  dropdownContainer: {
    // borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownBody: {
    paddingVertical: 8,
    position: 'absolute',
    top: 56,
    backgroundColor: '#f1f1f1',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    zIndex: 1000,
    elevation: 100,
  },
  option: {
    paddingVertical: 8,
    paddingLeft: 12,
    width: '100%',
  },
});

export default DropdownBlock;
