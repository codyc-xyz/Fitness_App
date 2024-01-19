import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import WorkoutInput from '../types/WorkoutInput';

type WorkoutCardProps = {
  workoutInput: WorkoutInput;
  onChange: (field: keyof WorkoutInput, value: string) => void;
};

const WorkoutInputCard: React.FC<WorkoutCardProps> = ({
  workoutInput,
  onChange,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Workout Name"
          value={workoutInput.name}
          onChangeText={text => onChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sets"
          value={workoutInput.sets.toString()}
          onChangeText={text => onChange('sets', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Reps"
          value={workoutInput.reps.toString()}
          onChangeText={text => onChange('reps', text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.circleRow}>
        {Array.from({length: Math.min(workoutInput.sets, 5)}, (_, i) => (
          <View key={i} style={styles.circle}>
            <Text style={styles.circleText}>{i + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: 'white',
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  circleText: {
    color: 'white',
  },
});

export default WorkoutInputCard;
