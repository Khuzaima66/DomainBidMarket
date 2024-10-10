import * as React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../../screens';
import Wallet from '../../screens/Wallet';
import Profile from '../../screens/Profile';
import { IMAGES } from '../../assests/images';
import { COLOR } from '../../enums/StyleGuide';

const Tab = createBottomTabNavigator();

export default function BottomBarNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { borderTopStartRadius: 20, borderTopEndRadius: 20, height: 70 },
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
            }}
            initialRouteName='Home'
        >
            <Tab.Screen name="Wallet" component={Wallet}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={IMAGES.Wallet} style={{ height: 33, width: 33, resizeMode: 'contain' }} />
                        </View>
                    )
                }}
            />

            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 79, width: 79, borderRadius: 100, backgroundColor: COLOR.circlegrey, bottom: '50%', elevation: 5 }}>
                            <Image source={IMAGES.Home} style={{ height: 39, width: 39, resizeMode: 'contain', }} />
                        </View>
                    )
                }}
            />

            <Tab.Screen name='Profile' component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={IMAGES.Profile} style={{ height: 28.88, width: 22.69, resizeMode: 'contain' }} />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({

})