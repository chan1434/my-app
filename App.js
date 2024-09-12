import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState(''); // Stores user input for the alarm time
  const [alarmSet, setAlarmSet] = useState(false); // Tracks if the alarm is set
  const [alarmTriggered, setAlarmTriggered] = useState(false); // Prevents multiple alerts

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Check if alarm should be triggered
    if (alarmSet && !alarmTriggered) {
      const currentFormattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Optional: Change to true for 12-hour format
      });

      if (currentFormattedTime === alarmTime) {
        Alert.alert('Alarm', 'The alarm is ringing!');
        setAlarmTriggered(true); // Ensure the alert triggers only once
      }
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentDateTime, alarmTime, alarmSet, alarmTriggered]);

  const handleSetAlarm = () => {
    if (alarmTime) {
      setAlarmSet(true);
      setAlarmTriggered(false); // Reset the triggered state in case of re-setting the alarm
    } else {
      Alert.alert('Error', 'Please enter a valid alarm time.');
    }
  };

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <Text style={styles.timeText}>{formattedTime}</Text>

      {/* Alarm Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter alarm time (HH:MM:SS)"
        value={alarmTime}
        onChangeText={(text) => setAlarmTime(text)}
        keyboardType="numeric"
      />
      <Button title="Set Alarm" onPress={handleSetAlarm} />

      {alarmSet && <Text style={styles.alarmText}>Alarm set for: {alarmTime}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    width: 200,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  alarmText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});
