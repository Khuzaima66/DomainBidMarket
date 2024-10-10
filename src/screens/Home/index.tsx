import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR, FONT } from '../../enums/StyleGuide';
import { IMAGES } from '../../assests/images';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../enums/AppEnums';
import { styles } from './style';
import { domainData, domainData2, listItems } from '../../data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DomainsApi } from '../api';

const Home = () => {
    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeDomains, setActiveDomains] = useState([]);
    const [upcomingDomains, setUpcomingDomains] = useState([])
    const [closedDomains, setClosedDomains] = useState([])

    const api = async () => {
        try {
            const UserToken = await AsyncStorage.getItem("User_Token");

            if (!UserToken) {
                console.error("Error: User token is null or undefined");
                return;
            }
            console.log("USerToken", UserToken)

            const response = await axios.get(DomainsApi, {
                headers: {
                    Authorization: `Bearer ${UserToken}`
                }
            });

            const domainD = response.data.data.map(domain => {
                // Extract only the time part from the starting_date
                const startingDateTime = new Date(domain.starting_date);
                const timeString = startingDateTime.toTimeString().split(' ')[0]; // Get the time part

                return {
                    domain: domain.domain,
                    startingDate: timeString,
                    id: domain.id
                };
            });

            setActiveDomains(domainD);
            setClosedDomains(domainD);
            setUpcomingDomains(domainD)
            console.log("API Response:", response.data.data);
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    };


    useEffect(() => {
        api()
    }, []);

    const ActiverenderItem = ({ item }) => (
        console.log("line 62::", item.id),
        <TouchableOpacity onPress={() => navigation.navigate(SCREEN.DOMAINSCREEN, { Bid_id: item.id })} style={styles.DomainBox}>
            <Text style={styles.DomainTextStyle}>{item.domain}</Text>
            <View style={styles.DateBidSection}>
                <View style={styles.DateSection}>
                    <Image source={IMAGES.Closed} style={styles.ClockIcon} />
                    <Text style={styles.DateTextStyle}>Starting: {item.startingDate}</Text>
                </View>
                <View style={styles.DateSection}>
                    <Image source={IMAGES.LastBid} style={styles.LastBidIcon} />
                    <Text style={styles.DateTextStyle}>Last bid: $20,000</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // const ActiverenderItem = ({ item }) => (
    //     <TouchableOpacity onPress={() => navigation.navigate(SCREEN.DOMAINSCREEN)} style={styles.DomainBox}>
    //         <Text style={styles.DomainTextStyle}>{item.domain}</Text>
    //         <View style={styles.DateBidSection}>
    //             <View style={styles.DateSection}>
    //                 <Image source={IMAGES.Closed} style={styles.ClockIcon} />
    //                 <Text style={styles.DateTextStyle}>{item.time}</Text>
    //             </View>
    //             <View style={styles.DateSection}>
    //                 <Image source={IMAGES.LastBid} style={styles.LastBidIcon} />
    //                 <Text style={styles.DateTextStyle}>Last bid: {item.lastBid}</Text>
    //             </View>
    //         </View>
    //     </TouchableOpacity>
    // );

    const UpcomingrenderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(SCREEN.DOMAINSCREEN)} style={styles.DomainBox}>
            <Text style={styles.DomainTextStyle}>{item.domain}</Text>
            <View style={styles.DateBidSection}>
                <View style={styles.DateSection}>
                    <Image source={IMAGES.Closed} style={styles.ClockIcon} />
                    <Text style={styles.DateTextStyle}>{item.startingDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const ClosedrenderItem = ({ item }) => {
        const isWon = "Won";
        const textColor = isWon ? COLOR.green : COLOR.red;
        const backgroundColor = isWon ? COLOR.greenBg : COLOR.redBg;

        return (
            <TouchableOpacity onPress={() => navigation.navigate(SCREEN.DOMAINSCREEN)} style={styles.DomainBox}>
                <View style={styles.DomainWonSection}>
                    <Text style={styles.ClosedDomainTextStyle}>{item.domain}</Text>
                    <View style={[styles.WonClosedBox, { backgroundColor }]}>
                        <Text style={[styles.WonClosedText, { color: textColor }]}>Won</Text>
                    </View>
                </View>
                <View style={styles.DateBidSection}>
                    <View style={styles.DateSection}>
                        <Image source={IMAGES.LastBid} style={styles.LastBidIcon} />
                        <Text style={styles.DateTextStyle}>Last bid: $20,000</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };



    const renderContent = () => {
        if (selectedIndex === 0) {
            // Active tab: show FlatList
            return (
                <>
                    <FlatList
                        data={activeDomains}
                        renderItem={ActiverenderItem}
                        contentContainerStyle={{ marginTop: '5%', paddingBottom: '8%' }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
            );
        } else if (selectedIndex === 1) {
            // Upcoming tab: show another view
            return (
                <>
                    <FlatList
                        data={upcomingDomains}
                        renderItem={UpcomingrenderItem}
                        contentContainerStyle={{ marginTop: '5%', paddingBottom: '8%' }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
            );
        } else if (selectedIndex === 2) {
            // Closed tab: show different view
            return (
                <>
                    <FlatList
                        data={closedDomains}
                        renderItem={ClosedrenderItem}
                        contentContainerStyle={{ marginTop: '5%', paddingBottom: '8%' }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
            );
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.TitleTextStyle}>Marketplace</Text>
            <View style={styles.ListContainer}>
                {listItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.ListBox,
                            selectedIndex === index && { backgroundColor: COLOR.inputgrey2 }
                        ]}
                        onPress={() => setSelectedIndex(index)}
                    >
                        <Image
                            source={item.icon}
                            style={[
                                styles.ImageStyle,
                                { tintColor: selectedIndex === index ? COLOR.white : COLOR.inputgrey }
                            ]}
                        />
                        <Text
                            style={[
                                styles.ListTextStyle,
                                selectedIndex === index && { color: COLOR.white }
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Conditionally render content based on selectedIndex */}
            {renderContent()}

        </View>
    );
};

export default Home;
