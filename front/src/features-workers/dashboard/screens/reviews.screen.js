import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "../../../components/one-review/one-review.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import axios from "axios";
import { ip } from "../../../services/ip-address/ipaddress";

const ReviewsScreen = () => {
  const [reviewsArray, setReviewsArray] = useState([]);
  const { user, mysqlUser } = useContext(AuthenticationContext);
  useEffect(() => {
    axios
      .get(`http://${ip}/reviews/getreview/${user.uid}`)
      .then((res) => {
        setReviewsArray(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <View>
      {reviewsArray.map((review, i) => (
        <ReviewCard key={i} review={review} />
      ))}
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({});
