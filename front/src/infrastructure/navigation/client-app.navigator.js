import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SettingsScreen from "../../features-clients/Settings/screens/settings.screen";
import MyProfileScreen from "../../features-clients/myprofile/screens/myprofile.screen";
import AddProfilePicture from "../../features-clients/add-profile-picture/screens/add-profile-picture.screen";
import HomepageScreen from "../../features-clients/homepage/screens/Homepage.screen";
import CategoriesScreen from "../../features-clients/homepage/screens/Categories.screen";
import WorkerProfile from "../../features-clients/worker-profile/screens/worker-profile.screen";
import { TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const ClientAppNavigator = () => (
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
    <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
    <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    <Stack.Screen name="AddProfilePicture" component={AddProfilePicture} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Homepage"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#DB005B",
      tabBarInactiveTintColor: "#068DA9",
      tabBarStyle: {
        backgroundColor: "white",
        borderTopColor: "#47A992",
        borderTopWidth: 2,
        borderWidth:2,
        borderColor:"#47A992"
      },
      tabBarLabelStyle: {
        fontSize: 12,
        margin: 0,
        paddingBottom: 5,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{
        headerTitleAlign: "center",
        headerShown: true,
        tabBarIcon: ({ color, size }) => (
          <Icon name="grid" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Homepage"
      component={HomepageScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="add-circle-outline" size={32} color={color} />
        ),
        tabBarLabel: "",
        tabBarButton: ({ accessibilityRole, onPress, onLongPress }) => {
          const isFocused = useIsFocused();
          return (
            <TouchableOpacity
              style={{
                top: "-5%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                width: "20%",
                zIndex:-1,
                height: "100%",
                borderRadius: 50,
                borderWidth: 2,
                borderColor:  isFocused ? "#DB005B" : "#47A992",
              }}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole={accessibilityRole}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="home"
                size={30}
                color={isFocused ? "#DB005B" : "#47A992"}
              />
            </TouchableOpacity>
          );
        },
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
