import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={24} color="white" />
        <Text style={styles.footertext}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Progress')}
      >
        <Icon name="line-chart" size={24} color="white" />
        <Text style={styles.footertext}>Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Prediction')}
      >
        <Icon name="bullseye" size={24} color="white" />
        <Text style={styles.footertext}>Prediction</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('History')}
      >
        <Icon name="history" size={24} color="white" />
        <Text style={styles.footertext}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footertext:{
    fontWeight:'bold',
    fontSize:15,
    color: 'white',
  }
});

export default Footer;
