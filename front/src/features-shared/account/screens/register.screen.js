import React, { useState, useContext,useEffect } from "react";

import { ActivityIndicator, MD2Colors } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
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
import { ScrollView, Keyboard } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [focus, setFocus] = useState(false);

  const { onRegister, isLoading, error, setError } = useContext(
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
              <Title>CraftSeeker</Title>

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
                  />

                  <Spacer size="large" />
                  <AuthInput
                    label="Repeat Password"
                    value={repeatedPassword}
                    textContentType="password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(p) => setRepeatedPassword(p)}
                  />
                  {error && (
                    <ErrorContainer size="large">
                      <Text variant="error">{error}</Text>
                    </ErrorContainer>
                  )}
                </FormView>
              

              <Spacer size="large" />
              <ButtonsContainer>
                <AuthButton
                  icon="email"
                  mode="outlined"
                  onPress={() => onRegister(email, password, repeatedPassword)}
                >
                  Register
                </AuthButton>
              </ButtonsContainer>
            </AccountContainer>
            <Spacer size="large" />
            { !focus && <BackButton
              mode="elevated"
              icon="keyboard-backspace"
              onPress={() => {
                setError(null);
                navigation.goBack();
              }}
            >
              Back
            </BackButton>}
          </ScrollView>
        ) : (
          <ActivityIndicator animating={true} color={MD2Colors.blue300} />
        )}
      </AccountBackground>
    </SafeArea>
  );
};
