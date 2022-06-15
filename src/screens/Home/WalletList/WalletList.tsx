import React, { useEffect, useState } from 'react';
import { Text, withTheme } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import CountryFlag from "react-native-country-flag";
import { useIsFocused } from '@react-navigation/native';

import styles from './WalletList.style';
import { getIsoCodeFromCurrencyName } from '../../../services/common';
import { handleFetchAccountList } from '../../../services/utility';
import { AccountDataInterface } from '../../../types/interface';
import { setAccountList } from '../../../redux/slices/accounts';

const WalletListScreen = ({theme, navigation}) => {
  const isFocused = useIsFocused();
  const [progress, setProgress] = useState(true);

  const {loginData} = useSelector((state: any) => state.user);
  const {accountList} = useSelector((state: any) => state.accounts);
  const dispatch = useDispatch();

  const getAccountList = async () => {
    const fetchedAccountList = await handleFetchAccountList(loginData.entity_id, loginData.access_token)
    dispatch(setAccountList(fetchedAccountList))
    setProgress(false)
  };

  useEffect(() => {
    isFocused && getAccountList();
  }, [isFocused]);

  const showDetails = (index: number) => {
    navigation.navigate('WalletDetails', { walletDetails: accountList[index] })
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
      <ScrollView style={styles.scrollViewStyle}>
        {accountList.map((walletAccount: AccountDataInterface, index: number) => (
          <TouchableOpacity style={[styles.card, {borderLeftColor: theme.colors.primary,}]} onPress={()=>showDetails(index)} key={index}>
            <View style={{marginBottom: 30}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.fontBold}>Account name: </Text>
                <Text>{walletAccount.currencyData.currencyName} card</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.fontBold}>IBAN: </Text>
                <Text>{walletAccount.iBan}</Text>
              </View>
            </View>
            <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{alignItems: 'center', marginLeft: 10}}>
                <CountryFlag isoCode={getIsoCodeFromCurrencyName(walletAccount.currencyData.currencyName)} size={25} />
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.fontBold}>Currency </Text>
                  <Text>{walletAccount.currencyData.currencyName}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={styles.fontBold}>Funds available </Text>
                  <Text style={styles.fontBold}>Reserved available </Text>
                  <Text style={styles.fontBold}>Account available </Text>
                </View>
                <View>
                  <Text>{getSymbolFromCurrency(walletAccount.currencyData.currencyName)}{walletAccount.currencyData.fundsAvailable}</Text>
                  <Text>{getSymbolFromCurrency(walletAccount.currencyData.currencyName)}{walletAccount.currencyData.reservedBalance}</Text>
                  <Text>{getSymbolFromCurrency(walletAccount.currencyData.currencyName)}{walletAccount.currencyData.accountBalance}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default withTheme(WalletListScreen);
