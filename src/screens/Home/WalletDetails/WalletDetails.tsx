import React, { useEffect, useState } from 'react';
import { Text, withTheme } from 'react-native-paper';
import { View, SafeAreaView } from 'react-native';
import CountryFlag from "react-native-country-flag";
import getSymbolFromCurrency from 'currency-symbol-map';

import styles from './WalletDetails.style';
import { getIsoCodeFromCurrencyName } from '../../../services/common';
import CustomButton from '../../../components/CustomButton/CustomButton';

const WalletDetailsScreen = ({theme, navigation, route}) => {
  const {walletDetails} = route.params;

  const validateButton = (acceptable: string) => {
    if (acceptable == 'INTERNATIONAL') {
      if (walletDetails.currencyData.currencyName != 'GBP' && walletDetails.providerName == 'ClearBank (CB)')
        return "normal";
      else
        return "disabled";
    } else if (acceptable == 'ALL')
      return "normal";
    else if (acceptable == walletDetails.currencyData.currencyName)
      return "normal";
    else
      return "disabled";
  }

  const onEuroTransfer = () => {
    navigation.navigate('EuroTransfer', {fromAccount: walletDetails.accountId})
  }

  const onInternational = () => {
    navigation.navigate('InternationalTransfer', {fromAccount: walletDetails.accountId})
  }

  const onUkTransfer = () => {
    navigation.navigate('UkTransfer', {fromAccount: walletDetails.accountId})
  }

  const onToMyOtherAccount = () => {
    navigation.navigate('ToMyOtherAccount', {fromAccount: walletDetails.accountId})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, {borderLeftColor: theme.colors.primary,}]}>
        <View style={{marginBottom: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.fontBold}>Account name: </Text>
            <Text>{walletDetails.currencyData.currencyName} card</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.fontBold}>IBAN: </Text>
            <Text>{walletDetails.iBan}</Text>
          </View>
        </View>
        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center', marginLeft: 10}}>
            <CountryFlag isoCode={getIsoCodeFromCurrencyName(walletDetails.currencyData.currencyName)} size={25} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.fontBold}>Currency </Text>
              <Text>{walletDetails.currencyData.currencyName}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.fontBold}>Funds available </Text>
              <Text style={styles.fontBold}>Reserved available </Text>
              <Text style={styles.fontBold}>Account available </Text>
            </View>
            <View>
              <Text>{getSymbolFromCurrency(walletDetails.currencyData.currencyName)}{walletDetails.currencyData.fundsAvailable}</Text>
              <Text>{getSymbolFromCurrency(walletDetails.currencyData.currencyName)}{walletDetails.currencyData.reservedBalance}</Text>
              <Text>{getSymbolFromCurrency(walletDetails.currencyData.currencyName)}{walletDetails.currencyData.accountBalance}</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <CustomButton 
          theme={theme} 
          name="Transfer between my accounts" 
          state={validateButton("ALL")} 
          onClick={onToMyOtherAccount} 
        />
        <CustomButton 
          theme={theme} 
          name="Euro Transfer" 
          state={validateButton("EUR")} 
          onClick={onEuroTransfer} 
        />
        <CustomButton 
          theme={theme} 
          name="International" 
          state={validateButton("INTERNATIONAL")} 
          onClick={onInternational} 
        />
        <CustomButton 
          theme={theme} 
          name="UK Transfer" 
          state={validateButton("GBP")} 
          onClick={onUkTransfer}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(WalletDetailsScreen);
