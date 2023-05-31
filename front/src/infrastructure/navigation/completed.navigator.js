import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CompleteProfileClient from "../../features-clients/complete-profile-client/screens/complete-profile-client.screen";
import CompleteProfileWorker from "../../features-workers/complete-profile-worker/screens/complete-profile-worker.screen";
import PickTypeScreen from "../../features-shared/pick-type/screens/pick-type.screen";

const Stack = createStackNavigator();
export const CompletedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="PickTypeScreen" component={PickTypeScreen} />
    <Stack.Screen name="CompleteProfileClient" component={CompleteProfileClient} />
    <Stack.Screen name="CompleteProfileWorker" component={CompleteProfileWorker} />
  </Stack.Navigator>
);
