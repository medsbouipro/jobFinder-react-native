import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ClientAppNavigator } from "./client-app.navigator";
import { AccountNavigator } from "./account.navigator";
import { CompletedNavigator } from "./completed.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { WorkerAppNavigator } from "./worker-app.navigator";

export const Navigation = () => {
  const { isAuthenticated, completed, userType } = useContext(
    AuthenticationContext
  );

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AccountNavigator />
      ) : completed === false ? (
        <CompletedNavigator />
      ) : userType === "client" ? (
        <ClientAppNavigator />
      ) : userType === "worker" ? (
        <WorkerAppNavigator />
      ) : null}
      {/* <ClientAppNavigator /> */}
    </NavigationContainer>
  );
};
