import * as React from 'react';
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
    zIndex: 1,
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
    flex: 1,
    paddingRight: 5,
  },
  setsRepsContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  setsReps: {
    alignItems: 'center',
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  textInput: {
    height: 35,
  },
  numericInput: {
    width: 50,
    textAlign: 'center',
  },
  placeholder: {
    marginBottom: 5,
    color: '#999',
  },
});

export default WorkoutInputCard;
