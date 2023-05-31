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

const AnimatedGrid = ({ title, icon, handleGridPress, location }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        CustomFont: require("../../../../assets/fonts/Roboto-Bold.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  if (!fontLoaded) {
    return <View />;
  }

  return (
    <TouchableOpacity onPress={handleGridPress}>
      <View
        style={{
          width: deviceWidth / 1.05,
          height: deviceHeight / 6,
          marginBottom: 20,
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          style={{
            padding: 8,
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          resizeMode="cover"
          source={location}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              {title}
            </Text>
            <View
              style={{ height: 3, backgroundColor: "white", width: "100%" }}
            />
          </View>
          <MaterialCommunityIcons
            name={icon}
            color={"white"}
            size={30}
            style={{ marginBottom: 5 }}
          />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { onLogout, mysqlUser } = useContext(AuthenticationContext);

  const handleMyProfilePress = () => {
    navigation.navigate("MyProfile");
  };

  const handleEditProfilePress = () => {
    navigation.navigate("AddProfilePicture");
  };

  return (
    <>
      <Image
        style={styles.profilePicture}
        source={{ uri: mysqlUser.ClientImgUrl }}
      />

      <View style={styles.profileContainer1}>
        <Section style={{marginBottom:"-6%"}}>
          <Section>
            <Section>
              <Image
                style={styles.roundImage}
                source={{ uri: mysqlUser.ClientImgUrl }}
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
                {mysqlUser.clientFirstName + " " + mysqlUser.clientLastName}{" "}
              </Text>
              <Text style={{ marginLeft: "8%", color: "grey" }}>
                {getAge(mysqlUser.clientDateOfBirth)} Years Old
              </Text>
            </View>
          </Section>
          <SectionEnd style={{ paddingBottom: "22%" }}>
          </SectionEnd>
        </Section>
        <Divider
          style={{
            marginTop: "8%",
            borderWidth: 0.2,
            opacity:0.2,
            width: "103.5%",
            marginRight: "0%",
            alignSelf: "center",
          }}
        />
        <Section
          style={{
            justifyContent: "flex-start",
            marginTop: "4%",
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
            {mysqlUser.clientAddress + ", " + mysqlUser.clientCity}
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
            style={{ borderRadius: 5, marginRight: "14%" }}
            color="#ada1a1"
            name="call-outline"
            size={24}
          />
          <Text style={{ color: "#ada1a1" }}>{mysqlUser.clientPhone}</Text>
        </Section>
        <Divider
          style={{
            marginTop: "7%",
            borderWidth: 0.2,
            width: "103.5%",
            marginRight: "0%",
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          onPress={handleMyProfilePress}
          style={{
            backgroundColor: "#ffffff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Section>
            <Ionicons
              style={{ borderRadius: 5, padding: 2,marginRight:15 }}
              backgroundColor={"#47A992"}
              color="white"
              name="list-outline"
              size={22}
            />
            <Text
              style={{ color: "#47A992", fontFamily: "Roboto", fontSize: 17 }}
            >
              MY TASKS
            </Text>
          </Section>
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
            marginTop: "4%",
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
          <Text style={{ color: "#ada1a1" }}>{mysqlUser.clientEmail}</Text>
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
    height: deviceHeight / 7.5,
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
    height: "48%",
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
    height: "23%",
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
    top: deviceHeight / 1.65,
    elevation: 4,
    alignSelf: "center",

    padding: "2%",
  },
});
