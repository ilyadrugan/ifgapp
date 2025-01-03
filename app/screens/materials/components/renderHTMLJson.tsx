import React from 'react';
import { Text, View, StyleSheet, Linking, Image, Dimensions, StyleProp, StyleSheetProperties, ViewStyle, TextStyle } from 'react-native';
import { parseHTMLToSequentialObjects, stripHtmlTags } from '../../../core/utils/stripHtmlTags';
import Accept from '../../../../assets/icons/accept-article.svg';
import gs from '../../../core/styles/global';
// import { Text } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';

const width = Dimensions.get('screen').width;
export const RenderHTMLContent = ({ content, fromBodyJson }) => {
  let styleText: StyleProp<ViewStyle | TextStyle> = {};
const renderNode = (node, index) => {

  if (node.text) {
    // Оборачиваем текст в <Text>, чтобы избежать ошибки
      // return node.text;
      let style;
      if (!fromBodyJson) {
        style = styleText;
        styleText = {} as StyleProp<ViewStyle | TextStyle>;
      }

      return fromBodyJson ? node.text :
        <Text key={index} style={[styles.defaultText, style]}>
          {node.text}
         </Text>
      ;


  }

    switch (node.tag) {
      case 'p':
        return (
          <Text style={styles.paragraph}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'ul':
        return (
          <View style={styles.ul}>
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
        console.log('li', node, node.children);

        return (
          <View style={styles.li}>
            {node.isOrdered ? (
              <IfgText color={colors.GREEN_COLOR} style={[gs.h2Intro,{ marginTop: 0}]}>0{node.index} </IfgText>
            ) : <View style={styles.bullet}/>}
            <Text style={styles.liText}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
          </View>
        );
      case 'h1':
        return (
          <Text style={styles.h1}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'h2':
        return (
          <Text style={styles.h2}>
            {node.children.map((child, childIndex) =>
                            <View style={[gs.flexRow, gs.alignCenter]}>
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
          <View style={styles.blockquote}>
            <Text style={styles.blockquoteText}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
          </View>
        );
      case 'div':
        return (
          <View style={styles.div}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </View>
        );
      case 'span':
        return (
          <Text style={styles.span}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'a':
        styleText = [styleText, styles.link];
        return (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(node.attributes?.href)}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'strong':
        styleText = [styleText, gs.bold];
        return (
          <Text style={styles.strong}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'em':
        styleText = [styleText, gs.italic];
        return (
          <Text style={styles.em}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'img':
        console.log('node.attributes?.src', `https://ifeelgood.life/storage${node.attributes?.src.split('storage')[1]}`);
        const imageUri = `https://ifeelgood.life/storage${node.attributes?.src.split('storage')[1]}`;
        // if (!imageUri) {return null;}
        return (
          <View style={{backgroundColor: 'black'}}>
            <Image
              source={{ uri: imageUri }}
              resizeMode="contain" style={{width: '100%', height: 200}}
              onError={(e) => console.warn('Failed to load image:', e.nativeEvent.error)}
              /></View>
          );
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
});

export default RenderHTMLContent;
