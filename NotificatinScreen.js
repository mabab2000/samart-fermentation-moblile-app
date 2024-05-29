import React, { useState, useEffect } from 'react';
import { Text, View, Platform, Button } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [temperatureValue, setTemperatureValue] = useState(null);
  const [alcoholValue, setAlcoholValue] = useState(null);

  useEffect(() => {
    console.log("Registering for push notification");
    registerForPushNotificationsAsync().then(token => {
      console.log("Token :", token);
      setExpoPushToken(token);
    }).catch((err) => {
      console.log("Error registering for push notifications:", err);
    });

    // Send notification every 5 minutes
    const interval = setInterval(() => {
      sendNotification();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(interval);
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'db18ca15-78bb-4e20-b8ff-67348c23559a' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://172.31.222.249:3001/flask-data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      const latestData = responseData[responseData.length - 1];
      setTemperatureValue(latestData.temperature_value.toFixed(2));
      setAlcoholValue(latestData.alcohol_value.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotification = async () => {
    console.log("Send push notification");
    await fetchData();
  
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "SMART fermentation",
      body: `Measure now is:\nAlcohol: ${alcoholValue !== null ? alcoholValue : 'N/A'}\nTemperature: ${temperatureValue !== null ? temperatureValue : 'N/A'}`,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const handleSendNotification = () => {
    sendNotification();
  }

  return (
    <View style={{ marginTop: -60, alignItems: 'center' }}>
      <Text>Sending notification automatically every 5 minutes...</Text>
      <Button title="Send Notification" onPress={handleSendNotification} />
    </View>
  );
}
