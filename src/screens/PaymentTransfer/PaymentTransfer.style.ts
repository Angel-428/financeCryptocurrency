import { StyleSheet } from 'react-native';

export const useStyles = theme => (StyleSheet.create({
    container: {
      width: '100%',
    },
    transactionContainer: {
      padding: 20
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10
    },
    leftText: {
      width: '40%',
      fontSize: 18,
      marginRight: 10
    },
    rightText: {
      width: '60%',
      fontSize: 18,
    },
    actionsContainer: {
      marginTop: 30,
      paddingHorizontal: 20,
      flexDirection: 'row',
    }
}));
