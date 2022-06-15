import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { withTheme } from 'react-native-paper';
import { buttonStyle, buttonText } from './CustomButton.style'

export type Props = {
  onClick: () => void,
  name: string,
  theme: any,
  state: 'normal' | 'disabled',
}

const CustomButton: React.FC<Props> = (props) => {
  const getColorFromState = () => {
    if (props.state == 'disabled') {
      return props.theme.colors.disabled;
    } else {
      return props.theme.colors.primary;
    }
  };

  return (
    <TouchableOpacity style={buttonStyle(getColorFromState()).ButtonStyle} onPress={props.onClick} disabled={props.state == 'disabled'}>
      <Text style={buttonText().ButtonText}>{props.name}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

// const CustomButton = ({props: Props, theme}) => {
//   return (
//     <TouchableOpacity style={buttonStyle(theme.backgroundColor).ButtonStyle} onPress={props.onClick}>
//       <Text style={buttonText().ButtonText}>{props.name}</Text>
//     </TouchableOpacity>
//   )
// }

// export default withTheme(CustomButton);


