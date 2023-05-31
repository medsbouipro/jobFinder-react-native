import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Keyboard } from "react-native";

import {
  AccountBackground,
  AccountCover,
  AuthButtonInverted,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  BackButton,
  Title,
  ButtonsContainer,
  FormView,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(false);

  const { onLogin, error, setError, isLoading } = useContext(
    AuthenticationContext
  );
  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setFocus(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setFocus(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <SafeArea>
      <AccountBackground>
        {!isLoading ? (
          <ScrollView
            style={{ width: "100%", height: "100%" }}
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            <AccountContainer>
              {!focus && <Title>CraftSeeker</Title>}
              <FormView>
                <AuthInput
                  label="E-mail"
                  value={email}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(u) => setEmail(u)}
                
                />
                <Spacer size="large" />
                <AuthInput
                  label="Password"
                  value={password}
                  textContentType="password"
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={(p) => setPassword(p)}
                  onSubmitEditing={() => onLogin(email, password)}
                />
                {error && (
                  <ErrorContainer size="large">
                    <Text variant="error">{error}</Text>
                  </ErrorContainer>
                )}
                <Spacer size="large" />
              </FormView>

              <ButtonsContainer>
                <AuthButton
                  icon="lock-open-outline"
                  mode="contained"
                  onPress={() => onLogin(email, password)}
                >
                  Login
                </AuthButton>
              </ButtonsContainer>
            </AccountContainer>
            <Spacer size="large" />
            {!focus && (
              <BackButton
                mode="contained"
                icon="keyboard-backspace"
                onPress={() => {
                  setError(null);
                  navigation.goBack();
                }}
              >
                Back
              </BackButton>
            )}
          </ScrollView>
        ) : (
          <ActivityIndicator animating={true} color={MD2Colors.blue300} />
        )}
      </AccountBackground>
    </SafeArea>
  );
};
