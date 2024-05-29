import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <ImageBackground source={require('./rr.jpeg')} style={styles.background}>
      <View style={styles.container}>
        {/* Banana Fermentation Section */}
        <View style={styles.fermentationContainer}>
          <View style={styles.fermentationContent}>
            <Text style={styles.fermentationText}>SMART Fermentation</Text>
          </View>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome To</Text>
        </View>
      </View>
    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%', // Set width to device width
    height: '100%', // Set height to device height
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fermentationContainer: {
    
    padding: 20,
    borderRadius:30,
    marginBottom: -300,
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    padding: 10,
    borderRadius: 10,
  },
  fermentationContent: {
    alignItems: 'center',

  },
  fermentationText: {
    fontSize: 24,
    color:'grey',
    fontWeight: 'bold',
  },
  welcomeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    padding: 10,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    color:'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
