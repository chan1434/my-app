import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>
        {formattedDate}
      </Text>
      <Text style={styles.timeText}>
        {formattedTime}
      </Text>
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
  },
});
