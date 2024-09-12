import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');           // State for the input task
  const [tasks, setTasks] = useState([]);         // State for the list of tasks
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing
  const [editingKey, setEditingKey] = useState(null); // State to track the task being edited
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input

  // Function to handle adding or updating a task
  const handleAddOrEditTask = () => {
    if (task.length > 0) {
      if (isEditing) {
        // Update the existing task
        setTasks(tasks.map(item => item.key === editingKey ? { ...item, value: task } : item));
        setIsEditing(false); // Reset editing state
        setEditingKey(null);  // Reset the editing key
      } else {
        // Add a new task
        setTasks([...tasks, { key: Math.random().toString(), value: task }]);
      }
      setTask(''); // Clear the input after adding or editing
    }
  };

  // Function to handle task deletion
  const handleDeleteTask = (taskKey) => {
    setTasks(tasks.filter((item) => item.key !== taskKey)); // Remove task by key
  };

  // Function to handle task editing
  const handleEditTask = (taskKey) => {
    const taskToEdit = tasks.find((item) => item.key === taskKey);
    if (taskToEdit) {
      setTask(taskToEdit.value); // Set the input to the task's current value
      setIsEditing(true);        // Set the editing mode
      setEditingKey(taskKey);     // Set the key of the task being edited
    }
  };

  // Function to filter tasks based on search query
  const filteredTasks = tasks.filter((item) =>
    item.value.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
  );

  return (
    <View style={styles.container}>
      {/* Input field for task */}
      <TextInput
        placeholder="Enter Task"
        style={styles.input}
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      {/* Button for adding or saving changes to task */}
      <Button title={isEditing ? "Save Changes" : "Add Task"} onPress={handleAddOrEditTask} />

      {/* Search field for filtering tasks */}
      <TextInput
        placeholder="Search Tasks"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Display tasks (filtered based on search input) */}
      <FlatList
        data={filteredTasks} // Use filteredTasks to render the tasks
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.value}</Text>

            {/* Edit button */}
            <TouchableOpacity onPress={() => handleEditTask(item.key)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>

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
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
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
    flex: 1,
  },
  editButton: {
    fontSize: 16,
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
});
