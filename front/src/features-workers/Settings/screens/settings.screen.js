// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Animated,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
// } from "react-native";
// import React, { useContext, useRef, useEffect } from "react";
// import { SafeArea } from "../../../components/utility/safe-area.component";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

// const AnimatedGrid = ({
//   title,
//   icon,
//   colorIndex,
//   handleGridPress,
//   location,
// }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 3000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   return (
//     <TouchableOpacity onPress={handleGridPress}>
//       <Animated.View
//         style={{
//           width: deviceWidth / 1.05,
//           height: deviceHeight / 6,
//           marginBottom: 20,
//           borderRadius: 15,
//           overflow: "hidden",
//           opacity: fadeAnim,
//         }}
//       >
//         <ImageBackground
//           style={{
//             padding: 8,
//             flex: 1,
//             flexDirection: "row",
//             justifyContent: "flex-end",
//             alignItems: "flex-end",
//           }}
//           resizeMode="cover"
//           source={location}
//         >
//           <View>
//             <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
//               {title}
//             </Text>
//             <View
//               style={{ height: 3, backgroundColor: "white", width: "100%" }}
//             />
//           </View>
//           <MaterialCommunityIcons
//             name={icon}
//             color={"white"}
//             size={30}
//             style={{ marginBottom: 5 }}
//           />
//         </ImageBackground>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const SettingsScreen = ({ navigation }) => {
//   const { onLogout, mysqlUser } = useContext(AuthenticationContext);

//   const handleMyProfilePress = () => {
//     navigation.navigate("MyProfile");
//   };

//   const handleEditProfilePress = () => {
//     navigation.navigate("AddProfilePicture");
//   };

//   return (
//     <SafeArea style={{ backgroundColor: "#AFD3E2" }}>
//       <View style={{ margin: 10, flex: 1 }}>
//         <Image
//           style={styles.profilePicture}
//           source={{ uri: mysqlUser.workerImgUrl }}
//         />
//         <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold", color: "#0C134F" ,marginBottom:"5%",marginTop:"-4%"}} >
//           hi {mysqlUser.workerFirstName} !
//         </Text>
//         <AnimatedGrid
//           title="My Profile"
//           location={require("../../../../assets/settings-1.jpg")}
//           icon="account"
//           colorIndex={0}
//           myOpacity={1}
//           handleGridPress={handleMyProfilePress}
//         />
//         <AnimatedGrid
//           title="Add Profile Picture"
//           location={require("../../../../assets/settings-3.jpg")}
//           icon="camera"
//           colorIndex={1}
//           myOpacity={1}
//           handleGridPress={handleEditProfilePress}
//         />
//         <AnimatedGrid
//           title="Sign Out"
//           location={require("../../../../assets/settings-2.jpg")}
//           icon="logout"
//           colorIndex={2}
//           myOpacity={1}
//           handleGridPress={onLogout}
//         />
//       </View>
//     </SafeArea>
//   );
// };

// export default SettingsScreen;

// const styles = StyleSheet.create({
//   profilePicture: {
//     width: deviceWidth / 1.05,
//     height: deviceHeight / 6,
//     marginBottom: 20,
//     borderRadius: 10,
//     width: deviceWidth / 2,
//     alignSelf: "center",
//   },
// });
{
  /* <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold", color: "#0C134F" ,marginBottom:"5%",marginTop:"-4%"}} >
          hi {mysqlUser.clientFirstName} !
        </Text> */
}
{
  /* <AnimatedGrid
          title="My Profile"
          location={require("../../../../assets/settings-1.jpg")}
          icon="account"
          myOpacity={1}
          handleGridPress={handleMyProfilePress}
        />
        <AnimatedGrid
          title="Add Profile Picture"
          location={require("../../../../assets/settings-3.jpg")}
          icon="camera"
          myOpacity={1}
          handleGridPress={handleEditProfilePress}
        />
        <AnimatedGrid
          title="Sign Out"
          location={require("../../../../assets/settings-2.jpg")}
          icon="logout"
          myOpacity={1}
          handleGridPress={onLogout}
        /> */
}
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";

