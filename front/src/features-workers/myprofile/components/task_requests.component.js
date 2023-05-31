import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const RequestsView = styled.View`
  padding: 1%;
  padding-top: 3%;
  flex: 1;
  background-color: #9acdea;
  margin: 2%;
  border-radius: 15px;
`;
const Content = styled.ScrollView`
  padding: 1%;
  padding-left: 3%;
  flex: 1;
  margin: 2%;
`;

const TaskRequest = () => {
  const { mysqlUser } = useContext(AuthenticationContext);
  const [tasksHistorySelected, setTasksHistorySelected] = useState(false);

  return (
    <RequestsView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          mode="contained"
          onPress={() => setTasksHistorySelected(false)}
          style={{
            opacity: tasksHistorySelected ? 0.5 : 1,
            width: "45%",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          My Biographie
        </Button>
        <Button
          mode="contained"
          onPress={() => setTasksHistorySelected(true)}
          style={{
            opacity: tasksHistorySelected ? 1 : 0.5,
            width: "45%",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          Pro Summary
        </Button>
      </View>

      {!tasksHistorySelected && (
        <Content>
          <Text>{mysqlUser.workerBio || null}</Text>
        </Content>
      )}

      {tasksHistorySelected && (
        <Content>
          <Text>{mysqlUser.workerProfessionalSummary || null}</Text>
        </Content>
      )}
    </RequestsView>
  );
};

export default TaskRequest;

const styles = StyleSheet.create({});
