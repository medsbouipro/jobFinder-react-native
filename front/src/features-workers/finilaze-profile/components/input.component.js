import React from "react";
import styled from "styled-components/native";

const InputContainer = styled.View`
  margin-vertical: 8px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const InputField = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
`;

const Error = styled.Text`
  color: red;
  font-size: 14px;
  margin-vertical: 4px;
`;

const Input = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  ...props
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputField
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />
      {error && touched && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default Input;