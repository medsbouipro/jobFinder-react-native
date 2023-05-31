import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const workerImage = require('../../../../assets/worker-bg.jpg');
const clientImage = require('../../../../assets/client-bg.jpg');

const PickTypeScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <ImageBackground style={styles.container} source={workerImage}>
        <View style={styles.bottomLeft}>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CompleteProfileWorker')}
              style={[styles.button, styles.blackButton]}
            >
              Worker
            </Button>
          </View>
        </View>
      </ImageBackground>
      <ImageBackground style={styles.container} source={clientImage}>
        <View style={styles.topLeft}>
          <View style={styles.buttonContainer}>
          <Button
              mode="contained"
              onPress={() => navigation.navigate('CompleteProfileClient')}
              style={[styles.button, styles.greenButton]}
            >
              Client
            </Button>

          </View>
        </View>
      </ImageBackground>
    </SafeArea>
  );
};

export default PickTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop:20,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:"flex-end"
  },
  button: {
    marginRight: 8,
  },
  blackButton: {
    backgroundColor: 'black',
  },
  greenButton: {
    backgroundColor: 'green',
  },
});