import React, { useContext, useRef, useEffect } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Section, SectionEnd } from "../../../components/Sections";
import * as Font from "expo-font";
import getAge from "../../../components/helpers/getAge";
import { Divider } from "@rneui/themed";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SettingsScreen = ({ navigation }) => {
  const { onLogout, mysqlUser } = useContext(AuthenticationContext);

  console.log(mysqlUser);
  return (
    <>
      <Image
        style={styles.profilePicture}
        source={{ uri: mysqlUser.workerImgUrl }}
      />

      <View style={styles.profileContainer1}>
        <Section style={{ marginBottom: "-4%" }}>
          <Section>
            <Section>
              <Image
                style={styles.roundImage}
                source={{ uri: mysqlUser.workerImgUrl }}
              />
              <Ionicons
                onPress={() => navigation.navigate("AddProfilePicture")}
                style={{
                  borderRadius: 50,
                  padding: 6,
                  position: "absolute",
                  bottom: 0,
                  right: 7,
                }}
                backgroundColor={"#47A992"}
                color="white"
                name="camera"
                size={26}
              />
            </Section>
            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "3%",
                marginTop: "10%",
                marginBottom: "11%",
              }}
            >
              <Text style={{ marginLeft: "8%", marginBottom: "6%" }}>
                {mysqlUser.workerFirstName + " " + mysqlUser.workerLastName}
              </Text>
              <Text style={{ marginLeft: "8%", color: "grey" }}>
                {getAge(mysqlUser.workerDateOfBirth)} Years Old
              </Text>
            </View>
          </Section>
          <SectionEnd style={{ paddingBottom: "22%" }}></SectionEnd>
        </Section>
        <Divider
          style={{
            opacity:0.2,
            marginTop: "8%",
            borderWidth: 0.2,
            width: "103.5%",
            marginRight: "0%",
            alignSelf: "center",
          }}
        />
        <Section
          style={{
            justifyContent: "flex-start",
            marginTop: !mysqlUser.workerAddress?"4%":"10%",
            marginLeft: "10%",
            alignItems: "center",
          }}
        >
          <Ionicons
            style={{ borderRadius: 5, marginRight: "14%" }}
            color="#ada1a1"
            name="location"
            size={24}
          />
          <Text style={{ color: "#ada1a1" }}>
            {mysqlUser.workerAddress || mysqlUser.workerAddress
              ? mysqlUser.workerAddress + ", " + mysqlUser.workerAddress
              : "Please Complete Your Profile Info"}
          </Text>
        </Section>
        <Section
          style={{
            justifyContent: "flex-start",
            marginTop: "4%",
            marginLeft: "10%",
            alignItems: "center",
          }}
        >
          <Ionicons
            style={{ borderRadius: 5, marginRight: "13%" }}
            color="#ada1a1"
            name="call-outline"
            size={24}
          />
          <Text style={{ color: "#ada1a1" }}>
            {mysqlUser.workerPhoneNumber
              ? mysqlUser.workerPhoneNumber
              : "Please Complete Your Profile Info"}
          </Text>
        </Section>
        <Section
          style={{
            justifyContent: "flex-start",
            marginTop: "4%",
            marginLeft: "10%",
            alignItems: "center",
          }}
        >
          <Ionicons
            style={{ borderRadius: 5, marginRight: "13%" }}
            color="#c2b720"
            name="star-half-outline"
            size={24}
          />
          <Text style={{ color: "#ada1a1" }}>
            {mysqlUser.workerTotalRating / mysqlUser.workerNumRates
              ? mysqlUser.workerTotalRating / mysqlUser.workerNumRates
              : "No Ratings Yet"}
          </Text>
        </Section>
        {!mysqlUser.workerAddress && 
        <Divider
          style={{
            opacity: 0.2,
            marginTop: "7%",
            borderWidth: 0.2,
            width: "103.5%",
            marginRight: "0%",
            alignSelf: "center",
          }}
        />}
        <TouchableOpacity
          onPress={() => navigation.navigate("FinaliseScreen")}
          style={{
            backgroundColor: "#ffffff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!mysqlUser.workerAddress && (
            <Section>
              <Text
                style={{ color: "#47A992", fontFamily: "Roboto", fontSize: 18,marginRight:"2%"}}
              >
                Complete Profile
              </Text>
              <Ionicons
                style={{ borderRadius: 5, padding: 2 }}
                backgroundColor={"#47A992"}
                color="white"
                name="pencil-sharp"
                size={15}
              />
            </Section>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer2}>
        <Section
          style={{
            justifyContent: "flex-start",
            marginTop: "4%",
            marginLeft: "10%",
            marginBottom: "4%",

            alignItems: "center",
          }}
        >
          <Text>ACCOUNT</Text>
          <SectionEnd>
            <Ionicons
              onPress={onLogout}
              style={{ borderRadius: 5, padding: 2, marginRight: "2%" }}
              backgroundColor={"#ed1148"}
              color="white"
              name="log-out"
              size={26}
            />
          </SectionEnd>
        </Section>
        <Section
          style={{
            justifyContent: "flex-start",
            marginBottom: "4%",
            marginLeft: "10%",
            alignItems: "center",
          }}
        >
          <Ionicons
            style={{ borderRadius: 5, marginRight: "14%" }}
            color="#ada1a1"
            name="mail-outline"
            size={24}
          />
          <Text style={{ color: "#ada1a1" }}>{mysqlUser.workerEmail}</Text>
        </Section>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  profilePicture: {
    width: deviceWidth,
    height: deviceHeight / 3,
    zIndex: -1,
  },
  roundImage: {
    width: deviceWidth / 4,
    height: deviceHeight / 6.8,
    borderRadius: 50,
    paddingBottom: "10%",
    marginLeft: "10%",
    marginTop: "5%",
  },
  profileContainer1: {
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: "0%",
    width: "95%",
    height: "58%",
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
    top: deviceHeight / 6.5,
    elevation: 4,
    padding: "2%",
  },
  profileContainer2: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: "0%",
    width: "95%",
    height: "20%",
    padding:"3%",
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
    top: deviceHeight / 1.4,
    elevation: 4,
    alignSelf: "center",

  },
});
