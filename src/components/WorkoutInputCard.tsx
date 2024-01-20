import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import WorkoutInput from '../types/WorkoutInput';

type WorkoutCardProps = {
  workoutInput: WorkoutInput;
  onChange: (field: keyof WorkoutInput, value: string) => void;
  onRemove: () => void;
};

const WorkoutInputCard: React.FC<WorkoutCardProps> = ({
  workoutInput,
  onChange,
  onRemove,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <View style={styles.nameContainer}>
          <Text style={styles.placeholder}>Workout Name</Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            value={workoutInput.name}
            onChangeText={text => onChange('name', text)}
          />
        </View>
        <View style={styles.setsRepsContainer}>
          <View style={styles.setsReps}>
            <Text style={styles.placeholder}>Sets</Text>
            <TextInput
              style={[styles.input, styles.numericInput]}
              value={workoutInput.sets.toString()}
              onChangeText={text => onChange('sets', text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.setsReps}>
            <Text style={styles.placeholder}>Reps</Text>
            <TextInput
              style={[styles.input, styles.numericInput]}
              value={workoutInput.reps.toString()}
              onChangeText={text => onChange('reps', text)}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1, // Ensuring it's above all other elements
    padding: 4,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 1, // Allocate flex space for the workout name
    paddingRight: 5, // Spacing between name input and sets/reps
  },
  setsRepsContainer: {
    flex: 0.5, // Allocate flex space for sets and reps
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align to the end of the parent container
  },
  setsReps: {
    alignItems: 'center',
    marginLeft: 5, // Space between sets and reps inputs
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5, // Adjust vertical padding for aesthetics
    backgroundColor: 'white',
  },
  textInput: {
    height: 35, // Adjust height for aesthetics
  },
  numericInput: {
    width: 50, // Set a fixed width for numeric inputs
    textAlign: 'center', // Center the text inside the input
  },
  placeholder: {
    marginBottom: 5,
    color: '#999', // Lighten the placeholder text color
  },
});

export default WorkoutInputCard;
