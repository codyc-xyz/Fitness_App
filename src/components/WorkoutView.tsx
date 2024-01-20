import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import Workout from '../types/Workout';
import {useDatabase} from '../contexts/DatabaseContext';
import loadWorkoutsForDay from '../database/loadWorkoutsForDay';
import addWorkout from '../database/addWorkouts';
import WorkoutInputCard from './WorkoutInputCard';
import WorkoutInput from '../types/WorkoutInput';

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
  }, [db, day]);

  useEffect(() => {
    setWorkoutInputs([]);
  }, [day]);

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

  const removeWorkoutInput = () => {
    setWorkoutInputs(currentWorkouts => currentWorkouts.slice(0, -1));
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
        <WorkoutInputCard
          key={index}
          workoutInput={workout}
          onChange={(field, value) => handleWorkoutChange(index, field, value)}
          onRemove={removeWorkoutInput}
        />
      ))}
      <Button title="+" onPress={addNewWorkoutInput} />
      <Button title="Save Workouts" onPress={saveWorkouts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
});

export default WorkoutView;
