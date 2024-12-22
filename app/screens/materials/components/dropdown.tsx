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
import { observer } from 'mobx-react';

// Активируем LayoutAnimation для Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DropdownBlock: FC<{
  themes: ArticleThemesModel[],
  activeTab: number,
  activeSwitch: number
}> = observer(({themes, activeTab, activeSwitch}) => {
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

  const getMaterialsBySortTheme = (option: ArticleSortModel | ArticleThemesModel | number) => {
    console.log(option);
    // if (activeTab === 0) {articlesStore.clearArticles();}
    // if (activeTab === 1) {articlesStore.clearInterViews('finished'); articlesStore.clearInterViews('actual');}
    if (option.tag_id !== 100 && (option.sort_value || sortOption.sort_value)) {
      const value = option.sort_value || sortOption.sort_value;
      const order = option.order || sortOption.order;
      articlesStore.removeArticleParam('sort[popular]');
      articlesStore.removeArticleParam('sort[likes]');
      articlesStore.removeArticleParam('sort[date]');
      articlesStore.removeInterViewsParam('sort[popular]');
      articlesStore.removeInterViewsParam('sort[likes]');
      articlesStore.removeInterViewsParam('sort[date]');
      articlesStore.setArticleQueryParam(`sort[${value}]`, `${order}`);
      articlesStore.setInterViewsQueryParam(`sort[${value}]`, `${order}`);

    }
    if (option.title !== 'Показать все' && (option.children !== undefined || themeOption.children !== undefined)){
      const tagId = option.children !== undefined ? option.tag_id : themeOption.tag_id;
      articlesStore.setArticleQueryParam('tag', `${tagId}`);
      articlesStore.setInterViewsQueryParam('tag', `${tagId}`);
    }
    if (typeof option === 'number' || activeHashTag !== 0) {
      const optionId = typeof option === 'number' ? option : activeHashTag;
      articlesStore.setArticleQueryParam('populate_tags', `${optionId}`);
    }
    if (option.title === 'Показать все'){
      articlesStore.removeArticleParam('tag');
      articlesStore.removeInterViewsParam('tag');
    }
    if (option.tag_id === 100) {
      articlesStore.removeInterViewsParam('sort[popular]');
      articlesStore.removeInterViewsParam('sort[likes]');
      articlesStore.removeInterViewsParam('sort[date]');
      articlesStore.removeArticleParam('sort[popular]');
      articlesStore.removeArticleParam('sort[likes]');
      articlesStore.removeArticleParam('sort[date]');
    }
  };
  // useEffect(() => {

  // }, [themeOption, sortOption])


  const getQuery = async (option: ArticleSortModel | ArticleThemesModel | number) => {
    // const sortQuery = getMaterialsBySort(option)
    getMaterialsBySortTheme(option);

    // setCurrentQuery(finalQuery);
    console.log('articlesQueryParams',articlesStore.getArticleQueryParamsString());
    console.log('interviewsQueryParams',articlesStore.getInterViewsQueryParamsString());
    if (activeTab === 0) {
      await articlesStore.clearArticles();
      await articlesStore.loadMoreArticles(articlesStore.getArticleQueryParamsString());
    }
    if (activeTab === 1) {
      if (activeSwitch === 0) {
        articlesStore.clearInterViews('actual');
        await articlesStore.loadMoreFinishedInterviews(articlesStore.getInterViewsQueryParamsString());
      }
      if (activeSwitch === 1) {
        articlesStore.clearInterViews('finished');
        await articlesStore.loadMoreActualInterviews(articlesStore.getInterViewsQueryParamsString());
      }
    }
    // onRefresh(finalQuery);
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
    // await articlesStore.clearArticles();
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
                {(!articlesStore.isLoading || articlesStore.articleHashTagList) && articlesStore.articleHashTagList.map((item) => <TouchableOpacity key={item.id.toString()} onPress={async ()=>{onHashTag(item.id); getQuery(item.id);}} style={[styles.hashtag, activeHashTag === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                    <IfgText color={activeHashTag === item.id ? colors.WHITE_COLOR : '#878787'} style={gs.fontLightSmall}>#{item.name}</IfgText>
                </TouchableOpacity>)}
            </View>}
    </>
  );
});

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
