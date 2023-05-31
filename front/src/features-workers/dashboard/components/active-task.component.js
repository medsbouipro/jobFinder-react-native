import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
const ActiveTasksView = styled.View`
  margin-top: 10%;
  margin-left: 7%;
`;
const ActiveTasksText = styled.Text`
  font-size: 25px;
`;

const ActiveTasks = ({ count }) => {
  return (
    <ActiveTasksView>
      <ActiveTasksText>You have {count} ActiveTasks </ActiveTasksText>
    </ActiveTasksView>
  );
};

export default ActiveTasks;
