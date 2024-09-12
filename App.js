import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState(''); // State for the input task
  const [tasks, setTasks] = useState([]); // State for the list of tasks

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (task.length > 0) {
      setTasks([...tasks, { key: Math.random().toString(), value: task }]); // Add task to the task list
      setTask(''); // Clear the input after adding
    }
  };

  // Function to handle removing a task
  const handleDeleteTask = (taskKey) => {
    setTasks(tasks.filter((item) => item.key !== taskKey)); // Remove task by key
  };

  return (
    <View style={styles.container}>
      {/* Input field for task */}
      <TextInput
        placeholder="Enter Task"
        style={styles.input}
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      {/* Add task button */}
      <Button title="Add Task" onPress={handleAddTask} />

      {/* Display tasks */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.value}</Text>
            {/* Delete button */}
            <TouchableOpacity onPress={() => handleDeleteTask(item.key)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
});
