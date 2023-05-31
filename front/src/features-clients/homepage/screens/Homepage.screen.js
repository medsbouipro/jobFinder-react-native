// const getWorkers = async () => {
//   try {
//     const response = await axios.get(
//       `http://${ip}/workers/getallworkers/`
//     );
//     setOriginalWorkersArray(response.data);
//     setWorkersArray(response.data);
//   } catch (error) {
//     console.log(error);
//     // Handle error (e.g. display error message to user or retry request)
//   }
// };
import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Search } from "../components/search.component";
import { WorkerCard } from "../components/worker-card.component";
import { WorkersList } from "../components/workers-list.styles";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
const data = [
  { label: "Rating", value: "Rating" },
  { label: "Experience", value: "Experience" },
];
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Ionicons } from "@expo/vector-icons";
import { Section, SectionEnd } from "../components/worker-card.styles";
import { Button } from "react-native-paper";
import { ip } from "../../../services/ip-address/ipaddress";
let preWorkersArray = [];

const fetchWorkers = async () => {
  try {
    const response = await axios.get(`http://${ip}/workers/getallworkers/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

(async () => {
  preWorkersArray = await fetchWorkers();
  preWorkersArray = preWorkersArray.filter(
    (worker) => !!worker.workerAvailability
  );
  console.log("arr", preWorkersArray);
})();

console.log(preWorkersArray);

export default HomepageScreen = ({ navigation, route }) => {
  const [workersArray, setWorkersArray] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { onLogout, mysqlUser } = useContext(AuthenticationContext);
  const handleReset = () => {
    setWorkersArray(preWorkersArray);
  };
  useEffect(() => {
    if (!route.params) setWorkersArray(preWorkersArray);
  }, [preWorkersArray]);

  useEffect(() => {
    if (route.params) {
      setWorkersArray(
        preWorkersArray.filter(
          (e) => e.workerCategory === route.params.category
        )
      );
    }
  }, [route.params]);

  useEffect(() => {
    if (sortBy === "Rating") {
      console.log(sortBy);
      setWorkersArray((prev) =>
        [...prev].sort((a, b) => {
          const aRating =
            a.workerTotalRating && a.workerNumRates
              ? a.workerTotalRating / a.workerNumRates
              : 0;
          const bRating =
            b.workerTotalRating && b.workerNumRates
              ? b.workerTotalRating / b.workerNumRates
              : 0;
          return bRating - aRating;
        })
      );
    }

    if (sortBy === "Experience") {
      setWorkersArray((prev) =>
        [...prev].sort(
          (a, b) => b.workerYearsOfExperience - a.workerYearsOfExperience
        )
      );
    }
  }, [sortBy]);

  const handleSearch = (text) => {
    setSortBy(null);
    if (text) {
      setWorkersArray(
        route.params
          ? preWorkersArray.filter(
              (worker) =>
                worker.workerCategory === route.params.category &&
                worker.workerJob.toLowerCase().includes(text.toLowerCase())
            )
          : preWorkersArray.filter((worker) =>
              worker.workerJob.toLowerCase().includes(text.toLowerCase())
            )
      );
    } else {
      setWorkersArray(
        route.params
          ? preWorkersArray.filter(
              (worker) => worker.workerCategory === route.params.category
            )
          : preWorkersArray
      );
    }
  };

  return (
    <SafeArea>
      <Section style={{ padding: 10 }}>
        <Search handleSearch={handleSearch} />
        <SectionEnd>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
              style={styles.roundImage}
              source={{ uri: mysqlUser.ClientImgUrl||null }}
            />
          </TouchableOpacity>
        </SectionEnd>
      </Section>
      <Section>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Sort"
          value={sortBy}
          onChange={(item) => {
            console.log(item);
            if (item.label === "Rating") {
              setSortBy("Rating");
            } else {
              setSortBy("Experience");
            }
          }}
          style={{
            backgroundColor: "#c2f0b0",
            width: "50%",
            borderRadius: 15,
            paddingHorizontal: 10,
            marginLeft: "5%",
            marginBottom: "5%",
          }}
          containerStyle={{
            backgroundColor: "white",
            width: "100%",
            alignSelf: "flex-start",
          }}
          placeholderStyle={{ color: "gray" }}
          selectedTextStyle={{ color: "green" }}
          renderLeftIcon={() => (
            <Ionicons name="funnel-outline" size={24} color="gray" />
          )}
        />
        <SectionEnd
          style={{
            paddingHorizontal: 10,
            paddingVertical: -4,
            marginLeft: "5%",
            marginBottom: "5%",
          }}
        >
          <Button
            textColor="green"
            onPress={handleReset}
            mode="outlined"
            style={{
              borderWidth: 2,
              borderColor: "green",
              borderRadius: 5,
              paddingHorizontal: 5,
              paddingVertical: -5,
            }}
          >
            Reset
          </Button>
        </SectionEnd>
      </Section>
      <WorkersList
        data={workersArray}
        extraData={sortBy}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("WorkerProfile", {
                  worker: item,
                })
              }
            >
              <Spacer position="bottom" size="large" />
              <WorkerCard worker={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.workerId}
      />
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  roundImage: {
    borderWidth: 3,
    borderColor: "#47A992",
    width: deviceWidth / 7,
    height: deviceHeight / 13,
    borderRadius: 50,
  },
});
