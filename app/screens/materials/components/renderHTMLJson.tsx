import React from 'react';
import { Text, View, StyleSheet, Linking, Image } from 'react-native';
import { parseHTMLToSequentialObjects, stripHtmlTags } from '../../../core/utils/stripHtmlTags';
import Accept from '../../../../assets/icons/accept-article.svg';
import gs from '../../../core/styles/global';
// import { Text } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';
export const RenderHTMLContent = ({ content, fromBodyJson }) => {
const renderNode = (node, index) => {

  if (node.text) {
    // Оборачиваем текст в <Text>, чтобы избежать ошибки
      // return node.text;


      return fromBodyJson ? node.text :
        <Text key={index} style={styles.defaultText}>
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
        return (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(node.attributes?.href)}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'strong':
        return (
          <Text style={styles.strong}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      case 'em':
        return (
          <Text style={styles.em}>
            {node.children.map((child, childIndex) => renderNode(child, childIndex))}
            </Text>
        );
      // case 'img':
      //   console.log('node.attributes?.src', `https://ifeelgood.life/storage${node.attributes?.src.split('storage')[1]}`);
      //   const imageUri = node.attributes?.src || '';
      //   if (!imageUri) {return null;}
      //   return (
      //       <Image
      //         source={{ uri: `https://ifeelgood.life/storage${node.attributes?.src.split('storage')[1]}` }}
      //         resizeMode="contain" style={{width: '100%', height: 200}}
      //         onError={(e) => console.warn('Failed to load image:', e.nativeEvent.error)}
      //         />
      //     );
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
