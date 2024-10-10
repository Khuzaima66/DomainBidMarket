import { ScrollView } from 'react-native'
import React, { memo } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { scrollProps } from '../../../enums/Types'

const Scrollable = (props: scrollProps) => {
    const { children, hasInput, horizontal, containerStyle } = props

    if (hasInput) {
        return (
            <KeyboardAwareScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={containerStyle}
                horizontal={horizontal}
                bounces={false}>
                {children}
            </KeyboardAwareScrollView>
        )
    } else {
        return (
            <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: '2%' }, containerStyle]}
                horizontal={horizontal}
                bounces={false}>
                {children}
            </ScrollView>
        )
    }
}

export default memo(Scrollable)