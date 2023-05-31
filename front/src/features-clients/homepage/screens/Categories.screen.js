import React from "react";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";

const CATEGORIES = [
  { id: "1", title: "Cleaning", icon: "broom" },
  { id: "2", title: "Lawn & Garden", icon: "flower" },
  { id: "3", title: "Handyman", icon: "toolbox" },
  { id: "4", title: "Home Automation", icon: "home-automation" },
  { id: "5", title: "Organization", icon: "folder-outline" },
  { id: "6", title: "Moving & Storage", icon: "truck-delivery-outline" },
  { id: "7", title: "Renovation", icon: "hammer-screwdriver" },
  { id: "8", title: "Pest Control", icon: "bug" },
  { id: "9", title: "Other", icon: "dots-horizontal-circle-outline" },
];
const CategoriesScreen = ({ navigation }) => {
  const handleCategoryPress = () => {};

  const renderItem = ({ item }) => (
    <CategoryContainerView
      onPress={() => navigation.navigate("Homepage", { category: item.title })}
    >
      <Icon name={item.icon} size={30} color="#333" />
      <CategoryTitle>{item.title}</CategoryTitle>
    </CategoryContainerView>
  );

  return (
    <ListContainerView>
      <FlatList
        data={CATEGORIES}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ListContainerView>
  );
};

const ListContainerView = styled.View`
  flex: 1;
  padding: 20px;
`;

const CategoryContainerView = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const CategoryTitle = styled.Text`
  font-size: 16px;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`;

export default CategoriesScreen;
