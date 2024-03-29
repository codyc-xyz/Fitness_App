import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
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

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

const WorkoutView: React.FC<WorkoutViewProps> = ({day}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutInputs, setWorkoutInputs] = useState<WorkoutInput[]>([]);
  const [, setCompletedWorkouts] = useState<Record<string, boolean>>({});

  const db = useDatabase();

  const dayMapping: Record<Day, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  useEffect(() => {
    if (db) {
      loadWorkoutsForDay(db, day, setWorkouts);
    }
  }, [db, day]);

  useEffect(() => {
    setWorkoutInputs([]);
  }, [day]);

  const handleWorkoutCompletionChange = useCallback(
    (workoutId: number, completed: boolean) => {
      setCompletedWorkouts(prev => {
        if (prev[workoutId] !== completed) {
          return {...prev, [workoutId]: completed};
        }
        return prev;
      });
    },
    [],
  );

  const getDateForDay = (dayString: Day) => {
    const dayOfWeek = dayMapping[dayString];
    if (dayOfWeek === undefined) {
      throw new Error(`Invalid day string: ${dayString}`);
    }

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const adjustedCurrentDay = currentDay === 0 ? 6 : currentDay - 1;

    let distance = dayOfWeek - adjustedCurrentDay;

    currentDate.setDate(currentDate.getDate() + distance);
    return (
      currentDate.getFullYear() +
      '-' +
      String(currentDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(currentDate.getDate()).padStart(2, '0')
    );
  };

  const dateForDay = getDateForDay(day as Day);

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
          loadWorkoutsForDay(db, day, setWorkouts);
        }
      });
    } else {
      console.error('Database not initialized');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {db &&
          workouts.map(workout => (
            <WorkoutCard
              key={`${workout.id}-${day}`}
              name={workout.name}
              sets={workout.sets}
              reps={workout.reps}
              workoutId={workout.id}
              date={dateForDay}
              db={db}
              onCompletionChange={completed =>
                handleWorkoutCompletionChange(workout.id, completed)
              }
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
    height: '85%',
  },
});

export default WorkoutView;
