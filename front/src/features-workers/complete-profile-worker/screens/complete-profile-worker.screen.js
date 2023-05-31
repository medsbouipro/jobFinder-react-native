import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../components/input.component";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import axios from "axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { tunisiaCities, categories } from "../helper/complete-profile.helper";
import { ip } from "../../../services/ip-address/ipaddress";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  // address: yup.string().required("Please select an Address"),
  // city: yup.string().required("Please select a city"),
  // category: yup.string().required("Please select a category"),
  // phoneNumber: yup
  //   .string()
  //   .required("Phone Number is required")
  //   .length(8, "Phone Number must be exactly 8 characters long"),
  dateOfBirth: yup
    .date()
    .required("Date of Birth is required")
    .test(
      "age",
      "You must be at least 18 years old",
      (value) => new Date().getFullYear() - new Date(value).getFullYear() >= 18
    ),
  // job: yup.string().required("Job is required"),
  // workerProfessionalSummary: yup
  //   .string()
  //   .required("Professional Summary is required"),
  // workerBio: yup.string().required("Worker Bio is required"),
  // workerYearsOfExperience: yup
  //   .number()
  //   .required("Years of Experience is required")
  //   .integer("Years of Experience must be an integer"),
});
const CompleteProfileWorker = () => {
  const { user, setCompleted ,setUserType} = useContext(AuthenticationContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={[styles.container]}>
        <Text style={styles.title}>Complete your profile</Text>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            // address: "",
            // city: "",
            // category: "",
            // phoneNumber: "",
            dateOfBirth: null,
            // job: "",
            // workerProfessionalSummary: "",
            // workerBio: "",
            // workerYearsOfExperience: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const workerData = {
              workerId: user.uid,
              workerFirstName: values.firstName.trim(),
              workerLastName: values.lastName.trim(),
              // workerAddress: values.address.trim(),
              workerEmail: user.email.trim(),
              // workerCategory: values.category.trim(),
              workerDateOfBirth: values.dateOfBirth.toISOString().split("T")[0],
              // workerPhoneNumber: values.phoneNumber.trim(),
              // workerNumberOfJobs: null,
              // workerAvailability: "true",
              // workerJob: values.job.trim(),
              // workerProfessionalSummary:
              //   values.workerProfessionalSummary.trim(),
              // workerTotalRating: null,
              // workerBio: values.workerBio.trim(),
              // workerNumRates: null,
              // workerCity: values.city.trim(),
              workerImgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
              // workerYearsOfExperience: values.workerYearsOfExperience,
            };
            axios
              .post(`http://${ip}/workers/addworker`, workerData)
              .then((response) => {
                console.log("Worker added:", response);
                setUserType("worker");
                setCompleted(true);
              })
              .catch((error) => {
                console.log("====================================");
                console.log(error);
                console.log("====================================");
              });
          }}
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
            <View style={styles.form}>
              <Input
                label="First Name"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                error={errors.firstName}
                touched={touched.firstName}
              />
              <Input
                label="Last Name"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                error={errors.lastName}
                touched={touched.lastName}
              />
              {/* <Input
                label="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                error={errors.address}
                touched={touched.address}
              /> */}
              {/* <Label>City</Label>
              <View
                style={{ borderWidth: 1, borderRadius: 4, borderColor: "#ccc" }}
              >
                <Picker
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
                  <Text style={styles.error}>{errors.city}</Text>
                )}
              </View> */}
              {/* <Input
                label="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                keyboardType="numeric"
              /> */}
              <Text style={styles.label}>Date of Birth</Text>
              <Button
              style={{marginVertical:10}} 
                title={
                  values.dateOfBirth
                    ? values.dateOfBirth.toLocaleDateString()
                    : "Select Date"
                }
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={values.dateOfBirth || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) {
                      setFieldValue("dateOfBirth", date);
                    }
                  }}
                  maximumDate={
                    new Date(
                      new Date().getFullYear() - 18,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                />
              )}
              {errors.dateOfBirth && touched.dateOfBirth && (
                <Text style={styles.error}>{errors.dateOfBirth}</Text>
              )}
              {/* <Input
                label="Job"
                value={values.job}
                onChangeText={handleChange("job")}
                onBlur={handleBlur("job")}
                error={errors.job}
                touched={touched.job}
              /> */}
              {/* <Label>Category</Label>
              <View
                style={{ borderWidth: 1, borderRadius: 4, borderColor: "#ccc" }}
              >
                <Picker
                  selectedValue={values.category}
                  onValueChange={handleChange("category")}
                  onBlur={handleBlur("category")}
                >
                  <Picker.Item label="Select a category" value="" />
                  {categories.map((category, i) => (
                    <Picker.Item key={i} label={category} value={category} />
                  ))}
                </Picker>
                {errors.category && touched.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}
              </View> */}
              {/* <Input
                label="Professional Summary"
                value={values.workerProfessionalSummary}
                onChangeText={handleChange("workerProfessionalSummary")}
                onBlur={handleBlur("workerProfessionalSummary")}
                error={errors.workerProfessionalSummary}
                touched={touched.workerProfessionalSummary}
                multiline
                numberOfLines={4}
              /> */}
              {/* <Input
                label="Worker Bio"
                value={values.workerBio}
                onChangeText={handleChange("workerBio")}
                onBlur={handleBlur("workerBio")}
                error={errors.workerBio}
                touched={touched.workerBio}
                multiline
                numberOfLines={4}
              />
              <Input
                label="Years of Experience"
                value={values.workerYearsOfExperience.toString()}
                onChangeText={(value) =>
                  setFieldValue(
                    "workerYearsOfExperience",
                    parseInt(value.replace(/[^0-9]/g, ""))
                  )
                }
                onBlur={handleBlur("workerYearsOfExperience")}
                error={errors.workerYearsOfExperience}
                touched={touched.workerYearsOfExperience}
                keyboardType="numeric"
              /> */}
              <View style={{marginVertical:10}} >

              </View>
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  form: {
    flex: 1,
    paddingBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginVertical: 4,
  },
});

export default CompleteProfileWorker;
