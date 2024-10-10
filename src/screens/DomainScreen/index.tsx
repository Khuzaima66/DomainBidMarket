import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, FONT } from '../../enums/StyleGuide'
import { IMAGES } from '../../assests/images'
import { useNavigation } from '@react-navigation/native'
import { Scrollable } from '../../components'
import { DomainsApi } from '../api'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// const data = [
//     { name: 'Foo Bar', price: 'SAR 500', time: '2 minutes ago' },
//     { name: 'Joe Doe', price: 'SAR 450', time: '10 minutes ago' },
//     { name: 'Joe Doe', price: 'SAR 450', time: '10 minutes ago' },
//     { name: 'Joe Doe', price: 'SAR 450', time: '10 minutes ago' },
//     { name: 'Joe Doe', price: 'SAR 450', time: '10 minutes ago' },
//     { name: 'Joe Doe', price: 'SAR 450', time: '10 minutes ago' },
//     { name: 'Joe Doe', price: 'SAR 450', time: '10 minutes ago' },
// ];

const DomainScreen = ({ route }) => {
    const navigation = useNavigation()
    const { Bid_id } = route.params
    // console.log("Id", Bid_id)
    


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const UserToken = await AsyncStorage.getItem("User_Token");

                if (!UserToken) {
                    console.error("Error: User token is null or undefined");
                    return;
                }
                console.log("UserToken", UserToken);
                const response = await axios.get(`${DomainsApi}/${Bid_id}/bids`, {
                    headers: {
                        Authorization: `Bearer ${UserToken}`
                    }
                });

                console.log("Line::", response);

                const formattedData = response.data.data.map(item => ({
                    name: item.user.name,
                    price: item.amount,
                    time: item.created_at
                }));

                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.ListBox}>
            <Text style={styles.ListTextStyle}>{item.name}</Text>
            <Text style={styles.ListTextStyle}>{item.price}</Text>
            <Text style={styles.ListTextStyle2}>{item.time}</Text>
        </View>
    );

    const [timeLeft, setTimeLeft] = useState(80000);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return { days, hours, minutes, secs };
    };

    const { days, hours, minutes, secs } = formatTime(timeLeft);

    // const renderItem = ({ item }) => (
    //     <View style={styles.ListBox}>
    //         <Text style={styles.ListTextStyle}>{item.name}</Text>
    //         <Text style={styles.ListTextStyle}>{item.price}</Text>
    //         <Text style={styles.ListTextStyle2}>{item.time}</Text>
    //     </View>
    // );

    return (
        <View style={styles.container}>
            <Scrollable>

                <View style={styles.HeaderStyle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={IMAGES.BackArrow} style={styles.BackArrow} />
                    </TouchableOpacity>
                    <Text style={styles.DomainTextStyle}>Domain.com</Text>
                </View>

                <View style={styles.TimeLeftBox}>
                    <Text style={styles.TimeLeftText}>Time Left</Text>
                </View>

                <View>
                    <Text style={styles.TimeTextStyle}>
                        {`${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
                    </Text>
                    <View style={styles.DaysSection}>
                        <Text style={styles.DaysTitleText}>days</Text>
                        <Text style={styles.DaysTitleText}>hours</Text>
                        <Text style={styles.DaysTitleText}>min</Text>
                        <Text style={styles.DaysTitleText}>sec</Text>
                    </View>
                </View>

                <View style={styles.CurrentBidBox}>
                    <Text style={styles.TimeLeftText}>Current Bid</Text>
                </View>
                <Text style={styles.SarText}>SAR 1,000</Text>

                <View style={styles.PlaceBidContainer}>
                    <View style={styles.SARInputBox}>
                        <Text style={styles.SARTextStyle}>SAR</Text>
                        <TextInput
                            placeholder='1000'
                            placeholderTextColor={COLOR.black}
                            style={styles.SARInputTextStyle}
                            keyboardType='numeric'
                        />
                    </View>
                    <TouchableOpacity style={styles.PlaceBidBox}>
                        <Text style={styles.PlaceBidText}>Place bid</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.CurrentBidBox}>
                    <Text style={styles.TimeLeftText}>Latest Bids</Text>
                </View>

                <View>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ marginTop: '5%', paddingBottom: '10%' }}
                        renderItem={renderItem}
                    />
                </View>

            </Scrollable>
        </View>
    )
}

export default DomainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.white
    },
    HeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '4%',
        paddingLeft: '5%',
        gap: 8
    },
    BackArrow: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
    DomainTextStyle: {
        fontSize: 35,
        fontFamily: FONT.Barlow_semiBold,
        color: COLOR.dark
    },

    TimeLeftBox: {
        height: 40,
        width: 162,
        backgroundColor: COLOR.Blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginTop: '5%'
    },
    TimeLeftText: {
        fontSize: 26,
        fontFamily: FONT.Barlow_medium,
        color: COLOR.white,
        letterSpacing: 3
    },
    TimeTextStyle: {
        fontSize: 41,
        fontFamily: FONT.bold,
        color: COLOR.dark,
        letterSpacing: 6,
        textAlign: 'center',
        paddingHorizontal: '5%'
    },
    DaysSection: {
        flexDirection: 'row',
        paddingHorizontal: '12%',
        justifyContent: 'space-between'
    },
    DaysTitleText: {
        fontSize: 20,
        fontFamily: FONT.Barlow_semiBold,
        color: COLOR.black2
    },

    CurrentBidBox: {
        height: 40,
        width: 190,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.Blue,
        marginLeft: '5%',
        marginTop: '7%'
    },
    SarText: {
        fontSize: 55,
        fontFamily: FONT.Barlow_semiBold,
        color: COLOR.dark,
        paddingHorizontal: '5%',
        letterSpacing: 9
    },
    PlaceBidContainer: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        marginTop: '4%'
    },
    SARInputBox: {
        height: 53,
        width: '65%',
        backgroundColor: COLOR.inputbgColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '4%',
        gap: 3
    },
    SARTextStyle: {
        fontSize: 14,
        fontFamily: FONT.bold,
        color: COLOR.black
    },
    SARInputTextStyle: {
        fontSize: 14,
        fontFamily: FONT.medium,
        color: COLOR.black,
        width: '80%'
    },
    PlaceBidBox: {
        height: 53,
        width: '30%',
        backgroundColor: COLOR.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    PlaceBidText: {
        fontSize: 15,
        fontFamily: FONT.bold,
        color: COLOR.white
    },
    ListBox: {
        width: '90%',
        alignSelf: 'center',
        height: 41,
        backgroundColor: COLOR.white2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        marginBottom: '4%'
    },
    ListTextStyle: {
        fontSize: 14,
        fontFamily: FONT.Barlow_regular,
        color: COLOR.dark
    },
    ListTextStyle2: {
        fontSize: 14,
        fontFamily: FONT.Barlow_regular,
        color: COLOR.dark,
        fontStyle: 'italic'
    }
})
