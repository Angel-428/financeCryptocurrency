import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';
import styles from './ResetPassword.style';
import Error from '../../../components/error';
import { ApiEndpoint, StatusCode } from '../../../types/enum';
import { BASE_URL } from '../../../services/common';
import { universalPostRequestWithData } from '../../../services/RequestHandler';
import CustomButton from '../../../components/CustomButton/CustomButton';

const ResetPasswordScreen = ({theme, navigation}) => {
  const dispatch = useDispatch();
  const {access_token} = useSelector((state: any) => state.user);

  const [progress, setProgress] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState('');

  const resetPassword = async () => {
    if (progress === true) {
      return;
    }
    setProgress(true);

    const url = `${BASE_URL}/${ApiEndpoint.FORGOT_PASSWORD}`;
    const data = {
      new_password: newPassword,
      old_password: oldPassword
    };
    const headers = {
      Authorization: `Bearer ${access_token}`,
    }

    const response: any = await universalPostRequestWithData(url, data, headers);

    if (response.status === StatusCode.OKAY) {
      setError('Password changed successfully.');
    } else {
      setError(response.data.message);
    }

    setProgress(false);
  };

  const backToLogin = () => {
    navigation.navigate('Login')
  }

  const validateInput = () => {
    if (oldPassword && newPassword && newPassword2)
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
      <Text>Reset Password</Text>
      <View style={{width: '100%'}}>
        <TextInput
            autoCapitalize="none"
            outlineColor={theme.colors.background}
            style={styles.input}
            label="Old Password"
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
        />
      </View>
      <View style={{width: '100%'}}>
        <TextInput
            autoCapitalize="none"
            outlineColor={theme.colors.background}
            style={styles.input}
            label="New Password1"
            value={oldPassword}
            onChangeText={text => setNewPassword(text)}
        />
      </View>
      <View style={{width: '100%'}}>
        <TextInput
            autoCapitalize="none"
            outlineColor={theme.colors.background}
            style={styles.input}
            label="New Password2"
            value={oldPassword}
            onChangeText={text => setNewPassword2(text)}
        />
      </View>
      <Error error={error} />
      <View style={{width: '100%', marginTop: 10}}>
        <CustomButton theme={theme} name="Reset Password" onClick={resetPassword} state={validateInput()} />
      </View>
      <View style={{width: '100%', alignItems: "flex-end"}}>
        <Button mode="text" uppercase={false} onPress={backToLogin} color={theme.colors.primary} >
          Back To Login
        </Button>
      </View>
    </SafeAreaView>
  )
};

export default withTheme(ResetPasswordScreen);
