import React, { FC, useEffect, useRef, useState } from 'react';
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
import articlesStore from '../../../../store/state/articlesStore/articlesStore';
import { ArticleSortModel, ArticleThemeModel, ArticleThemesModel } from '../../../../store/state/articlesStore/models/models';
import colors from '../../../core/colors/colors';

// Активируем LayoutAnimation для Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DropdownBlock: FC<{themes: ArticleThemesModel[], onRefresh: (query?: string)=>void, activeTab: number}> = ({themes, onRefresh, activeTab}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [themeOptions, setThemeOptions] = useState<ArticleThemesModel[]>([ {title: 'Показать все'} as ArticleThemesModel,...themes]);
  const [sortOption, setSortOption] = useState<ArticleSortModel>({
    tag_id: 100,
    title: 'По умолчанию',
  },);
  const [themeOption, setThemeOption] = useState<ArticleThemesModel>({tag_id: 0, title: 'Показать все'} as ArticleThemesModel);
  const [activeHashTag, setActiveHashTag] = useState<number>(0);

  const sortOptions:ArticleSortModel[] = [
    {
      tag_id: 100,
      title: 'По умолчанию',
    },
    {
      tag_id: 1001,
      title: 'По популярности',
      order: 1,
      sort_value: 'popular',
    },
    {
      tag_id: 1002,
      title: 'От новых к старым',
      order: 1,
      sort_value: 'date',
    },
    {
      tag_id: 1003,
      title: 'От старых к новым',
      order: -1,
      sort_value: 'date',
    },
    {
      tag_id: 1004,
      title: 'Сначала полезные',
      order: 1,
      sort_value: 'likes',
    },
  ];
  // const themeOptions = [ {title: 'Показать все'} as ArticleThemesModel,...themes] as ArticleThemesModel[];

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

  useEffect(()=>{
    console.log(themeOptions);
  },[]);

  const getMaterialsByTheme = (option: ArticleThemesModel , query: string) => {
    // let query = '?';
    console.log(option);
    // if (sortOption.sort_value) {
    //   query += `sort[${sortOption.sort_value}]=${sortOption.sort_order}&`;
    // }
    if (option.children !== undefined){
      query += `tag=${option.tag_id}`;
    }
    return query;
  };

  const getMaterialsBySortTheme = (option: ArticleSortModel | ArticleThemesModel | number) => {
    let query = '?';
    console.log(option);
    if (option.tag_id !== 100 && (option.sort_value || sortOption.sort_value)) {
      const value = option.sort_value || sortOption.sort_value;
      const order = option.order || sortOption.order;
      query += `sort[${value}]=${order}&`;
    }
    if (option.title !== 'Показать все' && (option.children !== undefined || themeOption.children !== undefined)){
      const tagId = option.children !== undefined ? option.tag_id : themeOption.tag_id;
      query += `tag=${tagId}&`;
    }
    if (typeof option === 'number' || activeHashTag !== 0) {
      const optionId = typeof option === 'number' ? option : activeHashTag;
      query += `populate_tags=${optionId}`;
    }
    return query;
  };
  // useEffect(() => {

  // }, [themeOption, sortOption])


  const getQuery = async (option: ArticleSortModel | ArticleThemesModel | number) => {
    // const sortQuery = getMaterialsBySort(option)
    const finalQuery = getMaterialsBySortTheme(option);
    console.log(finalQuery);
    // await articlesStore.getArticlesByTags(finalQuery);
    onRefresh(finalQuery);
  };

  const renderOption = (option: ArticleSortModel | ArticleThemesModel, onSelect, type) => (
    <TouchableOpacity
      key={option.tag_id}
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
        getQuery(option);
      }}
      style={styles.option}>
      <IfgText style={gs.fontCaptionSmall}>{option.title}</IfgText>
    </TouchableOpacity>
  );
  const onHashTag = (populate_tag: number) => {
    setActiveHashTag(populate_tag);
  };
  return (
    <>
    <View style={[styles.container, themeOpen && {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
      {/* Сортировка */}
      <View style={[styles.dropdownContainer, {borderBottomWidth: 1}]}>
        <TouchableOpacity onPress={toggleSortDropdown} style={styles.dropdownHeader}>
          <View>
            <IfgText color="#A0A0A0" style={gs.fontCaptionSmallSmall}>Сортировка</IfgText>
            <IfgText style={gs.fontCaptionSmall}>{sortOption.title}</IfgText>
          </View>
          <TouchableOpacity disabled style={{ transform: [{ scaleY: scaleSortY }] }}>
            <Open />
          </TouchableOpacity>
        </TouchableOpacity>
        {sortOpen && (
          <View style={styles.dropdownBody}>
            {sortOptions.map((sort) =>
              renderOption(sort, async (selectedOption) => await setSortOption(selectedOption), 'sort')
            )}
          </View>
        )}
      </View>

      {/* Выбрать тему */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={toggleThemeDropdown} style={styles.dropdownHeader}>
        <View>
            <IfgText color="#A0A0A0" style={gs.fontCaptionSmallSmall}>Выбрать тему</IfgText>
            <IfgText style={gs.fontCaptionSmall}>{themeOption.title}</IfgText>
        </View>
        <TouchableOpacity disabled style={{ transform: [{ scaleY: scaleThemeY }] }}>
            <Open />
        </TouchableOpacity>
        </TouchableOpacity>
        {themeOpen && (
          <View style={styles.dropdownBody}>
            {themeOptions.map((theme) =>
              renderOption(theme, async (selectedOption) =>await setThemeOption(selectedOption), 'theme')
            )}
          </View>
        )}
      </View>

    </View>
          <View style={gs.mt16} />
          {activeTab === 0 &&
            <View style={styles.hashtagsContainer}>
                {(!articlesStore.isLoading || articlesStore.articleHashTagList) && articlesStore.articleHashTagList.map((item) => <TouchableOpacity key={item.id.toString()} onPress={()=>{onHashTag(item.id); getQuery(item.id);}} style={[styles.hashtag, activeHashTag === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                    <IfgText color={activeHashTag === item.id ? colors.WHITE_COLOR : '#878787'} style={gs.fontLightSmall}>#{item.name}</IfgText>
                </TouchableOpacity>)}
            </View>}
    </>
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
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  hashtag: {
    padding: 8,
    backgroundColor: colors.WHITE_COLOR,
    borderRadius: 8,
  },
});

export default DropdownBlock;
