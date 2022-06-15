import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Popup } from 'react-native-popup-confirm-toast';

import CustomButton from '../../../components/CustomButton/CustomButton';
import { useStyles } from '../PaymentTransfer.style';
import { BASE_URL, getProxyUrl } from '../../../services/common';
import { ApiEndpoint, StatusCode } from '../../../types/enum';
import { universalPostRequestWithData } from '../../../services/RequestHandler';
import { amountToBeDebited } from '../../../services/utility';

const ConfirmPayment = ({theme, navigation, route}) => {
  const {loginData} = useSelector((state: any) => state.user);
  const {transactionDetails} = route.params;
  
  const [progress, setProgress] = useState(false);

  const styles = useStyles(theme);

  const onConfirm = async () => {
    setProgress(true)
    const url = `${BASE_URL}/${ApiEndpoint.EURO_TRANSACTION}`
    const headers = {
        Authorization: `Bearer ${loginData.access_token}`,
    }
    const data = { ...transactionDetails, 'white-label': getProxyUrl() }

    const response = await universalPostRequestWithData(url, data, headers)
    if (response && response.status === StatusCode.OKAY) {
      Popup.show({
        type: 'success',
        title: 'Transfer completed',
        textBody: response.data.message,
        buttonText: 'Go Home',
        callback: () => {
          Popup.hide();
          navigation.navigate('Home');
        },
      })
    }

    setProgress(false)
  }

  const onEdit = () => {
    navigation.navigate("EuroTransfer")
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
      <View style={styles.transactionContainer}>
        <View style={styles.row}>
          <Text style={styles.leftText}>Details</Text>
          <Text style={styles.rightText}>Euro Transfer</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>From</Text>
          <Text style={styles.rightText}>{transactionDetails.fromAccountName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>From IBAN</Text>
          <Text style={styles.rightText}>{transactionDetails.fromAccountIban}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Recipient name</Text>
          <Text style={styles.rightText}>{transactionDetails.toAccountHolderName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>To IBAN</Text>
          <Text style={styles.rightText}>{transactionDetails.toAccountIban}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>To BIC</Text>
          <Text style={styles.rightText}>{transactionDetails.bicCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Amount</Text>
          <Text style={styles.rightText}>{transactionDetails.amount} {transactionDetails.fromCurrency}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Transfer fee</Text>
          <Text style={styles.rightText}>{transactionDetails.feeAmount} {transactionDetails.fromCurrency}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>To be credited</Text>
          <Text style={styles.rightText}>{transactionDetails.amount} {transactionDetails.fromCurrency}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>To be debited</Text>
          <Text style={styles.rightText}>{amountToBeDebited(transactionDetails.amount, transactionDetails.feeAmount)} {transactionDetails.fromCurrency}</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <View style={{width: '50%', paddingHorizontal: 20}}>
          <CustomButton theme={theme} name="Edit" onClick={onEdit} />
        </View>
        <View style={{width: '50%', paddingHorizontal: 20}}>
          <CustomButton theme={theme} name="Confirm" onClick={onConfirm} />
        </View>
      </View>
    </SafeAreaView>
  )
};

export default withTheme(ConfirmPayment);
