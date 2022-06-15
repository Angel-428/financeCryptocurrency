import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, HelperText, withTheme, RadioButton } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectDropdown from 'react-native-select-dropdown';
import countryList from 'react-select-country-list'
import CountryFlag from "react-native-country-flag";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import PhoneInput from "react-native-phone-number-input";
import DatePicker from 'react-native-date-picker'
import { Toast } from 'react-native-popup-confirm-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from "react-redux";

import CustomButton from '../../components/CustomButton/CustomButton';
import { BASE_URL, getProxyUrl } from '../../services/common';
import { UserProfileInterface } from '../../types/interface'
import { ApiEndpoint, StatusCode } from '../../types/enum';
import { useStyles } from './Settings.style'
import { ScrollView } from 'react-native-gesture-handler';
import { universalPostRequestWithData, universalGetRequestWithParams } from '../../services/RequestHandler';
import { validateAge, validatePhone } from '../../services/validators';
import Error from '../../components/error';

const ChangePersonalInfo = ({ theme, navigation }) => {

  const styles = useStyles(theme)

  // variables of components
  const [pageUserProfile, setPageUserProfile] = useState({} as UserProfileInterface)

  const [progress, setProgress] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');

  const listOfCountry = useMemo(() => countryList().getData(), []);

  // validation phone number
  const [isValidMobilePhone, setIsValidMobilePhone] = useState(true)
  const [isValidHomePhone, setIsValidHomePhone] = useState(true)
  const [isValidWorkPhone, setIsValidWorkPhone] = useState(true)

  const mobilePhoneInput = useRef<PhoneInput>(null);
  const homePhoneInput = useRef<PhoneInput>(null);
  const workPhoneInput = useRef<PhoneInput>(null);

  const {loginData} = useSelector((state: any) => state.user);

  useEffect(() => {
    const getUserProfile = async () => {
      const url = `${BASE_URL}/${ApiEndpoint.GET_USER_PROFILE}`

      const response: any = await universalGetRequestWithParams(url)

      if (response.status === StatusCode.OKAY) {
          const userProfile = response.data.data
          setPageUserProfile(userProfile)
      }

      setProgress(false)
    }

    getUserProfile()
  }, [])

  const validateForm = () => {
    return (
        pageUserProfile.first_name &&
        pageUserProfile.last_name &&
        pageUserProfile.address_1 &&
        pageUserProfile.country &&
        pageUserProfile.state &&
        pageUserProfile.city &&
        pageUserProfile.zip_code &&
        validatePhone(pageUserProfile.phone_number) &&
        (validateAge(pageUserProfile.birthdate) > 18)
    )
  }

  const handleSubmit = async () => {
    if (progress === true) {
      return;
    }
    setProgress(true);

    const url = `${BASE_URL}/${ApiEndpoint.UPDATE_USER_PROFILE}`
    const payload = pageUserProfile

    const response: any = await universalPostRequestWithData(url, payload);

    if (response && response.status === StatusCode.OKAY) {
      Toast.show({
        title: 'Change personal info',
        text: response.data.message,
        color: theme.colors.notification,
        timeColor: theme.colors.primary,
        timing: 3000,
        icon: <MaterialCommunityIcons name='check' color={theme.colors.background} size={30}/>,
        position: 'top',
      })
    } else {
      setError(response.data.message);
    }

    setProgress(false)
  }

  const setGender = (value) => (
    setPageUserProfile({
      ...pageUserProfile,
      gender: value,
    })
  )

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={progress}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
        }}
      />
      <ScrollView style={{ width: '100%', paddingHorizontal: 15 }}>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="First name"
            value={pageUserProfile.first_name}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                first_name: value,
              })
            }
          // autoFocus
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="Middle name"
            value={pageUserProfile.middle_name}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                middle_name: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="Last name"
            value={pageUserProfile.last_name}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                last_name: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={[styles.input, styles.bottomLine]}
            label="Email"
            value={pageUserProfile.email}
            disabled={true}
          />
        </View>
        <View style={[styles.genderWrapper]}>
          <Text style={{ color: 'gray' }}>Select Gender</Text>
          <View style={styles.radioWrapper}>
            <TouchableOpacity style={styles.radioOption} onPress={() => setGender('Male')}>
              <RadioButton
                value="Male"
                color='black'
                status={pageUserProfile.gender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Male')}
              />
              <Text>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioOption} onPress={() => setGender('Female')}>
              <RadioButton
                value="Female"
                color='black'
                status={pageUserProfile.gender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Female')}
              />
              <Text>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioOption} onPress={() => setGender('Unknown')}>
              <RadioButton
                value="Unknown"
                color='black'
                status={pageUserProfile.gender === 'Unknown' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Unknown')}
              />
              <Text>Unknown</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="Occupation"
            value={pageUserProfile.occupation}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                occupation: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="Address 1"
            value={pageUserProfile.address_1}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                address_1: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="Address 2"
            value={pageUserProfile.address_2}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                address_2: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="City"
            value={pageUserProfile.city}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                city: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="State/County"
            value={pageUserProfile.state}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                state: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.input}
            label="Postal code/Zipcode"
            value={pageUserProfile.zip_code}
            onChangeText={(value) =>
              setPageUserProfile({
                ...pageUserProfile,
                zip_code: value,
              })
            }
          />
        </View>
        <View style={{ width: '100%' }}>
          <SelectDropdown
            data={listOfCountry}
            onSelect={(selectedItem, index) => {
              setPageUserProfile({
                ...pageUserProfile,
                country: selectedItem,
              })
            }}
            buttonStyle={styles.countryDropdownBtnStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.countryDropdownBtnChildStyle}>
                  <Text style={styles.countryDropdownBtnTxt}>{selectedItem ? selectedItem.label : 'Country'}</Text>
                  <FontAwesomeIcons name="chevron-down" color={theme.colors.text} size={14} />
                </View>
              )
            }}
            dropdownOverlayColor="transparent"
            dropdownStyle={styles.countryDropdownDropdownStyle}
            rowStyle={styles.countryDropdownRowStyle}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View style={styles.countryDropdownRowChildStyle}>
                  <CountryFlag isoCode={item.value} size={25} />
                  <Text style={styles.countryDropdownRowTxt}>{item.label}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{ width: '100%', marginTop: 20 }}>
          
          <Text>Mobile phone number</Text>
          
          <PhoneInput
            ref={mobilePhoneInput}
            defaultCode='US'
            value={pageUserProfile.phone_number}
            onChangeText={(value) => {
              if (mobilePhoneInput.current?.isValidNumber(value)) {
                setPageUserProfile({
                  ...pageUserProfile,
                  phone_number: value,
                })
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
        
        <View style={{ width: '100%', marginTop: 20 }}>
          
          <Text>Home phone number</Text>
          
          <PhoneInput
            ref={homePhoneInput}
            defaultCode="US"
            value={pageUserProfile.home_phone}
            onChangeText={(value) => {
              if (homePhoneInput.current?.isValidNumber(value)) {
                setPageUserProfile({
                  ...pageUserProfile,
                  home_phone: value,
                })
                setIsValidHomePhone(true)
              } else {
                setIsValidHomePhone(false)
              }
            }}
            containerStyle={{ width: '100%', backgroundColor: 'transaprent' }}
            textContainerStyle={{ backgroundColor: 'transaprent' }}
            withDarkTheme
            withShadow
          />

          {!isValidHomePhone && <Text style={{ color: 'red' }}>Invalid phone number</Text>}
        
        </View>

        <View style={{ width: '100%', marginTop: 20 }}>
          
          <Text>Work phone number</Text>
          
          <PhoneInput
            ref={workPhoneInput}
            defaultCode="US"
            value={pageUserProfile.work_phone}
            onChangeText={(value) => {
              if (workPhoneInput.current?.isValidNumber(value)) {
                setPageUserProfile({
                  ...pageUserProfile,
                  work_phone: value,
                })
                setIsValidWorkPhone(true)
              } else {
                setIsValidWorkPhone(false)
              }
            }}
            containerStyle={{ width: '100%', backgroundColor: 'transaprent' }}
            textContainerStyle={{ backgroundColor: 'transaprent' }}
            withDarkTheme
            withShadow
          />
          
          {!isValidWorkPhone && <Text style={{ color: 'red' }}>Invalid phone number</Text>}

        </View>

        <View style={{ width: '100%' }}>
          <Text>Date of birth</Text>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}
          >
            <Text style={{fontSize: 20, letterSpacing: 5}}>
              {pageUserProfile.birthdate}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal open={showDatePicker}
            onConfirm={(date) => {
              setShowDatePicker(false)
              setPageUserProfile({
                ...pageUserProfile,
                birthdate: date.toLocaleDateString("en-US"),
              })
            }}
            onCancel={() => { setShowDatePicker(false) }}
            mode="date"
            // date={new Date(pageUserProfile.birthdate)}
            date={new Date("09/21/1992")}
          />
        </View>
        <Error error={error} />
        <View style={{width: '100%', marginTop: 30}}>
          <CustomButton theme={theme} name="Save" onClick={handleSubmit} state={validateForm()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default withTheme(ChangePersonalInfo);
