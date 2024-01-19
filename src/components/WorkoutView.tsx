import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import Workout from '../types/Workout';
import {useDatabase} from '../contexts/DatabaseContext';
import loadWorkoutsForDay from '../database/loadWorkoutsForDay';
import addWorkout from '../database/addWorkouts';

type WorkoutViewProps = {
  day: string;
};

type WorkoutInput = {
  name: string;
  sets: number;
  reps: number;
};

type WorkoutCardProps = {
  workoutInput: WorkoutInput;
  onChange: (field: keyof WorkoutInput, value: string) => void;
};

const WorkoutView: React.FC<WorkoutViewProps> = ({day}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutInputs, setWorkoutInputs] = useState<WorkoutInput[]>([]);

  const db = useDatabase();

  useEffect(() => {
    if (db) {
      loadWorkoutsForDay(db, day, setWorkouts);
    }
  }, [db, day]);

  const getNextMonday = (): Date => {
    const now = new Date();
    now.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
    now.setHours(0, 0, 0, 0);
    return now;
  };

  const resetWeeklyProgress = () => {
    // Reset progress logic here
    // Schedule next reset
    scheduleWeeklyReset();
  };

  useEffect(() => {
    const timeoutId = scheduleWeeklyReset();
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleWeeklyReset = () => {
    const nextMonday = getNextMonday();
    const msUntilNextMonday = nextMonday.getTime() - new Date().getTime();
    return setTimeout(resetWeeklyProgress, msUntilNextMonday);
  };

  const addNewWorkoutInput = () => {
    if (workoutInputs.length < 10) {
      setWorkoutInputs([...workoutInputs, {name: '', sets: 0, reps: 0}]);
    }
  };

  const handleWorkoutChange = (
    index: number,
    field: keyof WorkoutInput,
    value: string,
  ) => {
    const updatedWorkouts = [...workoutInputs];
    if (field === 'sets' || field === 'reps') {
      updatedWorkouts[index][field] = parseInt(value) || 0;
    } else {
      updatedWorkouts[index][field] = value;
    }
    setWorkoutInputs(updatedWorkouts);
  };

  const saveWorkouts = () => {
    if (db) {
      workoutInputs.forEach(workout => {
        if (!workouts.find(w => w.name === workout.name && w.day === day)) {
          addWorkout(db, workout.name, workout.sets, workout.reps, day);
        }
      });
    } else {
      console.error('Database not initialized');
    }
  };

  return (
    <View style={styles.container}>
      {workoutInputs.map((workout, index) => (
        <WorkoutCard
          key={index}
          workoutInput={workout}
          onChange={(field, value) => handleWorkoutChange(index, field, value)}
        />
      ))}
      <Button title="+" onPress={addNewWorkoutInput} />
      <Button title="Save Workouts" onPress={saveWorkouts} />
    </View>
  );
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({workoutInput, onChange}) => {
  return (
    <View style={styles.card}>
      <TextInput
        placeholder="Workout Name"
        value={workoutInput.name}
        onChangeText={text => onChange('name', text)}
      />
      <TextInput
        placeholder="Sets"
        value={workoutInput.sets.toString()}
        onChangeText={text => onChange('sets', text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Reps"
        value={workoutInput.reps.toString()}
        onChangeText={text => onChange('reps', text)}
        keyboardType="numeric"
      />
      {/* Render circles for sets */}
      {Array.from({length: Math.min(workoutInput.sets, 5)}, (_, i) => (
        <View key={i} style={styles.circle}>
          <Text>{i + 1}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles for the container
  },
  card: {
    // Styles for each workout card
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  circle: {
    // Styles for the circles representing sets
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});

export default WorkoutView;
