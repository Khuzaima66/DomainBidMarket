import React, { ReactNode } from 'react';
import { TextStyle, ViewStyle, KeyboardTypeOptions } from "react-native"

export interface textProps {
    children: React.ReactNode
    style?: any
}

export interface inputProps {
    placeholder: any,
    keyboardType?: KeyboardTypeOptions
    onChange?: Function
    value?: any
    addLeft?: ReactNode
    addRight?: ReactNode
    style?: ViewStyle
    secureText?: boolean
    onFocus?: () => void,
    onBlur?: () => void,
    textStyle?: TextStyle
    placeholderColor?: string
    multiline?: boolean
    onRightPress?: () => void
    onSubmitEditing?: () => void
    textAlignVertical?: any
}

export interface buttonProps {
    title: string
    style?: ViewStyle
    onPress?: () => void
    activeOpacity?: number
    disabled?: boolean
    textStyle?: Text
}

export interface scrollProps {
    children?: React.ReactNode
    hasInput?: ReactNode
    horizontal?: boolean
    containerStyle?: ViewStyle
}

export interface pressable {
    children: React.ReactNode
    style?: any
    onPress?: () => void
    opacity?: number
}

