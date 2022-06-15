import { StyleSheet } from 'react-native'

export const buttonStyle = (buttonBackgroundColor) => StyleSheet.create({
  ButtonStyle: {
    backgroundColor: buttonBackgroundColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 5
  },
})

export const buttonText = () => StyleSheet.create({
  ButtonText: {
    color: 'white',
    textAlign: 'center',
  },
})