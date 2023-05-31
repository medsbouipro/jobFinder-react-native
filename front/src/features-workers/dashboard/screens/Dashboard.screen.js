import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components/native";
import Grid from "../components/grid.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import axios from "axios";
import Ratings from "../components/rating.component.js";
import Offers from "../components/offers.components";
import ActiveTasks from "../components/active-task.component";
import { useIsFocused } from "@react-navigation/native";
import Availibility from "../components/availability.component";
import { ip } from "../../../services/ip-address/ipaddress";
import { Button } from "@rneui/base";
import { useStripe } from "@stripe/stripe-react-native";

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
`;

const DashboardScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const isFocused = useIsFocused();
  const { user, mysqlUser,setTrigger } = useContext(AuthenticationContext);
  const [tasks, setTasks] = useState([]);

  const [pendingOffers, setPendingOffers] = useState([]);
  const [activeOffers, setActiveOffers] = useState([]);
  const onCheckout = async () => {
    try {
      const response = await axios.post(`http://${ip}/payments/intents`, {
        amount: 25000,
      });
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "Job Finder",
        paymentIntentClientSecret: response.data.paymentIntent,
      });
      if (initResponse.error) {
        console.log(initResponse.error);
        Alert.alert("Error handling payment");
        return;
      }

      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        Alert.alert("things dont go as expected sometimes");
        return;
      } else {
        axios
          .put(`http://${ip}/workers/updateworker/${user.uid}`, {
            workerAvailability: true,
          })
          .then((response) => {
            setTrigger((prevTrigger) => !prevTrigger);
            console.log("payment successfull:", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTasks = () => {
      axios
        .get(`http://${ip}/tasks/getworkertasks/${user.uid}`)
        .then((response) => {
          console.log(response.data);
          setTasks(response.data);
          setPendingOffers(
            response.data.filter((e) => e.taskStatus === "pending")
          );
          setActiveOffers(
            response.data.filter((e) => e.taskStatus === "active")
          );
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    fetchTasks();
  }, [isFocused]);

  return (
    <SafeArea>
      <Container>
        <ScrollView>
          <Content>
            <Grid
              delay={100}
              icon="check-circle-outline"
              title="Active Tasks"
              colorIndex={3}
              myOpacity={0.5}
              children={<ActiveTasks count={activeOffers.length} />}
              handleGridPress={() =>
                navigation.navigate("ActiveTasksScreen", {
                  activeOffers: activeOffers,
                })
              }
            />
            <Grid
              delay={200}
              icon="eye-circle-outline"
              title="Reviews"
              colorIndex={4}
              myOpacity={0.15}
              handleGridPress={() =>
                navigation.navigate("ReviewsScreen", {
                  pendingOffers: pendingOffers,
                })
              }
            />
            <Grid
              delay={300}
              icon="tag-heart"
              title="Offers Requests"
              colorIndex={2}
              myOpacity={0.2}
              children={<Offers count={pendingOffers.length} />}
              handleGridPress={() =>
                navigation.navigate("OffersScreen", {
                  pendingOffers: pendingOffers,
                })
              }
            />
            {/* <Grid
              delay={600}
              icon="star-circle-outline"
              title="Ratings"
              colorIndex={6}
              alternativeColorIndex={7}
              myOpacity={0.4}
              children={
                <Ratings
                  count={mysqlUser.workerTotalRating / mysqlUser.workerNumRates}
                />
              }
            /> */}
            {/* <Grid
              delay={500}
              icon="calendar-clock"
              title="Deadline"
              colorIndex={0}
              myOpacity={0.3}
            /> */}
            {/* <Grid
              delay={400}
              icon="file-chart"
              title="Reviews"
              colorIndex={5}
              myOpacity={0.4}
            /> */}
            <Grid
              delay={700}
              icon="history"
              title="History"
              colorIndex={1}
              handleGridPress={() =>
                navigation.navigate("HistoryScreen", {
                  tasks: tasks,
                })
              }
              myOpacity={0.2}
            />
            {!mysqlUser?.workerAvailability &&  <Button onPress={onCheckout}>Subscribe To Service</Button>}
          </Content>
        </ScrollView>
      </Container>
    </SafeArea>
  );
};

export default DashboardScreen;
