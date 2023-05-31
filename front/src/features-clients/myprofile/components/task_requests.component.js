import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Button } from "react-native-paper";
import axios from "axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AirbnbRating } from "@rneui/base";
import { ip } from "../../../services/ip-address/ipaddress";

const Container = ({ children }) => {
  return <View style={styles.Container}>{children}</View>;
};

const TaskView = ({ children }) => {
  return <TouchableOpacity  style={styles.taskView}>{children}</TouchableOpacity>;
};
const TaskRequest = () => {
  const { user, mysqlUser } = useContext(AuthenticationContext);
  const [rating, setRating] = useState(null);
  const [currentTask, setcurrentTask] = useState(null);
  const [activeTasksSelected, setActiveTasksSelected] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedComment, setCompletedComment] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://${ip}/tasks/getclienttasks/${user.uid}`
        );
        const tasks = response.data;
        setPendingTasks(tasks.filter((e) => e.taskStatus === "pending"));
        setActiveTasks(tasks.filter((e) => e.taskStatus === "active"));
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchTasks();
  }, []);

  const handleMarkAsCompleted = (task) => {
    setcurrentTask(task);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    //make task status complete
    axios
      .put(`http://${ip}/tasks/updatetask/${currentTask.taskId}`, {
        taskStatus: "completed",
      })
      .then((response) => {
        console.log("worker updated:", response.data);
      })
      .catch((err) => console.log(err));
    //get user ratings and then update them
    axios
      .get(`http://${ip}/workers/getworker/${currentTask.workers_workerId}`)
      .then((response) => {
        axios
          .put(
            `http://${ip}/workers/updateworker/${currentTask.workers_workerId}`,
            {
              workerNumRates: response.data[0].workerNumRates + 1,
              workerTotalRating: response.data[0].workerTotalRating + rating,
            }
          )
          .then((response) => {
            console.log("worker updated:", response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log("error getting user info", error);
      });

    const reviewData = {
      clients_clientId: user.uid,
      workers_workerId: currentTask.workers_workerId,
      reviewText: completedComment.trim(),
      reviewRating: rating,
      reviewOwner: mysqlUser.clientFirstName,
      reviewUrl: mysqlUser.ClientImgUrl,
    };
    //add a review
    axios
      .post(`http://${ip}/reviews/addreview/`, reviewData)
      .then((response) => {
        console.log("review added:", response);
        setActiveTasks((prev) =>
          prev.filter((task) => task.taskId !== currentTask.taskId)
        );
        setModalVisible(false);
        setCompletedComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={() => setActiveTasksSelected(false)}
          style={[
            styles.button,
            {
              opacity: activeTasksSelected ? 0.5 : 1,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
        >
          Pending Tasks
        </Button>
        <Button
          mode="contained"
          onPress={() => setActiveTasksSelected(true)}
          style={[
            styles.button,
            {
              opacity: activeTasksSelected ? 1 : 0.5,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          ]}
        >
          Active Tasks
        </Button>
      </View>

      {!activeTasksSelected && (
        <FlatList
          data={pendingTasks}
          renderItem={({ item }) => (
            <TaskView>
              <TouchableOpacity>
                
              </TouchableOpacity>
              {console.log(item.taskDate.slice(0, 10))}
              <Text>
                <Text variant="label" style={{ color: "#5F264A" }}>
                  Worker Name :
                </Text>
                {item.taskWorker}
              </Text>
              <Text>
                <Text variant="label" style={{ color: "#5F264A" }}>
                  Task Title :
                </Text>
                {item.taskTitle}
              </Text>
              <Text>
                <Text variant="label" style={{ color: "#5F264A" }}>
                  Task Date :
                </Text>
                {item.taskDate.slice(0, 10)}
              </Text>
            </TaskView>
          )}
          keyExtractor={(item) => item.taskId}
        />
      )}
      {activeTasksSelected && (
        <FlatList
          data={activeTasks}
          renderItem={({ item }) => (
            <TaskView >
              <Text>
                <Text variant="label" style={{ color: "#5F264A" }}>
                  Worker Name :
                </Text>
                {item.taskWorker}
              </Text>
              <Text>
                <Text variant="label" style={{ color: "#5F264A" }}>
                  Task Title :
                </Text>
                {item.taskTitle}
              </Text>
              <Text>
                <Text variant="label" style={{ color: "#5F264A" }}>
                  Task Date :
                </Text>
                {item.taskDate}
              </Text>
              <Button
                mode="contained"
                onPress={() => handleMarkAsCompleted(item)}
              >
                Mark as Completed
              </Button>
            </TaskView>
          )}
          keyExtractor={(item) => item.taskId}
        />
      )}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={completedComment}
              onChangeText={setCompletedComment}
              placeholder="Enter completion comment..."
              style={styles.input}
            />
            <View
              style={{
                width: "82%",
                height: "25%",
                borderWidth: 1,
                borderRadius: 25,
                marginTop: "1.5%",
                backgroundColor: "#EAECEC",
                borderColor: "#FAA916",
              }}
            >
              <AirbnbRating
                size={20}
                reviewSize={16}
                count={5}
                reviewColor="#C7A27C"
                defaultRating={2}
                reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                onFinishRating={(number) => setRating(number)}
                showRating
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                style={{ marginRight: "5%" }}
                mode="contained"
                onPress={handleSubmit}
              >
                Submit
              </Button>
              <Button
                style={{ marginLeft: "5%" }}
                mode="outlined"
                onPress={handleSubmit}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F1F6F9",
    margin: "2%",
    marginBottom: "1%",
    borderRadius: 10,
  },
  taskView: {
    borderColor: "#088395",
    borderWidth: 1,
    margin: 5,
    padding: 16,
    paddingBottom: "3%",
    paddingTop: "3%",
    borderRadius: 15,
  },
  buttonsContainer: {
    marginTop: "3%",
    marginBottom: "3%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: "45%",
  },
  modalContainer: {
    paddingVertical: "5%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: "75%",
    height: "60%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});

export default TaskRequest;
