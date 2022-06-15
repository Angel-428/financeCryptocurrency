import { StyleSheet } from 'react-native';

export const useStyles = theme => (StyleSheet.create({
  container: {
    width: '100%',
  },
  transactionContainer: {
    padding: 20
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  genderWrapper: {
    padding: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: theme.colors.text,
  },
  actionsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  input: {
    marginVertical: 10,
    height: 50,
    backgroundColor: "transparent",
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: theme.colors.text,
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
  countryDropdownDropdownStyle: { backgroundColor: '#fff' },
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
