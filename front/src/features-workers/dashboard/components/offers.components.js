import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
const OffersView = styled.View`
  margin-top: 10%;
  margin-left: 7%;
`;
const OfferText = styled.Text`
  font-size: 25px;
`;

const Offers = ({ count }) => {
  return (
    <OffersView>
      <OfferText>You have {count} Offers </OfferText>
    </OffersView>
  );
};

export default Offers;
