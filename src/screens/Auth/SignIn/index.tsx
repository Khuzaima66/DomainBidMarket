import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { IMAGES } from '../../../assests/images';
import { Button } from '../../../components';
import { COLOR, FONT, wp } from '../../../enums/StyleGuide';
import InputText from '../../../components/reuseables/Input';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../../enums/AppEnums';
import axios from 'axios';
import { LoginApi } from '../../api';
import { isEmailValid, isStrongPassword } from '../../../utils/Helper';

const Signin = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        let isValid = true;

        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Please enter your email.");
            isValid = false;
        } else if (!isEmailValid(email)) {
            setEmailError("Invalid email address!");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Please enter your password.");
            isValid = false;
        }
        // else if (!isStrongPassword(password)) {
        //     setPasswordError("Password must be at least 6 characters long and include one uppercase letter, one special character, and one number.");
        //     isValid = false;
        // }

        return isValid;
    };

    const handleLogin = async () => {
        if (!validateFields()) return;
        setLoading(true);
        try {
            const response = await axios.post(LoginApi, {
                email: email,
                password: password,
            });
            const { data } = response;
            console.log("Line56", data)
            if (data) {
                navigation.navigate(SCREEN.OTPSCREEN, { otp_id: data.data.otp_id });
            }
        } catch (error) {
            setEmailError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.SubContainer}>
                <Image source={IMAGES.logo} style={styles.LogoStyle} />
                <Text style={styles.SignInTextStyle}>Sign in to your account</Text>

                <InputText
                    PlaceHolder="E-mail"
                    onChangeText={(e: any) => setEmail(e)}
                    KeyBoard={"email-address"}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <InputText
                    PlaceHolder="Password"
                    onChangeText={(e: any) => setPassword(e)}
                    secureTextEntry={true}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                <Button
                    title={loading ? 'Logging in...' : 'Login'}
                    style={styles.ButtonStyle}
                    onPress={handleLogin}
                    disabled={loading}
                />
            </View>
        </View>
    );
};

export default Signin;

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
    SignInTextStyle: {
        fontSize: 18,
        fontFamily: FONT.bold,
        color: COLOR.black,
        textAlign: 'center',
        marginTop: '2.5%'
    },
    ButtonStyle: {
        marginTop: '4%'
    },
    errorText: {
        color: COLOR.red,
        fontSize: 14,
        marginTop: '1%',
        alignSelf: 'flex-start',
        marginLeft: '5%',
    }
});
