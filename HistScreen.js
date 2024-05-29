import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

const HistoryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold selected date
  const [historyData, setHistoryData] = useState(null); // State to hold fetched data
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility

  useEffect(() => {
    fetchHistoryData();
  }, [selectedDate]);

  const fetchHistoryData = async () => {
    try {
      // Format selected date to YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // Month starts from 0
      const day = selectedDate.getDate();
      
      const formattedDay = String(day).padStart(2, '0'); // Add leading zero if day is less than 10
      const formattedDate = `${year}-${month}-${formattedDay}`;
  
      const response = await fetch(`http://192.168.43.126:3002/data?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };
  

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      // Check if the selected date is not in the future
      const currentDate = new Date();
      if (date > currentDate) {
        // Show an alert message if the selected date is in the future
        alert('Please select a date in the past or today.');
      } else {
        setSelectedDate(date);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select date to view the history</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.dateInput}
            editable={false}
            value={selectedDate.toDateString()}
          />
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
            <MaterialIcons name="calendar-today" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View>
          <Text style={styles.cardText}>Selected Date: {selectedDate.toDateString()}</Text>
        </View>
        <Text style={styles.alcohol}>Alcohol</Text>
        <Text style={styles.temperature}>Temperature</Text>
      </View>
      {historyData && (
        <View style={styles.chartContainer}>
          
          <View style={{ flex: 1 }}>
            <BarChart
              style={styles.chart}
              data={Object.values(historyData.alcoholData)}
              svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
              contentInset={{ top: 20, bottom: 20 }}
              showGrid={true}
            />
            <BarChart
              style={[StyleSheet.absoluteFill, {opacity: 0.5}]}
              data={Object.values(historyData.temperatureData)}
              svg={{ fill: 'rgba(244, 65, 134, 0.8)' }}
              contentInset={{ top: 20, bottom: 20 }}
              showGrid={true}
            />
           <XAxis
  style={{ marginHorizontal: -10, marginTop: -9, fontSize: 8 }}
  data={Object.keys(historyData.temperatureData).map(timestamp => new Date(timestamp))}
  formatLabel={(index) => {
    // Display timestamp from API response on x-axis
    const timestamp = Object.keys(historyData.temperatureData)[index];
    // Extract the time part from the timestamp
    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  }}
  contentInset={{ left: 20, right: 20 }}
  svg={{ fontSize: 6, fill: 'black' }}
/>

          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alcohol:{
    fontWeight:'bold',
    color:'rgba(134, 65, 244, 0.8)',
    fontSize:20,
  },
  temperature:{
    fontWeight:'bold',
    color:'rgba(244, 65, 134, 0.8)',
    fontSize:20,
  },
  header: {
    fontSize: 24,
    color:'green',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  datePickerButton: {
    marginLeft: 10,
  },
  card: {
    borderRadius: 16,
    backgroundColor: 'lightgreen',
    width: '95%',
    height: 100,
    marginBottom: 40,
    padding: 10,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 300,
    paddingVertical: 5,
  },
  chart: {
    flex: 1,
    marginRight: 3,
  },
});

export default HistoryScreen;
