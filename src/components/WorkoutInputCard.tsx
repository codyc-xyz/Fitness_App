import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
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
    position: 'relative',
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textInput: {
    height: 40,
    marginBottom: 10,
    flex: 1, // Adjusted for full width within its container
  },
  numericInput: {
    height: 40,
    width: '50%', // Adjusted for half width of its container
    marginBottom: 10,
  },
  placeholder: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 0.7, // Takes up half of the space
    paddingRight: 8, // Add some spacing
  },
  setsRepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '25%', // Sets the width to be 1/4 of the parent container
  },
  setsReps: {
    alignItems: 'center',
  },
});
export default WorkoutInputCard;
