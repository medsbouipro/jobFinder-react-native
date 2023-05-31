import React, { useState, useEffect, useRef } from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  View,
} from "react-native";

import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  ButtonsContainer,
  AuthButtonInverted,
} from "../components/account.styles";
import { SafeArea } from "../../../components/utility/safe-area.component";

const image = require("../../../../assets/animation-bg.jpg");
const screenHeight = Dimensions.get("window").height;
import { Section } from "../../../features-clients/homepage/components/worker-card.styles";

export const AccountScreen = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [showLogin, setShowLogin] = useState(false);
  const logo = require("../../../../assets/login-logo.png");

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: screenHeight / 2,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setShowLogin(true);
      }, 1000);
    });
  }, []);

  return (
    <SafeArea>
      {showLogin ? (
        <AccountBackground style={{ paddingBottom: "4%" }}>
          <AccountCover />
          <AccountContainer>
            <View>
              <Image style={{ alignSelf: "center" }} source={logo} />
              <Title style={{ alignSelf: "center",paddingRight:"8%" }}>Job Finder</Title>
            </View>
            <ButtonsContainer
              style={{
                alignSelf: "center",
                bottom: "20%",
                position: "absolute",
              }}
            >
              <AuthButton
                icon="lock-open-outline"
                mode="contained"
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </AuthButton>
              <Spacer size="large">
                <AuthButtonInverted
                  icon="email"
                  mode="contained"
                  onPress={() => navigation.navigate("Register")}
                >
                  Register
                </AuthButtonInverted>
              </Spacer>
            </ButtonsContainer>
            <Spacer size="medium" />
          </AccountContainer>
        </AccountBackground>
      ) : (
        <ImageBackground source={image} style={styles.container}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ translateY: translateY }],
              },
            ]}
          >
            <Animated.Image
              source={logo}
              style={[styles.logo, { opacity: 1 }]}
            />
            <Title style={{ marginBottom: 10, marginRight: 20 }}>
              Job Finder
            </Title>
          </Animated.View>
        </ImageBackground>
      )}
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover", // or 'contain' based on your preference
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
