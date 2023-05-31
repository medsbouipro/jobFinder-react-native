import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const HistoryScreen = ({ route }) => {
  const tasks = route.params.tasks;

  const renderItem = ({ item }) => (
    <View style={styles.task}>
      <Text style={styles.text}>title :{item.taskTitle}</Text>
      <Text style={styles.text}>status :{item.taskStatus}</Text>
      <Text style={styles.text}>date : {item.taskDate.slice(0,10)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.taskId.toString()}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  task: {
    padding: 10,
    margin: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});