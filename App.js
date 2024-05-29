import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './HomeScreen';
import ProgressScreen from './ProgressScreen';
import PredictionScreen from './PredictionScreen';
import HistoryScreen from './HistScreen';
import Footer from './Footer';
import NotificatinScreen from './NotificatinScreen';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <NotificatinScreen/>
      <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Prediction" component={PredictionScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
