import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

const SearchContainer = styled.View`
  width:80%;
`;

export const Search = ({ handleSearch }) => {


  return (
    <SearchContainer>
      <Searchbar

        style={{backgroundColor:"#FBFFDC",opacity:0.7,fontSize:15}}
        placeholder="Search for a Service"
        onChangeText={(text) => {
          handleSearch(text);
        }}
      />
    </SearchContainer>
  );
};
