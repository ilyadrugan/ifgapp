import colors from '../../../core/colors/colors';
import gs from '../../../core/styles/global';
import React, { FC } from 'react';
import {Linking, ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native';
import { stripWebHtmlSheluha } from '../../../core/utils/stripHtmlTags';
import HTMLView from 'react-native-htmlview';
import Accept from '../../../../assets/icons/accept-article.svg';
import { IfgText } from '../../../core/components/text/ifg-text';
import { YoutubeVideo, youtube_parser } from '../../../core/components/youtubePlayer/youtubePlayer';
import { useNavigation } from '@react-navigation/native';
import RutubeView from '../../../core/components/rutubeView/rutubeVideo';
import WebView from 'react-native-webview';

const width = Dimensions.get('screen').width;

export const RenderHTMLView: FC<{html: string, br?: boolean}> = ({
    html,
    br,
}) => {
      const navigation = useNavigation<any>();

      const containsImage = (node) => {
        return node.children?.some((child) => child.name === 'img');
      };
      const containsVideo = (node) => {
        return node.children?.some((child) => child.name === 'iframe');
      };

      const renderNode = (node, index, siblings, parent, defaultRenderer) => {
        // console.log('node.type', node.type);
        if (node.name === 'img') {
          let imageUri = node.attribs?.src.startsWith('https:/')
            ? node.attribs?.src
            : `https://ifeelgood.life/storage${node.attribs?.src.split('storage')[1]}`;
          if (imageUri && imageUri.includes('?')) {
            imageUri = imageUri.split('?')[0];
          }
          console.log('Image URI:', imageUri); // Проверяем URI
          return (
            <View key={index}>
              <Image source={{ uri: imageUri }} resizeMode="cover" style={customStyles.img} />
            </View>
          );
        }

        if (node.name === 'iframe') {
          // const videoUrl = node.attribs?.src;
          const videoUrl = node.attribs?.src.replace(/&amp;/g, '&');
          console.log('videoUrl', videoUrl);
          if (videoUrl) {
                  return <View style={gs.mt8}>
                    {videoUrl.includes('youtube') ?
                      <YoutubeVideo videoId={youtube_parser(videoUrl) || ''} />
                      :
                      <View style={{position: 'relative',
                          borderRadius: 20,
                          height: 195,
                          backgroundColor: 'black',
                          width: '100%'}}>
                          <WebView
                                source={{ uri: videoUrl }}
                                style={{ flex: 1 }}
                                javaScriptEnabled
                                domStorageEnabled
                                allowsFullscreenVideo
                                mediaPlaybackRequiresUserAction={false}
                              />
                      </View>

                      // <RutubeView url={videoUrl}/>
                    }
                  </View>;
          }
        }
        if (node.name === 'blockquote'){
            return (
            <View key={index} style={customStyles.blockquote}>
              {defaultRenderer(node.children, node)}
            </View>
           );}
        if (node.name === 'tbody') {
          return (
            <ScrollView key={index}  style={[customStyles.tableContainer, {flexDirection: 'column'}]}>
              <View style={customStyles.tbody}>{defaultRenderer(node.children, node)}</View>
            </ScrollView>
          );
        }
        if (node.name === 'table') {
          return defaultRenderer(node.children, node);
        }

        if (node.name === 'tr') {
          return <View key={index} style={[customStyles.tr, {backgroundColor: index === 0 ? '#effaf3' : '#f9f9f9', borderRadius: 12, borderWidth: 1, borderColor: 'black', marginTop: 6}]}>{defaultRenderer(node.children, node)}</View>;
        }

        if (node.name === 'th') {
          return <IfgText key={index} style={[customStyles.th]}>{defaultRenderer(node.children, node)}</IfgText>;
        }

        if (node.name === 'td') {
          const tdChilds = parent.children.filter((child)=>child.name === 'td');
          const tdIndex = tdChilds.findIndex((child)=>child === node);
          // console.log('td','containsImage', containsImage(node));
          // if (containsImage(node.children) || containsVideo(node.children)) {
          //   return <View style={[customStyles.td, {borderRightWidth: (tdIndex !== (parent.children.length - 1) ) ? 1 : 0}]}>{defaultRenderer(node.children, node)}</View>;
          // }
          return <View key={index} style={[customStyles.td, {borderRightWidth: (tdIndex !== (parent.children.length - 1) ) ? 1 : 0}]}>{defaultRenderer(node.children, node)}</View>;
        }
        if (node.name === 'span') {
          if (containsImage(node) || containsVideo(node)) {
            return defaultRenderer(node.children, node);
          }
          return (
            <IfgText key={index} style={[customStyles.span,{ flexWrap: 'nowrap', display: 'flex' }]}>
              {defaultRenderer(node.children, node)}
            </IfgText>
          );
        }
        if (node.name === 'em') {
          return <IfgText style={[gs.italic]}>{defaultRenderer(node.children, node)}</IfgText>;
        }
        if (node.name === 'strong') {
            if (parent.name === 'a'){
                console.log('a<strong', node.type);
                let Url;
                let isLinking = false;
                if (parent.attribs?.href.startsWith('https')){
                  Url = parent.attribs?.href;
                  isLinking = true;
                }
                else{
                  const splited = parent.attribs?.href.split('articles/')[1];
                  Url = splited;
                }

                return <IfgText color={colors.GREEN_COLOR} key={index} onPress={()=>isLinking ? Linking.openURL(Url) : navigation.navigate('ArticleView', {articleId: Number(Url)})} style={[customStyles.span, customStyles.a, gs.bold]}>{defaultRenderer(node.children, node)}</IfgText>;
            }
          return <IfgText key={index} style={[customStyles.span, gs.bold]}>{node.children ? defaultRenderer(node.children, node) : node.data}</IfgText>;
        }
        if (node.name === 'a') {
          let Url;
          let isLinking = false;
          if (node.attribs?.href.startsWith('https')){
            Url = node.attribs?.href;
            isLinking = true;
          }
          else{
            const splited = node.attribs?.href.split('articles/')[1];
            Url = splited;
          }

          return <IfgText key={index} onPress={()=>isLinking ? Linking.openURL(Url) : navigation.navigate('ArticleView', {articleId: Number(Url)})} style={[customStyles.span, customStyles.a]}>{defaultRenderer(node.children, node)}</IfgText>;
        }
        if (node.name === 'p') {
          const tableTags = ['tr', 'th', 'td', 'table'];
          return (tableTags.includes(parent?.name) || containsImage(node) || containsVideo(node))  ?
          defaultRenderer(node.children, node)
          : <IfgText style={[customStyles.p]}>
              {defaultRenderer(node.children, node)}
          </IfgText>;
        }
        if (node.name === 'div') {
          return defaultRenderer(node.children, node);
        }
        if (node.name === 'ul') {
          return <View style={[customStyles.ul]}>
              {defaultRenderer(node.children, node)}
          </View>;
        }
        if (node.name === 'ol') {
          return <View style={[customStyles.ul]}>
              {defaultRenderer(node.children, node)}
          </View>;
        }

        if (node.name === 'li') {
        //   console.log('li','index', parent?.name, index);
          const liChilds = parent.children.filter((child)=>child.name === 'li');
          const liIndex = liChilds.findIndex((child)=>child === node);
        //   console.log(liIndex);
          // console.log(parent.children);
          return <View style={{flexDirection: 'row',  maxWidth: width - 120}}>
            {parent?.name === 'ol' ? <IfgText color={colors.GREEN_COLOR} style={[gs.h2Intro,gs.mr8, gs.mt16]}>0{liIndex + 1}</IfgText> : <View style={[customStyles.bullet, gs.mt24]}/>}
            {node.children[0].name !== 'p' ? <IfgText style={[customStyles.p]}>
              {defaultRenderer(node.children, node)}
          </IfgText> : defaultRenderer(node.children, node)}
            </View>;
        }
        if (node.name === 'h3' || node.name === 'h2' || node.name === 'h1' || node.name === 'h4' || node.name === 'h5') {
          return <View style={{flexDirection: 'row', width:width - 32, alignItems:'center', marginTop:12}}>
          <View style={gs.mr12}>
            <Accept />
          </View>
          <View style={{flexDirection: 'row',flexWrap: 'wrap',maxWidth: width - 140 , alignItems:'center'}}>{
          (containsImage(node) || containsVideo(node)) ? defaultRenderer(node.children, node)
          : node.children.map(child=>{
            console.log('child.name', child.name);
            if (child.data) {
              console.log('ZAGOLOVOK');
              return <IfgText key={index} style={[customStyles.h, gs.bold]}>{child.data}</IfgText>;
            }
            if (child.name === 'span') {
            //   console.log(child.children);

              return <IfgText key={index} style={[customStyles.h, gs.bold]}>{child.children.map((c)=>{
                if (c.data) {
                  return c.data;
                }
                // console.log('CCC', c.name, c.children[0]);
                if (c.name === 'a') {
                  let Url;
                  let isLinking = false;
                  if (c.attribs?.href.startsWith('https')){
                    Url = c.attribs?.href;
                    isLinking = true;
                  }
                  else{
                    const splited = c.attribs?.href.split('articles/')[1];
                    Url = splited;
                  }
                  return <IfgText color={colors.GREEN_COLOR} style={[customStyles.h, gs.bold, gs.underline]} key={index} onPress={()=>isLinking ? Linking.openURL(Url) : navigation.navigate('ArticleView', {articleId: Number(Url)})}>{c.children[0].children.map((text)=>text.data)}</IfgText>;
                }
                return defaultRenderer(c.children, c);
              })}</IfgText>;
            }
              return defaultRenderer(child.children, child);

          })}</View>
           </View>;
        }

        // 📌 Если элемент содержит только текст — рендерим его без вложенного `View`
        if (!node.children || node.children.length === 0) {
          // console.log('parent', parent.name, node.parent.attribs);
          // console.log('node', node);

          if ((node.parent.name === 'span' || node.parent.name === 'p') && node.parent.attribs?.style){
            // console.log('node.attribs?.style', node.parent.attribs.style);
            if (node.parent.attribs?.style.includes('background-color: ')){
              const color = node.parent.attribs?.style.split('background-color: ')[1].split(';')[0];
              // console.log('BGCOLOR', color);
              return <IfgText style={{backgroundColor: color ? color : 'transparent'}} key={index}>{node.data}</IfgText>;}
            if (node.parent.attribs?.style.includes('vertical-align: super'))
              {return <IfgText style={{marginBottom: parent.attribs?.style.includes('vertical-align: super') ? 14 : 0}} key={index}>{node.data}</IfgText>;}
          }
          if (node.parent.name === 'strong') {
            if (parent.parent.name === 'a') {
                console.log('a');
                let Url;
                let isLinking = false;
                if (parent.parent.attribs?.href.startsWith('https')){
                  Url = parent.parent.attribs?.href;
                  isLinking = true;
                }
                else{
                  const splited = parent.parent.attribs?.href.split('articles/')[1];
                  Url = splited;
                }

                return <IfgText color={colors.GREEN_COLOR} key={index} onPress={()=>isLinking ? Linking.openURL(Url) : navigation.navigate('ArticleView', {articleId: Number(Url)})} style={[customStyles.span, customStyles.a, gs.bold]}>{node.data}</IfgText>;
            }
            return <IfgText key={index} style={gs.bold}>{node.data}</IfgText>;
          }
          if (node.parent.name === 'em') {
            return <IfgText key={index} style={[gs.italic]}>{node.data}</IfgText>;
          }
          if (node.parent.name === 'a') {
            let Url;
            let isLinking = false;
            if (node.parent.attribs?.href.startsWith('https')){
              Url = node.parent.attribs?.href;
              isLinking = true;
            }
            else{
              const splited = node.parent.attribs?.href.split('articles/')[1];
              Url = splited;
            }
            return <IfgText key={index} onPress={()=>isLinking ? Linking.openURL(Url) : navigation.navigate('ArticleView', {articleId: Number(Url)})} color={colors.GREEN_COLOR}>{node.data}</IfgText>;
          }
          return <IfgText key={index}>{node.data}</IfgText>;
        }
        if (node.name === 'collgroup') {
          return null;
        }
        if (containsImage(node) || containsVideo(node)) {
          return defaultRenderer(node.children, node);
        }
        return <IfgText key={index}>{defaultRenderer(node.children, node)}</IfgText>;
      };
    return <HTMLView
              renderNode={renderNode}
              value={stripWebHtmlSheluha(html, br)}
              stylesheet={customStyles}
            />;
};

const customStyles = StyleSheet.create( {
    p: {
       marginTop: 16,
      //  flexDirection: 'row',
      flexWrap: 'nowrap',
      ...gs.fontCaption2,
      color: colors.PLACEHOLDER_COLOR,
    },
    span: {
      ...gs.fontCaption2,
      color: colors.PLACEHOLDER_COLOR,
      // marginBottom: 10,

    },
    div:{
      margin:0,
    },
    h: {
      ...gs.bold,
      ...gs.fontBodyMedium,
    },
    ul: {
      paddingLeft: 10,
    },
    a: {
      color: 'green',
      textDecorationLine: 'underline',
    },
    img: {
      width: '100%',
      height: 200,
      marginVertical: 12,
    },
    tableContainer: {
      width: width - 64,
      // overflow: 'scroll', // Добавлено для совместимости
      // flexDirection: 'column',
    },
    tbody: {
      // borderWidth: 1,
      // borderColor: '#ddd',
      // marginBottom: 10,
      flexDirection: 'column',
      // width: '100%',
    },
    tr: {
      flexDirection: 'row',
      width: width - 64,
    },
    th: {
      fontWeight: 'bold',
      padding: 8,
      backgroundColor: '#f1f1f1',
      flex: 1,
      textAlign: 'center',
    },
    td: {
      padding: 8,
      flex: 1,
      textAlign: 'center',
    },
    bullet: {
      width: 8,
      height: 8,
      borderRadius: 10,
      marginRight: 8,
      marginTop: 5,
      backgroundColor: colors.GREEN_COLOR,
    },
    blockquote: {
      // justifyContent: 'center',
      // alignItems: 'center',
      paddingTop: 4,
      paddingLeft: 16,
      paddingBottom: 16,
      marginVertical: 12,
      backgroundColor: '#effaf3',
      borderRadius: 12,
    },
    h1: {
      ...gs.fontCaption,
    },
    h2: {
      ...gs.fontCaption,
    },
    h3: {
      ...gs.fontCaption,
    },
    h4: {
      ...gs.fontCaption,
    },
    h5: {
      ...gs.fontCaption,
    },
  });
