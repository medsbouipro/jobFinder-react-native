import React, { useState, useContext, useLayoutEffect } from "react";
import { ScrollView, Modal, Text, View, Alert, FlatList } from "react-native";
import { List, Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import axios from "axios";
import { WorkerCard } from "../../homepage/components/worker-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components/native";
import { ip } from "../../../services/ip-address/ipaddress";
import ReviewCard from "../../../components/one-review/one-review.component";
const ReqButton = styled(Button)`
  background-color: #007aff;
  border-radius: 4px;
  padding: ${(props) => props.theme.space[0]};
  margin: ${(props) => props.theme.space[2]};
`;

const WorkerProfile = ({ route, navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [expansion, setExpansion] = useState({
    summaryExpanded: false,
    biographieExpanded: false,
    reviewsExpanded: false,
  });
  const [reviewsArray, setReviewsArray] = useState([]);

  const validationSchema = yup.object().shape({
    taskTitle: yup.string().required("Task Title is required"),
    taskDescription: yup.string().required("Task Description is required"),
  });

  const handleSubmit = async (values) => {
    const taskData = {
      taskWorker: route.params.worker.workerFirstName,
      clients_clientId: user.uid,
      workers_workerId: route.params.worker.workerId,
      taskTitle: values.taskTitle.trim(),
      taskText: values.taskDescription.trim(),
      taskStatus: "pending",
      taskDate: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(`http://${ip}/tasks/addtask`, taskData);
      console.log("task added:", response.data);
      navigation.navigate("Homepage");
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://${ip}/reviews/getreview/${route.params.worker.workerId}`
      );
      setReviewsArray(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    fetchReviews();

    navigation.setOptions({
      title: `${route.params.worker.workerFirstName} Profile`,
    });
  }, [navigation, route]);

  const renderReviewItem = ({ item }) => (
    <List.Item
      title={item.reviewText}
      description={`Rating: ${item.reviewRating}`}
    />
  );

  return (
    <ScrollView style={{ backgroundColor: "#FFF4EC" }}>
      <Spacer position="top" size="medium" />
      <WorkerCard worker={route.params.worker} />
      <Spacer position="top" size="large" />
      <List.Accordion
        title="Professional Summary"
        left={(props) => <List.Icon {...props} icon="bookshelf" />}
        expanded={expansion.summaryExpanded}
        onPress={() =>
          setExpansion((prevExpansion) => ({
            ...prevExpansion,
            summaryExpanded: !prevExpansion.summaryExpanded,
          }))
        }
      >
        <Text>{route.params.worker.workerProfessionalSummary}</Text>
      </List.Accordion>
      <List.Accordion
        title="Biography"
        left={(props) => <List.Icon {...props} icon="feather" />}
        expanded={expansion.biographieExpanded}
        onPress={() =>
          setExpansion((prevExpansion) => ({
            ...prevExpansion,
            biographieExpanded: !prevExpansion.biographieExpanded,
          }))
        }
      >
        <Text>{route.params.worker.workerBio}</Text>
      </List.Accordion>
      <List.Accordion
        title="Reviews"
        left={(props) => <List.Icon {...props} icon="star" />}
        expanded={expansion.reviewsExpanded}
        onPress={() =>
          setExpansion((prevExpansion) => ({
            ...prevExpansion,
            reviewsExpanded: !prevExpansion.reviewsExpanded,
          }))
        }
      >
        {reviewsArray.length > 0 ? (
          <ScrollView>
            {reviewsArray.map((review, i) => {
              return (
                <View key={i} style={{marginRight:"12%"}}>
                  <ReviewCard  review={review} />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text>Sorry no review :\ </Text>
        )}
        {/* <FlatList
          data={reviewsArray}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.reviewId.toString()}
        /> */}
      </List.Accordion>
      <ReqButton
        icon="handshake"
        mode="contained"
        onPress={() => setModalVisible(true)}
      >
        Request Service
      </ReqButton>
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={{ backgroundColor: "#AFD0D6", flex: 1 }}>
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>
              Request Service
            </Text>
            <Formik
              initialValues={{ taskTitle: "", taskDescription: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <TextInput
                    style={{ marginVertical: 10 }}
                    label="Task Title"
                    onChangeText={handleChange("taskTitle")}
                    onBlur={handleBlur("taskTitle")}
                    value={values.taskTitle}
                    error={touched.taskTitle && errors.taskTitle}
                  />
                  {touched.taskTitle && errors.taskTitle && (
                    <Text>{errors.taskTitle}</Text>
                  )}

                  <TextInput
                    style={{ marginVertical: 10 }}
                    label="Task Description"
                    multiline
                    numberOfLines={5}
                    onChangeText={handleChange("taskDescription")}
                    onBlur={handleBlur("taskDescription")}
                    value={values.taskDescription}
                    error={touched.taskDescription && errors.taskDescription}
                  />

                  {touched.taskDescription && errors.taskDescription && (
                    <Text>{errors.taskDescription}</Text>
                  )}

                  <Button
                    style={{ marginVertical: 10 }}
                    mode="contained"
                    onPress={handleSubmit}
                  >
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default WorkerProfile;
