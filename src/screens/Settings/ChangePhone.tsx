import React, { useState , useRef, useEffect} from 'react';
import { View, Image, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, withTheme } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import { Toast } from 'react-native-popup-confirm-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Error from '../../components/error';
import { useStyles } from './Settings.style';
import { universalPutRequestWithData } from '../../services/RequestHandler';
import { BASE_URL, getProxyUrl } from '../../services/common';
import { ApiEndpoint, StatusCode } from '../../types/enum';
import CustomButton from '../../components/CustomButton/CustomButton';

const ChangePhoneScreen = ({ theme, navigation }) => {
    const styles = useStyles(theme);

    const {loginData} = useSelector((state: any) => state.user);

    const [isValidMobilePhone, setIsValidMobilePhone] = useState(true)
    const [progress, setProgress] = useState(false);
    const [error, setError] = useState('');

    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const newPhoneInput = useRef<PhoneInput>(null);

    const handleChangePhone = async () => {
        if (progress === true) {
            return;
        }
        setProgress(true);

        const url = `${BASE_URL}/${ApiEndpoint.UPDATE_USER_ATTRIBUTE}`;
        const data = {
            userAttributeName: 'phone_number',
            userAttributeValue: newPhoneNumber,
            'white-label': getProxyUrl(),
        };

        const headers = {
            Authorization: `Bearer ${loginData.access_token}`,
        }

        const response: any = await universalPutRequestWithData(url, data, headers);

        if (response && response.status === StatusCode.OKAY) {
            Toast.show({
                title: 'Change phone number',
                text: response.data.message,
                color: theme.colors.notification,
                timeColor: theme.colors.primary,
                timing: 3000,
                icon: <MaterialCommunityIcons name='check' color={theme.colors.background} size={30}/>,
                position: 'down',
            })
            
        } else {
            setError(response.data.message);
        }

        setProgress(false);
    }

    const validateInput = () => {
        if (newPhoneInput.current?.isValidNumber(newPhoneNumber))
            return "normal";
        else
            return "disabled";
    }

    const getCountryCodeFromPhoneNumber = (phoneNumber) => {

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
            <ScrollView style={{width: '100%', paddingHorizontal: 15}}>
                <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Change phone</Text>
                </View>
                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text>Current Phone Number</Text>
                    <PhoneInput
                        defaultCode='US'
                        defaultValue={loginData.phone_number}
                        containerStyle={{ width: '100%', backgroundColor: 'transaprent' }}
                        textContainerStyle={{ backgroundColor: 'transaprent' }}
                        withDarkTheme
                        withShadow
                        disabled
                    />
                </View>
                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text>New Phone Number</Text>
                    <PhoneInput
                        ref={newPhoneInput}
                        defaultCode='US'
                        value={newPhoneNumber}
                        onChangeFormattedText={(value) => {
                            setNewPhoneNumber(value)
                            if (newPhoneInput.current?.isValidNumber(value)) {
                                setIsValidMobilePhone(true)
                            } else {
                                setIsValidMobilePhone(false)
                            }
                        }}
                        containerStyle={{ width: '100%', backgroundColor: 'transaprent' }}
                        textContainerStyle={{ backgroundColor: 'transaprent' }}
                        withDarkTheme
                        withShadow
                    />
                    {!isValidMobilePhone && <Text style={{ color: 'red' }}>Invalid phone number</Text>}
                </View>

                <Error error={error} />
                <View style={{ width: '100%', marginTop: 30 }}>
                    <CustomButton theme={theme} name="Change password" onClick={handleChangePhone} state={validateInput()} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default withTheme(ChangePhoneScreen);