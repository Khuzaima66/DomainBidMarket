import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('window').height

export const ACTIVE_OPACITY = 0.8
export const BACKDROP_OPACITY = 0.2

export const COLOR = {
    white: '#ffffff',
    dark: '#000000',
    black: '#212B36',
    primary: '#00A76F',
    borderprimary: 'rgba(0, 167, 111, 0.48)',
    inputgrey: '#919EAB',
    inputgrey2: '#637381',
    inputbgColor: 'rgba(145, 158, 171, 0.08)',
    grey1: '#676767',
    Blue: '#5119B7',
    black2: '#232020',
    white2: '#F2F2F2',
    green: '#118D57',
    greenBg: 'rgba(34, 197, 94, 0.16)',
    red: '#B71D18',
    redBg: 'rgba(255, 86, 48, 0.16)',
    circlegrey: '#D9D9D9'
}

export const FONT = {
    regular: 'PublicSans-Regular',
    bold: 'PublicSans-Bold',
    semiBold: 'PublicSans-SemiBold',
    medium: 'PublicSans-Medium',
    Barlow_regular: 'Barlow-Regular',
    Barlow_bold: 'Barlow-Bold',
    Barlow_semiBold: 'Barlow-SemiBold',
    Barlow_medium: 'Barlow-Medium',
}

export const TEXT_STYLE = StyleSheet.create({
    smallTitleMedium: {
        fontFamily: FONT.medium,
        fontSize: 20,
    },
    largeTitleSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 28,
    },
    bigText: {
        fontFamily: FONT.regular,
        fontSize: 18,
    },
    bigTextSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 18,
    },
    bigTextMedium: {
        fontFamily: FONT.medium,
        fontSize: 18,
    },
    bigTextBold: {
        fontFamily: FONT.bold,
        fontSize: 18,
    },
    bigTextBold_2: {
        fontFamily: FONT.bold,
        fontSize: 15,
    },
    bigTextMedium_2: {
        fontFamily: FONT.medium,
        fontSize: 15,
    },
    bigText_2: {
        fontFamily: FONT.regular,
        fontSize: 15,
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: 13,
    },
    textSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 13,
    },
    textMedium: {
        fontFamily: FONT.medium,
        fontSize: 13,
    },
    textBold: {
        fontFamily: FONT.bold,
        fontSize: 13,
    },
    smallText: {
        fontFamily: FONT.regular,
        fontSize: 12,
    },
    smallTextSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 12,
    },
    smallTextMedium: {
        fontFamily: FONT.medium,
        fontSize: 12,
    },
    smallTextBold: {
        fontFamily: FONT.bold,
        fontSize: 12,
    },
})

export const commonStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLOR.white,
    },
    horizontalView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    horizontalView_m05: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: '1%',
    },
    horizontalView_m1: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: '1.5%',
    },
    justifyView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    justifyView_m05: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '.5%',
    },
    justifyView_m1: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '1%',
    },
    justifyView_m2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '2.5%',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export { wp, hp }