import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { ip } from "../ip-address/ipaddress";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [mysqlUser, setMysqlUser] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [error, setError] = useState(null);
  const auth = useRef(getAuth()).current;

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setCompleted(false);
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
      setUserType(null);
      setCompleted(null);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const workerResponse = await axios.get(
            `http://${ip}/workers/getworker/${user.uid}`
          );
          if (workerResponse.data.length > 0) {
            setMysqlUser(workerResponse.data[0]);
            setCompleted(true);
            setUserType("worker");
          }

          const clientResponse = await axios.get(
            `http://${ip}/clients/getclient/${user.uid}`
          );
          if (clientResponse.data.length > 0) {
            setMysqlUser(clientResponse.data[0]);
            setCompleted(true);
            setUserType("client");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user, trigger, completed, userType]);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        completed,
        mysqlUser,
        trigger,
        userType,
        setUserType,
        setTrigger,
        setCompleted,
        setError,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
