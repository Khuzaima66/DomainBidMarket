import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, FONT } from '../../enums/StyleGuide'
import { IMAGES } from '../../assests/images'
import { Button } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../enums/AppEnums'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Onboarding = () => {
  const navigation = useNavigation()

  const handleOnboarding = () => {
    AsyncStorage.setItem("OnBoardingDone", "Completed")
    navigation.navigate(SCREEN.SIGNIN)
  }

  return (
    <View style={styles.container}>

      <View style={styles.SubContainer}>
        <Image source={IMAGES.logo} style={styles.LogoStyle} />
        <Text style={styles.WelcomeTextStyle}>Welcome to{'\n'}Domains Marketplace</Text>
        <Text style={styles.DicoverTextStyle}>Discover domains for sale in our Auctions and Buy Now listings</Text>

        <Button
          title='Continue'
          style={styles.ButtonStyle}
          textStyle={styles.ButtonTextStyle}
          onPress={handleOnboarding}
        />
      </View>

    </View>
  )
}

export default Onboarding

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
  WelcomeTextStyle: {
    fontSize: 24,
    fontFamily: FONT.bold,
    color: COLOR.black,
    textAlign: 'center',
    marginTop: '2%'
  },
  DicoverTextStyle: {
    fontSize: 16,
    fontFamily: FONT.regular,
    color: COLOR.black,
    textAlign: 'center',
    width: '75%',
    alignSelf: 'center',
    marginTop: '3%'
  },
  ButtonStyle: {
    borderWidth: 1,
    backgroundColor: COLOR.white,
    borderColor: COLOR.borderprimary,
    width: 136,
    height: 48,
    marginTop: '10%'
  },
  ButtonTextStyle: {
    color: COLOR.primary
  }
})