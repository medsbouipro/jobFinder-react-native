import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";

export const WorkerrCard = styled(Card)`
  background-color: white;
  width: 96%;
  align-self: center;
  margin-top: 0;
`;

export const WorkerPhoto = styled(Card.Cover)`
  padding: 0.5%;
  background-color: ${(props) => props.theme.colors.palette[4].bgColor(0.64)};
`;

export const WorkerPhotoWrapper = styled.View`
  margin: ${(props) => props.theme.space[0]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

export const Info = styled.View`
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
  
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
export const CardTitle = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
