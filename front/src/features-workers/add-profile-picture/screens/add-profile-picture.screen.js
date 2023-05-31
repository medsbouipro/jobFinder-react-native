import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useContext } from "react";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import axios from "axios";
import { ip } from "../../../services/ip-address/ipaddress";

const AddProfilePicture = ({navigation}) => {
  const { user, setTrigger } = useContext(AuthenticationContext);

  const [image, setImage] = useState(null);
  const handleImageUpload = () => {
    if (image) {
      axios
        .put(`http://${ip}/workers/updateworker/${user.uid}`, {
          workerImgUrl: image,
        })
        .then((response) => {
          setTrigger((prevTrigger) => !prevTrigger);
          navigation.goBack();
          console.log("image added:", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      // Add your cloud name and upload preset name
      let apiUrl = "https://api.cloudinary.com/v1_1/dzo3dmyye/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "ml_default",
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (response) => {
          let data = await response.json();
          if (data.secure_url) {
            setImage(data.secure_url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      // Add your cloud name and upload preset name
      let apiUrl = "https://api.cloudinary.com/v1_1/dzo3dmyye/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "ml_default",
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (response) => {
          let data = await response.json();
          console.log("====================================");
          console.log(data);
          console.log("====================================");
          if (data.secure_url) {
            setImage(data.secure_url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Add Profile Picture from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickImageFromCamera}>
        <Text style={styles.buttonText}>Add Profile Picture from camera</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && (
        <Button mode="contained" onPress={handleImageUpload}>
          Confirm Profile Image Update
        </Button>
      )}
    </View>
  );
};

export default AddProfilePicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AFD3E2",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});
