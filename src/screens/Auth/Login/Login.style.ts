import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    button: {
      marginVertical: 20, 
      marginBottom: 15,
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContent: {
      width: '100%',
      fontSize: 24, color: 'white', 
      fontWeight: 'bold'
    },
    image: {
      height: 200,
      width: 200,
      marginVertical: 50
    },
    input: {
      marginVertical: 10, 
      height: 50
    },
});
  