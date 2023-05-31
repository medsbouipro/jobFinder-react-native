
import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import StarRating from 'react-native-star-rating';

const ReviewCard = ({ review }) => {
  const { reviewText, reviewDate, reviewRating, reviewUrl, reviewOwner } = review;
  const screenWidth = Dimensions.get('window').width;
  const starSize = screenWidth * 0.2 / 5;

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:"center" }}>
        <View style={{ flexDirection: 'row' ,alignItems:"center"}}>
          <Image source={{ uri: reviewUrl }} style={{ marginRight:"10%",width: 50, height: 50,borderRadius:50 }} />
          <Text>{reviewOwner}</Text>
        </View>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={reviewRating}
          fullStarColor={'gold'}
          starSize={starSize}

        />
      </View>
      <Divider style={{borderWidth:1,marginVertical:"2%",opacity:0.3}}/>
      <View style={{alignItems:"center"}}>
        <Text>{reviewText}</Text>
      </View>
    </View>
  );
};

const styles = {
  card: {
    
    width:"90%",
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderRadius:20,
    padding: 10,
    marginVertical: 5,
    alignSelf:"center"
    
  },
};

export default ReviewCard;

