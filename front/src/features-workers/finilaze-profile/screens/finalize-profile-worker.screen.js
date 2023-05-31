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
  address: yup.string().required("Please select an Address"),
  city: yup.string().required("Please select a city"),
  category: yup.string().required("Please select a category"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .length(8, "Phone Number must be exactly 8 characters long"),
  job: yup.string().required("Job is required"),
  workerProfessionalSummary: yup
    .string()
    .required("Professional Summary is required"),
  workerBio: yup.string().required("Worker Bio is required"),
  workerYearsOfExperience: yup
    .number()
    .required("Years of Experience is required")
    .integer("Years of Experience must be an integer"),
});
const FinilazeWorkerProfile = ({navigation}) => {
  const { user, mysqlUser,setTrigger } = useContext(AuthenticationContext);

  const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={[styles.container]}>
        <Formik
          initialValues={{
            address: "",
            city: "",
            category: "",
            phoneNumber: "",
            job: "",
            workerProfessionalSummary: "",
            workerBio: "",
            workerYearsOfExperience: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const workerData = {
              workerId: user.uid,
              workerAddress: values.address.trim(),
              workerCategory: values.category.trim(),
              workerPhoneNumber: values.phoneNumber.trim(),
              // workerAvailability: "true",
              workerJob: values.job.trim(),
              workerProfessionalSummary:
                values.workerProfessionalSummary.trim(),
              workerTotalRating: null,
              workerBio: values.workerBio.trim(),
              workerNumRates: null,
              workerCity: values.city.trim(),
              workerYearsOfExperience: values.workerYearsOfExperience,
            };
            axios
              .put(`http://${ip}/workers/updateworker/${mysqlUser.workerId}`, workerData)
              .then((response) => {
                console.log("Worker updated:", response);
                setTrigger((prevTrigger) => !prevTrigger);
                navigation.goBack();
              })
              .catch((error) => {
                console.log(error);
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
                label="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                error={errors.address}
                touched={touched.address}
              />
              <Label>City</Label>
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
              </View>
              <Input
                label="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                keyboardType="numeric"
              />
              <Input
                label="Job"
                value={values.job}
                onChangeText={handleChange("job")}
                onBlur={handleBlur("job")}
                error={errors.job}
                touched={touched.job}
              />
              <Label>Category</Label>
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
              </View>
              <Input
                label="Professional Summary"
                value={values.workerProfessionalSummary}
                onChangeText={handleChange("workerProfessionalSummary")}
                onBlur={handleBlur("workerProfessionalSummary")}
                error={errors.workerProfessionalSummary}
                touched={touched.workerProfessionalSummary}
                multiline
                numberOfLines={4}
              />
              <Input
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
                value={values?.workerYearsOfExperience.toString()}
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
              />
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

export default FinilazeWorkerProfile;
