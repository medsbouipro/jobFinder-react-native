import React from "react";
import { Text, Dimensions, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const viewSize = Dimensions.get("window").width / 2 - 15;

const GridContainer = styled(Animatable.View)`
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 1%;
  width: ${viewSize}px;
  height: ${viewSize * 1}px;
  margin-bottom: 20px;
  border-radius: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(props) =>
    props.theme.colors.palette[props.colorIndex].bgColor(props.myOpacity)};
`;
const Touch = styled.TouchableOpacity`
`;

const Description = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 15px;
`;

const Underline = styled.View`
  height: 3px;
  background-color: black;
  width: 100%;
`;

const Icon = styled(MaterialCommunityIcons)`
  color: ${(props) =>
    props.theme.colors.palette[props.colorIndex].bgColor(props.myOpacity)};
  font-size: 30px;
  margin-bottom: 5px;
`;

const Grid = ({
  handleGridPress,
  delay,
  icon,
  title,
  colorIndex,
  myOpacity,
  alternativeColorIndex,
  children,
}) => {
  return (
    <Touch onPress={handleGridPress}>
      <GridContainer
        myOpacity={myOpacity}
        colorIndex={colorIndex}
        animation="bounceIn"
        delay={delay}
      >
        <Description>
          <Icon
            name={icon}
            colorIndex={alternativeColorIndex || colorIndex}
            myOpacity={myOpacity * 50}
          />
          <View>
            <Title>{title}</Title>
            <Underline />
          </View>
        </Description>
        {children}
      </GridContainer>
    </Touch>
  );
};

export default Grid;
