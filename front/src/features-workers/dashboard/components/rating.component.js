import * as React from "react";
import { AirbnbRating } from "@rneui/base";
import { View,Text } from "react-native";

export default ({ count }) => {
  return !count ? (
    <Text>No Ratings Yet</Text>
  ) : (
    <View
      style={{
        width: "100%",
        height: "50%",
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 25,
        marginTop: "15%",
        backgroundColor: "#EAECEC",
        borderColor: "#FAA916",
        alignSelf: "center",
      }}
    >
      <AirbnbRating
        size={20}
        isDisabled
        reviewSize={16}
        count={5}
        reviewColor="#C7A27C"
        defaultRating={count}
        reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
        onFinishRating={() => console.log("onFinishRating()")}
        showRating
      />
    </View>
  );
};
