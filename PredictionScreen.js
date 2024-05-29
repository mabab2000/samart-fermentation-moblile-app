import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.43.126:3000/prediction-data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json(); // Get response as JSON
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const xAxisData = data.map((item, index) => index); // Use index as xAxis data
  const predictedAlcoholValues = data.map(item => item.predicted_alcohol);
  const predictedTemperatureValues = data.map(item => item.predicted_temperature);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.textBetweenCharts1}>Temperature </Text>
      <View style={styles.chartContainer}>
        <YAxis
          data={predictedTemperatureValues}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'black' }}
          numberOfTicks={10}
          formatLabel={(value) => value.toFixed(2)}
        />
        <View style={{ flex: 1 }}>
          <BarChart
            style={styles.chart}
            data={predictedTemperatureValues}
            svg={{ fill: 'rgba(255, 99, 71, 0.8)' }} // Set default color for predicted temperature
            contentInset={{ top: 20, bottom: 20 }}
          />
          <XAxis
            style={{ marginHorizontal: -10, marginTop: 10 }}
            data={xAxisData}
            formatLabel={(value, index) => data[index].timestamp.split(' ')[1]} // Display only time component
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>
      </View>
      <Text style={styles.textBetweenCharts}>Alcohol</Text>
      <View style={styles.chartContainer}>
        <YAxis
          data={predictedAlcoholValues}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'black' }}
          numberOfTicks={10}
          formatLabel={(value) => value.toFixed(2)}
        />
        <View style={{ flex: 1 }}>
          <BarChart
            style={styles.chart}
            data={predictedAlcoholValues}
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }} // Set default color for predicted alcohol
            contentInset={{ top: 20, bottom: 20 }}
          />
          <XAxis
            style={{ marginHorizontal: -10, marginTop: 10 }}
            data={xAxisData}
            formatLabel={(value, index) => data[index].timestamp.split(' ')[1]} // Display only time component
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>
      </View>
      <View style={styles.cardContainer}>
        {data.map((item, index) => (
          <Card key={index} containerStyle={styles.card}>
            <Text style={styles.cardText}>Date and time: {item.timestamp}</Text>
<Text style={styles.cardText}>Predicted Alcohol: {item.predicted_alcohol.toFixed(2)}</Text>
<Text style={styles.cardText}>Predicted Temperature: {item.predicted_temperature.toFixed(2)}</Text>

          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBetweenCharts1:{
    fontSize:20,
    fontWeight:'900',
    color:'rgba(255, 99, 71, 0.8)',

  },
  textBetweenCharts:{
    fontSize:20,
    fontWeight:'900',
    color:'rgba(134, 65, 244, 0.8)',

  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    borderRadius: 16,
    backgroundColor: 'lightgreen',
    width: '95%',
    marginBottom: -3,
  },
  cardText: {
    fontSize: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 300,
    paddingVertical: 5,
  },
  chart: {
    flex: 1,
    marginRight: 3, // Add margin between charts
  },
});
