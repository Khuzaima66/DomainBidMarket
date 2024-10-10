import { StyleSheet } from "react-native";
import { COLOR, FONT } from "../../enums/StyleGuide";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.white
    },
    TitleTextStyle: {
        fontSize: 28,
        fontFamily: FONT.bold,
        color: COLOR.black,
        paddingLeft: '5%',
        paddingTop: '5%'
    },
    ListContainer: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        marginTop: '5%'
    },
    ListBox: {
        height: 38,
        width: '32%',
        backgroundColor: COLOR.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5
    },
    ListTextStyle: {
        fontSize: 15,
        fontFamily: FONT.medium,
        color: COLOR.inputgrey
    },
    ImageStyle: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },

    DomainBox: {
        height: 97,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLOR.white,
        elevation: 2,
        marginBottom: '4%',
        borderRadius: 20
    },
    DomainTextStyle: {
        fontSize: 24,
        fontFamily: FONT.bold,
        color: COLOR.black,
        paddingLeft: '4%',
        paddingTop: '3.5%'
    },
    DateSection: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    DateTextStyle: {
        fontSize: 15,
        fontFamily: FONT.semiBold,
        color: COLOR.grey1
    },
    ClockIcon: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        tintColor: COLOR.grey1
    },
    LastBidIcon: {
        height: 14,
        width: 14,
        resizeMode: 'contain'
    },
    DateBidSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingTop: '5%'
    },

    DomainWonSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        paddingTop: '3.5%'
    },
    ClosedDomainTextStyle: {
        fontSize: 24,
        fontFamily: FONT.bold,
        color: COLOR.black,
    },
    WonClosedBox: {
        padding: '2%',
        backgroundColor: COLOR.greenBg,
        borderRadius: 8
    },
    WonClosedText: {
        fontSize: 12,
        fontFamily: FONT.bold,
        color: COLOR.green
    },
});
