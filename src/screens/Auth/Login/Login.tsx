import React, {useState} from 'react';
import {View, Image, StatusBar, SafeAreaView} from 'react-native';
import {TextInput, Button, Text, withTheme} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from '../../../components/error';
import {useDispatch} from 'react-redux';
import {Login} from '../../../redux/slices/userSlice';
import styles from './Login.style';
import logoImage from '../../../assets/images/logo.png';
import { universalPostRequestWithData } from '../../../services/RequestHandler';
import { BASE_URL, getProxyUrl } from '../../../services/common';
import { ApiEndpoint, StatusCode } from '../../../types/enum';
import { LoginData } from '../../../types/interface';
import CustomButton from '../../../components/CustomButton/CustomButton';

const LoginScreen = ({theme, navigation}) => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    if (progress === true) {
      return;
    }
    setProgress(true);

    const url = `${BASE_URL}/${ApiEndpoint.LOGIN}`;
    const data = {
      username,
      password,
      'white-label': getProxyUrl(),
    };

    const response: any = await universalPostRequestWithData(url, data);

    if (response && response.status === StatusCode.OKAY) {
      const data: LoginData = response.data.data;
      dispatch(Login(data));

      setUserName('');
      setPassword('');
      setError('');

      navigation.navigate('VerifyMFA');
    } else {
      setUserName('');
      setPassword('');
      setError(response.data.message);
    }

    setProgress(false);
  }

  const forgotPassword = () => {
    setProgress(false);
    setUserName('');
    setPassword('');
    setError('');
    navigation.navigate('ForgotPassword')
  };

  const forgotUsername = () => {
    setProgress(false);
    setUserName('');
    setPassword('');
    setError('');
    navigation.navigate('ForgotUsername')
  };

  const validateInput = () => {
    if (username && password)
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
      <View style={{width: '100%', alignItems: 'center'}}>
        <StatusBar hidden />
        <Image
          style={styles.image}
          source={logoImage}
          resizeMode="contain"
        />
        <Text>Sign in to your account</Text>
        <View style={{width: '100%'}}>
          <TextInput
            autoCapitalize="none"
            outlineColor={theme.colors.background}
            style={styles.input}
            label="Username or email"
            value={username}
            onChangeText={text => setUserName(text)}
          />
        </View>
        <View style={{width: '100%'}}>
          <TextInput
            outlineColor={theme.colors.background}
            style={styles.input}
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <Error error={error} />
        <View style={{width: '100%', marginTop: 10}}>
          <CustomButton theme={theme} name="Login" onClick={login} state={validateInput()} />
        </View>
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <Button mode="text" onPress={forgotUsername}>
            Forgot Username?
          </Button>
        </View>
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <Button mode="text" onPress={forgotPassword}>
            Forgot Password?
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(LoginScreen);
