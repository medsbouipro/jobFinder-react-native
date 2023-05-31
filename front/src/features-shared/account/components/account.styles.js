import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AccountCover = styled.View``;
export const FormView = styled.View``;

export const AccountContainer = styled.View`
  flex: 1;
  border-radius: 25px;
  padding: 5%;
  width: 90%;
  background-color: rgba(1, 1, 55, 0.3);
  justify-content: space-between;
  align-items: stretch;
  margin-top: 7%;
`;

export const ButtonsContainer = styled.View.attrs({})``;

export const AuthButton = styled(Button).attrs({
  buttonColor: "#55d1fa",
  textColor: "white",
})`
  margin-vertical: 0px;
  padding: ${(props) => props.theme.space[0]};
`;
export const AuthButtonInverted = styled(Button).attrs({
  buttonColor: "white",
  textColor: "#55d1fa",
})`
  margin-vertical: 0px;
  padding: ${(props) => props.theme.space[0]};
`;

export const BackButton = styled(Button).attrs({
  textColor: "black",
  buttonColor: "#94938d",
})`
  padding: 0;
  width: 30%;
  margin-bottom: 4%;
`;

export const AuthInput = styled(TextInput)`
  widht: 100%;
`;

export const Title = styled(Text)`
  font-size: 30px;
  color: #F6F1F1;
  text-align: center;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
