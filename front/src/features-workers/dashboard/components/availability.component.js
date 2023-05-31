import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { ip } from "../../../services/ip-address/ipaddress";

const Availibility = ({ wId, wAv }) => {
  console.log(wAv);
  const [isAvailable, setIsAvailable] = useState(wAv);

  const toggleSwitch = () => {
    if (isAvailable) {
      axios
        .put(`http://${ip}/workers/updateworker/${wId}`, {
          workerAvailability: "false",
        })
        .then((response) => {
          setIsAvailable((previousState) => !previousState);
          console.log("availability updated :", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`http://${ip}/workers/updateworker/${wId}`, {
          workerAvailability: "true",
        })
        .then((response) => {
          setIsAvailable((previousState) => !previousState);
          console.log("availability updated :", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text>{!isAvailable ? "Busy" : "Ready for Work"}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isAvailable ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isAvailable}
      />
    </View>
  );
};

export default Availibility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
