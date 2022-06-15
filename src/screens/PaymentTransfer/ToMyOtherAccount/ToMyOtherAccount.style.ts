import { StyleSheet } from 'react-native';

export const useStyles = theme => (StyleSheet.create({
    container: {
      width: '100%',
    },
    scrollViewStyle: {
      width: '100%',
      paddingHorizontal: 15,
    },
    input: {
      marginVertical: 10,
      height: 50,
      backgroundColor: "transparent",
      borderBottomWidth: 1,
      borderColor: theme.colors.text,
    },
    dropdownBtnStyle: {
      width: '100%',
      height: 50,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderColor: theme.colors.text,
    },
    dropdownBtnChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 18,
    },
    dropdownBtnTxt: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 16,
      marginHorizontal: 12,
    },
    dropdownDropdownStyle: {backgroundColor: '#fff'},
    dropdownRowStyle: {
      backgroundColor: '#fff',
      borderBottomColor: theme.colors.text,
      height: 50,
    },
    dropdownRowChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdownRowTxt: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 24,
      marginHorizontal: 12,
    },
    countryDropdownBtnStyle: {
      width: '100%',
      height: 50,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderColor: theme.colors.text,
    },
    countryDropdownBtnChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 18,
    },
    countryDropdownBtnTxt: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 16,
      marginHorizontal: 12,
    },
    countryDropdownDropdownStyle: {backgroundColor: '#fff'},
    countryDropdownRowStyle: {
      backgroundColor: '#fff',
      borderBottomColor: theme.colors.text,
      height: 50,
    },
    countryDropdownRowChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    countryDropdownRowTxt: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 16,
      marginHorizontal: 12,
    },
}));
