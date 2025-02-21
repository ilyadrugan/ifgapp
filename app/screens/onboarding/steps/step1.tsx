import { Dimensions, Image, ImageBackground, Platform, StyleSheet, View } from 'react-native';
import { FC } from 'react';
import React from 'react';
import { Carousel } from 'react-native-snap-carousel';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import gs from '../../../core/styles/global';
import { AnimatedTags } from '../components/animatedTags';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export const Step1:FC = () => {
     const carouselItems = [
            {
                img: require('../../../../assets/backgrounds/onboarding/phoneState1.png'),
            },
            {
                img: require('../../../../assets/backgrounds/onboarding/phoneState2.png'),
            },
          ];
    return <>
      <View style={[s.scrollContainer,{ zIndex: 99, elevation: 10,}]}>

        {/* <Image
            resizeMode="contain"
            style={{ width: '90%', top: -200}}
            source={require('../../../../assets/ifeelgood.png')}/> */}
           {/* <View> */}
           <View style={{marginTop: Platform.OS ==='ios'?32:0, width: width, padding:0}}>
            <AnimatedTags />
            </View>
           <View style={{marginLeft: width * 0.1,top: 72, alignItems: 'flex-start', width: '100%'}}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.medium, {fontSize: 110, lineHeight: 110}]}>i feel</IfgText>
            </View>
           <View style={{marginRight: width * 0.1, alignItems: 'flex-end', width: '100%', marginTop: 26}}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.medium, {fontSize: 110, lineHeight: 110}]}>good</IfgText>
           </View>
           {/* </View> */}
        <ImageBackground
            resizeMode="contain"
            style={s.phoneContainer}
            source={require('../../../../assets/backgrounds/onboarding/emptyPhone.png')}>
                        <Carousel
                        containerCustomStyle={{bottom: 124}}
                        // contentContainerCustomStyle={{}}
                        data={carouselItems}
                        renderItem={({ item, index }) =>{
                            return <Image
                            resizeMode="contain"
                            source={item.img}
                            style={{width: 250,  marginLeft: index === 0 ? 8 : 0, marginRight: index === 1 ? 8 : 0}}
                        />;}
                    }
                        sliderWidth={250}
                        itemWidth={250}
                        scrollEnabled={false} // Отключение скроллинга
                        // useScrollView={true}
                        // autoplayDelay={0.2}
                        // autoplayInterval={1}
                        autoplay={true} // Зацикливание слайдера
                        layout={'default'} // Расположение карточек
                        // onSnapToItem={(index) => setActiveSlide(index) }
                        // scrollEnabled={false}
                        // lockScrollWhileSnapping={true}
                        />
        </ImageBackground>
        </View>
    </>;
};

const s = StyleSheet.create({
    scrollContainer: {
        // flex: 1,
        flexDirection: 'column',
        height: height,
        alignItems: 'center',
        // marginVertical: 120,
      },
      phoneContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'row',
        gap: 10,
        overflow: 'hidden',
        borderRadius: 22,
        width: 290,
        bottom: -200,
        alignItems: 'center',
      },
  });
