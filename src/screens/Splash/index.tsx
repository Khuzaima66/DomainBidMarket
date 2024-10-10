import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../enums/AppEnums'
import { styles } from './style'
import { IMAGES } from '../../assests/images'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Spalsh = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      handleSplash()
    }, 4500)
  })

  const handleSplash = async () => {
    const Onboarding = await AsyncStorage.getItem("OnBoardingDone")
    const UserToken = await AsyncStorage.getItem("User_Token")
    console.log(UserToken)
    if (Onboarding === "Completed") {
      if (UserToken) {
        navigation.replace("BottomBarNavigation")
      } else {
        navigation.replace("Signin")
      }
    } else {
      navigation.replace(SCREEN.ONBOARDING)
    }
  }

  return (
    <View style={styles.container}>
      <FastImage source={IMAGES.Splash} resizeMode='cover' style={styles.LogoStyle} />
    </View>
  )
}

export default Spalsh