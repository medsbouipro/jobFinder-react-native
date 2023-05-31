import React, { useState, useContext } from "react";
import { View, Button, Platform } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import axios from "axios";
import { ip } from "../../../services/ip-address/ipaddress";
import { SafeArea } from "../../../components/utility/safe-area.component";
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  address: yup.string().required("Please select an Address"),
  city: yup.string().required("Please select a city"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .length(8, "Phone Number must be exactly 8 characters long"),
  dateOfBirth: yup
    .date()
    .required("Date of Birth is required")
    .test(
      "age",
      "You must be at least 18 years old",
      (value) => new Date().getFullYear() - new Date(value).getFullYear() >= 18
    ),
});

const CompleteProfileClient = () => {
  const { user, setCompleted, setUserType, trigger } = useContext(
    AuthenticationContext
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const tunisiaCities = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Ettadhamen",
    "Kairouan",
    "Gabes",
    "Bizerte",
    "Ariana",
    "Gafsa",
    "El Mourouj",
    "Tataouine",
    "Kasserine",
    "Kairouan",
    "Medenine",
    "Monastir",
    "La Goulette",
    "Sidi Bouzid",
    "Ben Arous",
    "Tozeur",
    "Nabeul",
    "Zarzis",
    "Beni Khiar",
    "Hammamet",
    "Metlaoui",
  ];

  return (
    <SafeArea>
      <Formik
        initialValues={{
          city: "",
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          dateOfBirth: "",
        }}
        onSubmit={(values) => {
          const clientData = {
            clientId: user.uid,
            clientFirstName: values.firstName.trim(),
            clientLastName: values.lastName.trim(),
            clientCity: values.city.trim(),
            clientAddress: values.address.trim(),
            clientEmail: user.email.trim(),
            clientDateOfBirth: values.dateOfBirth.toISOString().split("T")[0],
            clientPhone: values.phoneNumber.trim(),
            ClientImgUrl:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          }; 
          axios
            .post(`http://${ip}/clients/addclient`, clientData)
            .then((response) => {
              console.log("client added:", response.data);
              setUserType("client");
              setCompleted(true);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={{ marginHorizontal: 10 }}>
            <TextInput
              style={{ marginVertical: 10, borderRadius: 15 }}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              label="First Name"
            />
            {touched.firstName && errors.firstName && (
              <Text variant="error">{errors.firstName}</Text>
            )}
            <TextInput
              style={{ marginVertical: 10, borderRadius: 15 }}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              label="Last Name"
            />
            {touched.lastName && errors.lastName && (
              <Text variant="error">{errors.lastName}</Text>
            )}
            <TextInput
              style={{ marginVertical: 10, borderRadius: 15 }}
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              label="Phone Number"
              keyboardType="numeric"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text variant="error">{errors.phoneNumber}</Text>
            )}
            <TextInput
              style={{ marginVertical: 10, borderRadius: 15 }}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              label="Address"
            />
            {touched.address && errors.address && (
              <Text variant="error">{errors.address}</Text>
            )}
            <View style={{ marginVertical: 10, borderRadius: 15 }}>
              <Button
                
                onPress={() => setShowDatePicker(true)}
                title={"Select Date of Birth"}
              ></Button>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={values.dateOfBirth || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === "ios");
                  setFieldValue("dateOfBirth", selectedDate);
                }}
                maximumDate={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                }
              />
            )}
            {touched.dateOfBirth && errors.dateOfBirth && (
              <Text variant="error">{errors.dateOfBirth}</Text>
            )}
            <View>
              <Text>Select a city:</Text>
              <Picker
              style={{ marginVertical: 10, borderRadius: 15 }}
                selectedValue={values.city}
                onValueChange={handleChange("city")}
                onBlur={handleBlur("city")}
              >
                <Picker.Item label="Select a city" value="" />
                {tunisiaCities.map((city, i) => (
                  <Picker.Item key={i} label={city} value={city} />
                ))}
              </Picker>
              {errors.city && touched.city && (
                <Text variant="error">{errors.city}</Text>
              )}
            </View>
            <View style={{ marginVertical: 10, borderRadius: 15 }}>

            <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        )}
      </Formik>
    </SafeArea>
  );
};

export default CompleteProfileClient;
