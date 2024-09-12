import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {time.toLocaleTimeString()}
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
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
