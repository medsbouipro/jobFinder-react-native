import "react-native-gesture-handler";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";
import { StripeProvider } from "@stripe/stripe-react-native";
const STRIPE_KEY =
  "pk_test_51NC92JF4LBHDFvi8GjbU8gbLkBJ9gPZn8iuzQofx5ijY4uX9M5BHLFrrmjULskI2SlAEiKZTd5Ud7a0dUXZI1iPb00lLt0c5Hr";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyAAtdPXIxt_Dd4bC0L3ytU8i2UvuIkywLE",
  authDomain: "craftseeker-1b441.firebaseapp.com",
  projectId: "craftseeker-1b441",
  storageBucket: "craftseeker-1b441.appspot.com",
  messagingSenderId: "348806338002",
  appId: "1:348806338002:web:a38cb33dd5391fecfe640b",
};
initializeApp(firebaseConfig);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </StripeProvider>
  );
}
