import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native"
import * as ui from '../../screens'
import { SCREEN } from '../../enums/AppEnums';
import BottomBarNavigation from '../BottomTabNavigation';

const Stack = createStackNavigator()

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={SCREEN.SPLASH} component={ui.Spalsh} />
                <Stack.Screen name={SCREEN.ONBOARDING} component={ui.Onboarding} />
                <Stack.Screen name={SCREEN.SIGNIN} component={ui.Signin} />
                <Stack.Screen name={SCREEN.OTPSCREEN} component={ui.OTPScreen} />
                <Stack.Screen name='BottomBarNavigation' component={BottomBarNavigation} />
                <Stack.Screen name={SCREEN.DOMAINSCREEN} component={ui.DomainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation