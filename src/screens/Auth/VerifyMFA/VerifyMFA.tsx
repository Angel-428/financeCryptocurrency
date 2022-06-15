import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, TextInput, withTheme } from 'react-native-paper';
import jwt_decode from "jwt-decode";
import { Popup } from 'react-native-popup-confirm-toast';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './VerifyMFA.style';
import Error from '../../../components/error';
import { BASE_URL, CORP_WALLET_USER_PROFILE_LIST } from '../../../services/common';
import { ApiEndpoint, StatusCode } from '../../../types/enum';
import { universalPostRequestWithData } from '../../../services/RequestHandler';
import { LoginData } from '../../../types/interface';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { MfaVerify, Logout } from '../../../redux/slices/userSlice';

const getLoginDataFromToken = (token: string) => {
  if (!token) return {}
  const data: any = jwt_decode(token)
  const newData = {}
  Object.entries(data).forEach(([key, value]) => {
      if (key.includes('custom')) {
          key = key.split('custom:')[1]
      }
      if (value === 'False') {
          value = false
      }
      if (value === 'True') {
          value = true
      }
      newData[key] = value
  })

  return newData
}

const VerifyMFAScreen = ({theme, navigation}) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const {loginData} = useSelector((state: any) => state.user);

  const verifyMFA = async () => {
    if (progress === true) {
      return;
    }
    setProgress(true);

    const url = `${BASE_URL}/${ApiEndpoint.VERIFY_MFA_OTP}`;
    const data = {
      otp,
      is_first_login: loginData['is_first_login'],
      is_mfa_active: loginData['is_mfa_active'],
      session_key: loginData['session_key'],
      username: loginData['username'],
    };

    const response = await universalPostRequestWithData(url, data)
    if (response && response.status === StatusCode.OKAY) {
      const data: LoginData = response.data.data
      data['expiry_time'] = Date.now() + data.expires_in * 1000
      data['login_time'] = Date.now()

      const newData = { ...data, access_token: data.access_token, ...getLoginDataFromToken(data.id_token) }

      if (CORP_WALLET_USER_PROFILE_LIST.includes(newData.current_profile)) {
        AsyncStorage.setItem('loginData', JSON.stringify(newData))
        dispatch(MfaVerify(newData));
  
        navigation.navigate('Home')
      } else {
        setOtp('');
        
        await AsyncStorage.clear();
        Popup.show({
          type: 'warning',
          title: 'Invalid Login',
          textBody: 'Your account is not enabled for native mobile access. Please login via pc or tablet.',
          buttonText: 'OK',
          callback: () => {
            Popup.hide();
            dispatch(Logout());
            navigation.navigate('Login');
          },
          confirmButtonStyle: {display: 'none'}
        })
        
      }
    } else {
      setError(response.data.message)
    }

    setProgress(false);
  };

  const backToLogin = () => {
    navigation.navigate('Login')
  }

  const validateInput = () => {
    if (otp)
      return "normal";
    else
      return "disabled";
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
          visible={progress}
          textContent={'Loading...'}
          textStyle={{
            color: '#FFF',
        }}
      />
      <View style={{width: '100%'}}>
        <TextInput
          autoCapitalize="none"
          outlineColor={theme.colors.background}
          style={styles.input}
          label="Enter code from authenticator"
          value={otp}
          onChangeText={text => setOtp(text)}
        />
      </View>
      <Error error={error} />
      <View style={{width: '100%', marginTop: 10}}>
        <CustomButton theme={theme} name="Verify MFA" onClick={verifyMFA} state={validateInput()} />
      </View>
      <View style={{width: '100%', alignItems: "flex-end"}}>
        <Button mode="text" uppercase={false} onPress={backToLogin} color={theme.colors.primary} >
          Back To Login
        </Button>
      </View>
    </SafeAreaView> 
  )
};

export default withTheme(VerifyMFAScreen);
