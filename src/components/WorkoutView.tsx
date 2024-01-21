import React, {useState, useEffect} from 'react';
import {ScrollView, View, Button, StyleSheet} from 'react-native';
import Workout from '../types/Workout';
import WorkoutInput from '../types/WorkoutInput';
import {useDatabase} from '../contexts/DatabaseContext';
import loadWorkoutsForDay from '../database/loadWorkoutsForDay';
import addWorkout from '../database/addWorkouts';
import WorkoutInputCard from './WorkoutInputCard';
import WorkoutCard from './WorkoutCard';
import removeWorkout from '../database/removeWorkout';

type WorkoutViewProps = {
  day: string;
};

const WorkoutView: React.FC<WorkoutViewProps> = ({day}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutInputs, setWorkoutInputs] = useState<WorkoutInput[]>([]);

  const db = useDatabase();

  useEffect(() => {
    if (db) {
      loadWorkoutsForDay(db, day, setWorkouts);
    }
  }, [db, day, workouts]);

  useEffect(() => {
    setWorkoutInputs([]);
  }, [day]);

  const addNewWorkoutInput = () => {
    if (workoutInputs.length < 10) {
      setWorkoutInputs([...workoutInputs, {name: '', sets: 0, reps: 0}]);
    }
  };

  const removeWorkoutInput = () => {
    setWorkoutInputs(currentWorkouts => currentWorkouts.slice(0, -1));
  };

  const handleRemoveWorkout = (name: string) => {
    if (db) {
      removeWorkout(db, name, day);
      setWorkouts(currentWorkouts =>
        currentWorkouts.filter(
          workout => workout.name !== name || workout.day !== day,
        ),
      );
    } else {
      console.error('Database not initialized');
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
          setWorkoutInputs([]);
        }
      });
    } else {
      console.error('Database not initialized');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            name={workout.name}
            sets={workout.sets}
            reps={workout.reps}
            onRemove={() => handleRemoveWorkout(workout.name)}
          />
        ))}
        {workoutInputs.map((workout, index) => (
          <WorkoutInputCard
            key={index}
            workoutInput={workout}
            onChange={(field, value) =>
              handleWorkoutChange(index, field, value)
            }
            onRemove={() => removeWorkoutInput()}
          />
        ))}
        <Button title="+" onPress={addNewWorkoutInput} />
        <Button title="Save Workouts" onPress={saveWorkouts} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
});

export default WorkoutView;
