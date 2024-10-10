import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { IMAGES } from '../../../assests/images'
import { Button } from '../../../components'
import { COLOR, FONT, wp } from '../../../enums/StyleGuide'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { OTPApi } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OTPScreen = ({ route }) => {
    const navigation = useNavigation();
    const { otp_id } = route.params; 
    console.log("Line:: 13",otp_id)
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpInputs = [];
    
    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < 3 && value !== '') {
            otpInputs[index + 1].focus();
        }
    };

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0 && otp[index] === '') {
            otpInputs[index - 1].focus();
        }
    };

    const handleVerifyOtp = async () => {
        console.log("OTP", otp.join(""))
        const enteredOtp = otp.join('');
        console.log("Enter OTP Line 37", typeof enteredOtp)
        if (enteredOtp.length < 4) {
            Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP.');
            return;
        }
        try {
            const response = await axios.post(OTPApi, {
                otp_id: otp_id,
                otp: '2451',
            });
            const { data } = response;
            console.log("OTP Verify Response", data);
            if (data) {
                AsyncStorage.setItem("User_Token", data.data.token)
                navigation.replace('BottomBarNavigation');
            }
        } catch (error) {
            Alert.alert(
                'Verification Failed',
                error.response?.data?.message || 'OTP verification failed. Please try again.'
            );
        }
    };

    for (let i = 0; i < 4; i++) {
        otpInputs.push(
            <TextInput
                key={i}
                style={styles.OTPInputTextStyling}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleChange(i, value)}
                onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(i, key)}
                value={otp[i]}
                ref={(input) => otpInputs[i] = input}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.SubContainer}>
                <Image source={IMAGES.logo} style={styles.LogoStyle} />
                <Text style={styles.VerifyTextStyle}>Verify your account</Text>
                <Text style={styles.AnOtpTextStyle}>
                    An OTP has been sent to your phone number +96650******** to verify your login:
                </Text>

                <View style={styles.OTPSectionStyling}>
                    {otpInputs.map((input, index) => (
                        <View key={index}>{input}</View>
                    ))}
                </View>

                <Button
                    title='Verify'
                    style={styles.ButtonStyle}
                    onPress={handleVerifyOtp} // Call handleVerifyOtp when the button is pressed
                />
            </View>
        </View>
    );
};

export default OTPScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.white,
    },
    SubContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    LogoStyle: {
        height: 79,
        width: 79,
        alignSelf: 'center'
    },
    VerifyTextStyle: {
        fontSize: 18,
        fontFamily: FONT.bold,
        color: COLOR.black,
        textAlign: 'center',
        marginTop: '2.5%'
    },
    AnOtpTextStyle: {
        fontSize: 14,
        fontFamily: FONT.medium,
        color: COLOR.dark,
        paddingHorizontal: '5%',
        paddingTop: '4%'
    },

    OTPSectionStyling: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },
    OTPInputTextStyling: {
        width: 75,
        height: 53,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: COLOR.inputbgColor,
        color: COLOR.black,
        fontFamily: FONT.regular,
    },


    ButtonStyle: {
        marginTop: '5%'
    }
})