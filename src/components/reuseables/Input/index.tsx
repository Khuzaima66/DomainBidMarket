import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Animated } from "react-native";
import { COLOR, FONT } from "../../../enums/StyleGuide";

interface PropType {
    PlaceHolder?: string;
    onChangeText?: any;
    Icon?: any;
    KeyBoard?: any;
    secureText?: boolean;
    length?: number;
    hideOnpress?: () => void;
    style?: any;
}

const InputText = (Props: PropType) => {
    const {
        PlaceHolder,
        onChangeText,
        Icon,
        KeyBoard,
        secureText,
        length,
        hideOnpress,
        style
    } = Props;

    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState("");

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const labelStyle = {
        position: 'absolute',
        left: '7.8%',
        top: isFocused || text ? '10%' : '30%',
        fontSize: isFocused || text ? 12 : 14,
        color: isFocused || text ? COLOR.inputgrey2 : COLOR.inputgrey,
        fontFamily: isFocused || text ? FONT.semiBold : FONT.medium,
    };

    const handleInputChange = (text: string) => {
        setText(text);
        onChangeText && onChangeText(text);
    };

    return (
        <View style={[styles.MainContainer, style]}>
            <TextInput
                maxLength={length && length}
                secureTextEntry={secureText && secureText}
                keyboardType={KeyBoard && KeyBoard}
                placeholder={""}
                placeholderTextColor={COLOR.inputgrey}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleInputChange}
                style={styles.InputText}
            />
            <Animated.Text style={labelStyle}>
                {PlaceHolder}
            </Animated.Text>
            {Icon && (
                <TouchableOpacity onPress={hideOnpress}>
                    <Image source={Icon} style={styles.IconStyle} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default InputText;

const styles = StyleSheet.create({
    MainContainer: {
        width: "90%",
        height: 53,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLOR.inputbgColor,
        alignSelf: "center",
        paddingHorizontal: "5%",
        marginTop: "5%",
    },
    IconStyle: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    InputText: {
        width: "100%",
        color: COLOR.black,
        fontSize: 14,
        fontFamily: FONT.regular,
        marginTop: '6%',
    },
});
