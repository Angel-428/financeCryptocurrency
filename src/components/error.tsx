import React from 'react';
import {StyleSheet, Text} from 'react-native';

type ErrorProps = {
  error: string;
};

const Error = ({error}: ErrorProps) => {
  if (!error) {
    return null;
  }

  return (
    <Text testID="errorBox" style={styles.error}>
      Error: {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default Error;
