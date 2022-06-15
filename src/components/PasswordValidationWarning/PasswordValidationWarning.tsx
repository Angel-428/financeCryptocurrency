import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {HelperText} from 'react-native-paper';

import { validatePassword } from '../../services/validators';

interface PasswordWarningProps {
  password: string
}

export const PasswordValidationWarning: React.FC<PasswordWarningProps> = ({ password }) => {
  const [condition, setCondition] = useState([] as string[])

  useEffect(() => {
    setCondition(validatePassword(password))
  }, [password])

  return (
    <View>
        {condition.indexOf('min') >= 0 && <HelperText type="error">Minimum length 8 characters.</HelperText>}
        {condition.indexOf('uppercase') >= 0 && <HelperText type="error">At least 1 uppercase letter</HelperText>}
        {condition.indexOf('lowercase') >= 0 && <HelperText type="error">At least 1 lower letter</HelperText>}
        {condition.indexOf('digits') >= 0 && <HelperText type="error">At least 1 digit</HelperText>}
        {condition.indexOf('symbols') >= 0 && <HelperText type="error">At least 1 special character</HelperText>}
        {condition.indexOf('spaces') >= 0 && <HelperText type="error">No space allowed.</HelperText>}
    </View>
  )
}