import React from 'react';
import { Text, View, StyleSheet, Linking, Image, Dimensions, StyleProp, StyleSheetProperties, ViewStyle, TextStyle } from 'react-native';
import { parseHTMLToSequentialObjects, stripHtmlTags } from '../../../core/utils/stripHtmlTags';
import Accept from '../../../../assets/icons/accept-article.svg';
import gs from '../../../core/styles/global';
// import { Text } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';
import { youtube_parser, YoutubeVideo } from '../../../core/components/youtubePlayer/youtubePlayer';
import RutubeView from '../../../core/components/rutubeView/rutubeVideo';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('screen').width;
export const RenderHTMLContent = ({ content, fromBodyJson }) => {
  // console.log('content', content);
  const navigation = useNavigation();
  let styleText: StyleProp<ViewStyle | TextStyle> = {};
  const renderNode = (node, index) => {
    if (node.text) {
        let style;
        style = styleText;
          styleText = {} as StyleProp<ViewStyle | TextStyle>;
        // if (!fromBodyJson) {
        //   style = styleText;
        //   styleText = {} as StyleProp<ViewStyle | TextStyle>;
        // }
        return <Text key={index} style={[styles.defaultText, style]}>
            {node.text}
          </Text>
        ;
    }

    switch (node.tag) {
        case 'p':
          if (node.children && (node.children[0].tag === 'img' || node.children[0].tag === 'iframe')) {return renderNode(node.children[0], 0);}
          return (
            <Text key={index} style={styles.paragraph}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </Text>
          );
          case 'table':
            return (
              <View style={styles.table} key={index}>
                {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </View>
            );

          case 'tr':
            return (
              <View style={styles.tableRow} key={index}>
                {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </View>
            );

          case 'th':
            return (
              <View style={[styles.tableCell, styles.tableHeader]} key={index}>
                <Text style={styles.tableHeaderText}>
                  {node.children.map((child, childIndex) => renderNode(child, childIndex))}
                </Text>
              </View>
            );

          case 'td':
            return (
              <View style={styles.tableCell} key={index}>
                <Text style={styles.tableCellText}>
                  {node.children.map((child, childIndex) => renderNode(child, childIndex))}
                </Text>
              </View>
            );
            case 'ul':
          return (
            <View style={styles.ul} key={index}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </View>
          );
        case 'ol':
          return (
              <View style={styles.ol} key={index}>
                {node.children.map((child, childIndex) =>
                    renderNode(
                      { ...child, isOrdered: true, index: childIndex + 1 },
                      childIndex
                    )
                  )}
                </View>
              );
        case 'li':
          console.log('li',node, node.isOrdered, index);
          return (
            <View style={styles.li} key={index}>
              {node.isOrdered ? (
                <IfgText color={colors.GREEN_COLOR} style={[gs.h2Intro,{ marginTop: 0}]}>0{node.index} </IfgText>
              ) : <View style={styles.bullet}/>}
              <IfgText style={styles.liText}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </IfgText>
            </View>
          );
        case 'h1':
          return (
            <Text key={index} style={styles.h1}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </Text>
          );
        case 'h2':
          return (
            <Text key={index} style={styles.h2}>
              {node.children.map((child, childIndex) =>
                              <View key={childIndex} style={[gs.flexRow, gs.alignCenter]}>
            <View style={gs.mr12}>
            <Accept />
          </View>
            {renderNode(child, childIndex)}

            </View>
                  // renderNode(child)
                  )}
            </Text>
          );
        case 'blockquote':
          return (
            <View key={index} style={styles.blockquote}>
              <Text style={styles.blockquoteText}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </Text>
            </View>
          );
        case 'div':
          return (
            <View key={index} style={styles.div}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </View>
          );
        case 'span':
          return (
            <Text key={index} style={styles.span}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </Text>
          );
        case 'a':
          styleText = [styleText, styles.link];
          const link = node.attributes?.href;

          return (
            <Text
              key={index}
              style={styles.link}
              onPress={() => link.includes('ifeelgood.life/articles/info') ? navigation.navigate('LifehackPrincipsPage') : Linking.openURL(link)}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </Text>
          );
        case 'strong':
          styleText = [styleText, gs.bold];
          return (
            <Text key={index} style={styles.strong}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </Text>
          );
        case 'em':
          styleText = [styleText, gs.italic];
          return (
            <Text key={index} style={styles.em}>
              {node.children.map((child, childIndex) => renderNode(child, childIndex))}
              </Text>
          );
        case 'img':
          let imageUri = '';
          if (node.attributes?.src.startsWith('https:/')){
            imageUri = node.attributes?.src;
          }
          else {
            imageUri = `https://ifeelgood.life/storage${node.attributes?.src.split('storage')[1]}`;
          }
          console.log('Image URI:', imageUri); // Отладка URI
          return (
            <View key={index} style={{ width: '100%', height: 200 }}>
              <Image
                source={{ uri: imageUri }}
                resizeMode="cover"
                style={{ width: '100%', height: 200 }}
              />
            </View>
          );
        case 'figure':
          return node.children.map((child, childIndex)=>renderNode(child, childIndex));
        case 'iframe':
          const videoUrl = node.attributes?.src;
          if (videoUrl) {
            return <View key={index} >
          {videoUrl.includes('youtube') ?
            <YoutubeVideo videoId={youtube_parser(videoUrl) || ''} />
            :
            <RutubeView url={videoUrl}/>
          }
            </View>;}
          break;
        default:
          return null; // Для тегов, которые не обрабатываются
      }
  };

  return (
    <View style={{flexDirection: 'column'}}>
      {content && parseHTMLToSequentialObjects(content).map((node, index) => (
        <React.Fragment key={index}>{renderNode(node, index)}</React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ccontainer: {
    padding: 16,
  },
  defaultText: {
    ...gs.fontCaption2,
    color: colors.PLACEHOLDER_COLOR,
  },
  paragraph: {
    ...gs.fontCaption2,
    marginBottom: 12,
    color: colors.PLACEHOLDER_COLOR,
    flex: 1,
  },
  ul: {

    marginBottom: 12,
    paddingLeft: 0,
  },
  ol: {
    marginBottom: 12,
    paddingLeft: 0,
  },
  li: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 5,
    backgroundColor: colors.GREEN_COLOR,
  },
  liText: {
    flex: 1,
    ...gs.fontCaption2,
    color: colors.PLACEHOLDER_COLOR,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.PLACEHOLDER_COLOR,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.PLACEHOLDER_COLOR,
    flex: 1,

  },
  blockquote: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#effaf3',
    borderRadius: 12,
  },
  blockquoteText: {
    ...gs.fontCaption,
    color: colors.PLACEHOLDER_COLOR,
  },
  div: {
    marginBottom: 0,
  },
  span: {
    ...gs.fontCaption2,
    color: colors.PLACEHOLDER_COLOR,
    maxWidth: width - 3 * 32 ,

  },
  link: {
    color: colors.GREEN_COLOR,
    textDecorationLine: 'underline',
  },
  strong: {
    ...gs.fontCaption2,
    ...gs.bold,
  },
  em: {
    ...gs.fontCaption2,
    ...gs.italic,
  },
  image: {
    width: '100%',
    height: 200,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCellText: {
    textAlign: 'center',
  },
});

export default RenderHTMLContent;
