import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress,textStyle,style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}>
      <Text
        style={textStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
