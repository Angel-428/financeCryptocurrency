import React, { useEffect, useState } from 'react';
import { Text, withTheme } from 'react-native-paper';
import { View, SafeAreaView } from 'react-native';

import styles from './Settings.style';
import CustomButton from '../../../components/CustomButton/CustomButton';

const SettingsScreen = ({theme, navigation}) => {
  const onChangeEmail = () => {
    navigation.navigate('ChangeEmail')
  }

  const onChangePassword = () => {
    navigation.navigate('ChangePassword')
  }

  const onChangePhone = () => {
    navigation.navigate('ChangePhone')
  }

  const onChangePersonalInfo = () => {
    navigation.navigate('ChangePersonalInfo')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 30}}>
        <Text style={styles.fontBold}>Welcome!</Text>
        <Text>You can choose menu from below list to get started.</Text>
      </View>
      <View>
        <CustomButton 
          theme={theme} 
          name="Change email" 
          onClick={onChangeEmail} 
        />
        <CustomButton 
          theme={theme} 
          name="Chnage password" 
          onClick={onChangePassword} 
        />
        <CustomButton 
          theme={theme} 
          name="Change phone" 
          onClick={onChangePhone} 
        />
        <CustomButton 
          theme={theme} 
          name="Chnage personal info" 
          onClick={onChangePersonalInfo}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(SettingsScreen);
