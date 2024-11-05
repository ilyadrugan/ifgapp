import { StyleSheet } from 'react-native';

const gs = StyleSheet.create({
  h1: {
    fontFamily: 'tilda-sans_semibold',
    fontSize: 24,
    lineHeight: 32,
  },
  bold: {
    fontFamily: 'tilda-sans_extra-bold',
  },
  semiBold: {
    fontFamily: 'tilda-sans_semibold',
  },
  link: {
    color: 'green',
  },
  p: {
    marginTop: 9,
    marginBottom: 9,
  },
  h1Intro: {
    fontFamily: 'tilda-sans_extra-bold',
    fontSize: 28,
    lineHeight: 36,
  },
  h2: {
    fontFamily: 'tilda-sans_semibold',
    fontSize: 21,
    lineHeight: 28,
  },
  h2Intro: {
    fontFamily: 'tilda-sans_semibold',
    fontSize: 28,
    lineHeight: 36,
  },
  fontBody2: {
    fontFamily: 'tilda-sans_medium',
    fontSize: 14,
    lineHeight: 18,
  },
  fontBody1: {
    fontFamily: 'tilda-sans_medium',
    fontSize: 16,
    lineHeight: 24,
  },
  fontCaption: {
    fontFamily: 'tilda-sans_medium',
    fontSize: 12,
    lineHeight: 16,
  },
  h3: {
    fontFamily: 'tilda-sans_semibold',
    fontSize: 18,
    lineHeight: 24,
  },
  h4: {
    fontFamily: 'tilda-sans_semibold',
    fontSize: 16,
    lineHeight: 24,
  },
  h5: {
    fontFamily: 'tilda-sans_semibold',
    fontSize: 14,
    lineHeight: 18,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  center: {
    textAlign: 'center',
  },
  colorWhite: {
    color: 'white',
  },
  // colorPrimary: {
  //   color: theme.PRIMARY_COLOR,
  // },
  // colorSecondary: {
  //   color: theme.SECONDARY_COLOR,
  // },
  // colorGreenText: {
  //   color: theme.GREEN_TEXT_COLOR,
  // },
  // colorGreenLogo: {
  //   color: theme.GREEN_LOGO_COLOR,
  // },
  // colorRed: {
  //   color: theme.RED_COLOR,
  // },
  // colorIcon: {
  //   color: theme.ICON_COLOR,
  // },
  // colorGold: {
  //   color: theme.GOLD_COLOR
  // },
  // colorBorder: {
  //   color: theme.BORDER_COLOR
  // },
  // delimiter: {
  //   height: 1,
  //   backgroundColor: theme.BORDER_COLOR,
  // },
  // delimiterVertical: {
  //   width: 1,
  //   backgroundColor: theme.BORDER_COLOR,
  // },
  // delimiterLight: {
  //   height: 1,
  //   backgroundColor: theme.BORDER_LIGHT_COLOR,
  // },

  w100: { width: '100%' },

  shadow: {
    shadowColor: '#13141a4d',
    elevation: 8,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },

  mt4: { marginTop: 4 },
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  mt16: { marginTop: 16 },
  mt24: { marginTop: 24 },
  mt32: { marginTop: 32 },
  mt48: { marginTop: 48 },
  mt64: { marginTop: 64 },
  mt96: { marginTop: 96 },
  mt128: { marginTop: 128 },

  mr4: { marginRight: 4 },
  mr8: { marginRight: 8 },
  mr12: { marginRight: 12 },
  mr16: { marginRight: 16 },
  mr24: { marginRight: 24 },
  mr32: { marginRight: 32 },
  mr48: { marginRight: 48 },
  mr64: { marginRight: 64 },
  mr96: { marginRight: 96 },
  mr128: { marginRight: 128 },

  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mb32: { marginBottom: 32 },
  mb48: { marginBottom: 48 },
  mb64: { marginBottom: 64 },
  mb96: { marginBottom: 96 },
  mb128: { marginBottom: 128 },
  mbAuto: { marginBottom: 'auto' },

  ml4: { marginLeft: 4 },
  ml8: { marginLeft: 8 },
  ml12: { marginLeft: 12 },
  ml16: { marginLeft: 16 },
  ml24: { marginLeft: 24 },
  ml32: { marginLeft: 32 },
  ml48: { marginLeft: 48 },
  ml64: { marginLeft: 64 },
  ml96: { marginLeft: 96 },
  ml128: { marginLeft: 128 },

  cardHeader: {
    paddingTop: 30,
    marginBottom: 15,
  },

  flex1: {
    flex: 1,
  },
});

export default gs;
