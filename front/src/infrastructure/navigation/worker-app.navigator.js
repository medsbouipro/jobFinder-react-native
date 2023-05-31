import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SettingsScreen from "../../features-workers/Settings/screens/settings.screen";
import MyProfileScreen from "../../features-workers/myprofile/screens/myprofile.screen";
import AddProfilePicture from "../../features-workers/add-profile-picture/screens/add-profile-picture.screen";
import DashboardScreen from "../../features-workers/homepage/screens/Dashboard.screen";
import OffersScreen from "../../features-workers/homepage/screens/Offers.screens.js";
import ActiveTasksScreen from "../../features-workers/homepage/screens/active-tasks.screen";
import HistoryScreen from "../../features-workers/homepage/screens/history.screen";
import FinilazeWorkerProfile from "../../features-workers/finilaze-profile/screens/finalize-profile-worker.screen";
import ReviewsScreen from "../../features-workers/homepage/screens/reviews.screen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const WorkerAppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="Main"
      component={TabNavigator}
    />
    <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    <Stack.Screen name="AddProfilePicture" component={AddProfilePicture} />
    <Stack.Screen name="OffersScreen" component={OffersScreen} />
    <Stack.Screen name="ActiveTasksScreen" component={ActiveTasksScreen} />
    <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    <Stack.Screen name="FinaliseScreen" component={FinilazeWorkerProfile} />
    <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} />


  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="cog" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
