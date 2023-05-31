import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TaskRequest from "../components/task_requests.component";
import { ScrollView } from "react-native-gesture-handler";
import ImageComponent from "../components/profile-image.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

const MyProfileScreen = () => {
  return (
      <View style={{ flex: 1 ,backgroundColor:"#394867"}}>
        <TaskRequest />
      </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({});
