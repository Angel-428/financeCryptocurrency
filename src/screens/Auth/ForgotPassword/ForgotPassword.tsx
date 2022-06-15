import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { View, SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';
import { Popup } from 'react-native-popup-confirm-toast';
import styles from './ForgotPassword.style';
import Error from '../../../components/error';
import { ApiEndpoint, StatusCode } from '../../../types/enum';
import { BASE_URL, getProxyUrl } from '../../../services/common';
import { universalPostRequestWithData } from '../../../services/RequestHandler';
import CustomButton from '../../../components/CustomButton/CustomButton';

const ForgotPasswordScreen = ({theme, navigation}) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const getOTP = async () => {
    if (progress === true) {
      return;
    }
    setProgress(true);

    const url = `${BASE_URL}/${ApiEndpoint.FORGOT_PASSWORD}`;
    const data = {
      'white-label': getProxyUrl(),
      email: email,
    };

    const response: any = await universalPostRequestWithData(url, data);

    if (response.status === StatusCode.OKAY) {
      Popup.show({
        type: 'success',
        title: 'Forgot Password',
        textBody: response.data.message,
        buttonText: 'OK',
        callback: () => {
          Popup.hide();
        },
      })
    } else {
      setError(response.data.message);
    }

    setProgress(false);
  };

  const backToLogin = () => {
    navigation.navigate('Login')
  }

  const validateInput = () => {
    if (email)
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
      <Text>Recover Password</Text>
      <View style={{width: '100%'}}>
        <TextInput
            autoCapitalize="none"
            outlineColor={theme.colors.background}
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
        />
      </View>
      <Error error={error} />
      <View style={{width: '100%', marginTop: 10}}>
        <CustomButton theme={theme} name="Get OTP" onClick={getOTP} state={validateInput()} />
      </View>
      <View style={{width: '100%', alignItems: "flex-end"}}>
        <Button mode="text" uppercase={false} onPress={backToLogin} color={theme.colors.primary} >
          Back To Login
        </Button>
      </View>
    </SafeAreaView>
  )
};

export default withTheme(ForgotPasswordScreen);
