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
  Dimensions,
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
const width = Dimensions.get('screen').width;
const DropdownBlock: FC<{
  themes: ArticleThemesModel[],
  activeTab: number,
  activeSwitch: number
}> = observer(({themes, activeTab, activeSwitch}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [themeOptions, setThemeOptions] = useState<ArticleThemesModel[]>([ {title: 'Показать все'} as ArticleThemesModel,...themes]);
  const [sortOption, setSortOption] = useState<ArticleSortModel>();
  const [themeOption, setThemeOption] = useState<ArticleThemesModel>();
  // const [activeHashTag, setActiveHashTag] = useState<number>(0);

  const sortOptions:ArticleSortModel[] = [
    {
      tag_id: 100,
      title: 'По умолчанию',
      sort_field: '',
      order: 0,
    },
    {
      tag_id: 1001,
      title: 'По популярности',
      order: 1,
      sort_value: 'popular',
      sort_field: 'sort[popular]',
    },
    {
      tag_id: 1002,
      title: 'От новых к старым',
      order: 1,
      sort_value: 'date',
      sort_field: 'sort[date]',
    },
    {
      tag_id: 1003,
      title: 'От старых к новым',
      order: -1,
      sort_value: 'date',
      sort_field: 'sort[date]',
    },
    {
      tag_id: 1004,
      title: 'Сначала полезные',
      order: 1,
      sort_value: 'likes',
      sort_field: 'sort[likes]',
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
  };

  useEffect(()=>{
    if (activeTab === 0) {
      setThemeOption(!articlesStore.articlesQueryParams.tag ?
        {tag_id: 0, title: 'Показать все'} as ArticleThemesModel
        :
        articlesStore.articleThemesList.find((filter)=>filter.tag_id === Number(articlesStore.articlesQueryParams.tag)) as ArticleThemesModel
      );
      // setActiveHashTag(!articlesStore.articlesQueryParams.populate_tags ?
      //   0
      //   :
      //   Number(articlesStore.articlesQueryParams.populate_tags)
      // );
      const condition = !articlesStore.articlesQueryParams['sort[date]'] && !articlesStore.articlesQueryParams['sort[likes]'] && !articlesStore.articlesQueryParams['sort[popular]'];
      setSortOption(condition ? sortOptions[0]
      :
      sortOptions.find((sort)=> Object.hasOwn(articlesStore.articlesQueryParams, sort.sort_field) && Number(articlesStore.articlesQueryParams[sort.sort_field]) === sort.order)
    );
    }
    else {
      setThemeOption(!articlesStore.interViewsQueryParams.tag ?
        {tag_id: 0, title: 'Показать все'} as ArticleThemesModel
        :
        articlesStore.articleThemesList.find((filter)=>filter.tag_id === Number(articlesStore.interViewsQueryParams.tag)) as ArticleThemesModel
      );
      const condition = !articlesStore.interViewsQueryParams['sort[date]'] && !articlesStore.interViewsQueryParams['sort[likes]'] && !articlesStore.interViewsQueryParams['sort[popular]'];
      setSortOption(condition ? sortOptions[0]
      :
      sortOptions.find((sort)=> Object.hasOwn(articlesStore.interViewsQueryParams, sort.sort_field) && Number(articlesStore.interViewsQueryParams[sort.sort_field]) === sort.order)
    );
    }

  },[activeTab]);

  const getMaterialsBySortTheme = (option: ArticleSortModel | ArticleThemesModel | number) => {
    // if (activeTab === 0) {articlesStore.clearArticles();}
    // if (activeTab === 1) {articlesStore.clearInterViews('finished'); articlesStore.clearInterViews('actual');}
    if (option.tag_id !== 100 && (option.sort_value || sortOption.sort_value)) {
      const value = option.sort_value || sortOption.sort_value;
      const order = option.order || sortOption.order;
      if (activeTab === 0) {
        articlesStore.removeArticleParam('sort[popular]');
        articlesStore.removeArticleParam('sort[likes]');
        articlesStore.removeArticleParam('sort[date]');
        articlesStore.setArticleQueryParam(`sort[${value}]`, `${order}`);
      }
      else {
        articlesStore.removeInterViewsParam('sort[popular]');
        articlesStore.removeInterViewsParam('sort[likes]');
        articlesStore.removeInterViewsParam('sort[date]');
        articlesStore.setInterViewsQueryParam(`sort[${value}]`, `${order}`);
      }
    }
    if (option.title !== 'Показать все' && (option.children !== undefined || themeOption.children !== undefined)){
      const tagId = option.children !== undefined ? option.tag_id : themeOption.tag_id;
      if (activeTab === 0) {articlesStore.setArticleQueryParam('tag', `${tagId}`);}
      if (activeTab === 1) {articlesStore.setInterViewsQueryParam('tag', `${tagId}`);}
    }
    if (typeof option === 'number') {
      if (option === Number(articlesStore.articlesQueryParams.populate_tags)) {
        // setActiveHashTag(0);
        articlesStore.removeArticleParam('populate_tags');
      }
      else{
        articlesStore.setArticleQueryParam('populate_tags', `${option}`);
      }
      // const optionId = typeof option === 'number' ? option : activeHashTag;

    }
    if (option.title === 'Показать все'){
      if (activeTab === 0) {articlesStore.removeArticleParam('tag');}
      if (activeTab === 1) {articlesStore.removeInterViewsParam('tag');}
    }
    if (option.tag_id === 100) {
      if (activeTab === 1) {
        articlesStore.removeInterViewsParam('sort[popular]');
        articlesStore.removeInterViewsParam('sort[likes]');
        articlesStore.removeInterViewsParam('sort[date]');
      }
      else {
        articlesStore.removeArticleParam('sort[popular]');
        articlesStore.removeArticleParam('sort[likes]');
        articlesStore.removeArticleParam('sort[date]');
      }
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
      // await articlesStore.clearArticles();
      await articlesStore.loadMoreArticles(articlesStore.getArticleQueryParamsString());
    }
    if (activeTab === 1) {
      if (activeSwitch === 0) {
        await articlesStore.clearInterViews('actual');
        await articlesStore.loadMoreFinishedInterviews(articlesStore.getInterViewsQueryParamsString());
      }
      if (activeSwitch === 1) {
        await articlesStore.clearInterViews('finished');
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

    // setActiveHashTag(populate_tag === activeHashTag ? 0 : populate_tag);
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
            {sortOption && <IfgText style={gs.fontCaptionSmall}>{sortOption.title}</IfgText>}
          </View>
          <TouchableOpacity disabled style={{ transform: [{ scaleY: scaleSortY }] }}>
            <Open />
          </TouchableOpacity>
        </TouchableOpacity>
        {sortOpen && (
          <View style={styles.dropdownBody}>
            {sortOptions.map((sort) =>
              renderOption(sort, (selectedOption) => setSortOption(selectedOption), 'sort')
            )}
          </View>
        )}
      </View>

      {/* Выбрать тему */}
      <View style={[styles.dropdownContainer, {zIndex: -100, elevation: -100}]}>
        <TouchableOpacity onPress={toggleThemeDropdown} style={[styles.dropdownHeader]}>
        <View>
            <IfgText color="#A0A0A0" style={gs.fontCaptionSmallSmall}>Выбрать тему</IfgText>
            {themeOption && <IfgText style={gs.fontCaptionSmall}>{themeOption.title}</IfgText>}
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
                {articlesStore.articleHashTagList && articlesStore.articleHashTagList.map((item) => <TouchableOpacity key={item.id.toString()} onPress={()=>{getQuery(item.id);}}
                style={[styles.hashtag,
                Number(articlesStore.articlesQueryParams.populate_tags) === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                    <IfgText color={Number(articlesStore.articlesQueryParams.populate_tags) === item.id ? colors.WHITE_COLOR : '#878787'} style={gs.fontLightSmall}>#{item.name}</IfgText>
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
    // zIndex: -1000,
    // elevation: -100,
  },
  dropdownBody: {
    paddingVertical: 8,
    position: 'absolute',
    top: 56,
    backgroundColor: '#f1f1f1',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E4E4E4',
    zIndex: 1000,
    elevation: 100,
  },
  option: {
    paddingVertical: 8,
    paddingLeft: 12,
    // width: '100%',
    width: width - 35,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    zIndex: -100,
    elevation: -100,
  },
  hashtag: {
    padding: 8,
    backgroundColor: colors.WHITE_COLOR,
    borderRadius: 8,
  },
});

export default DropdownBlock;
