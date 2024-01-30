import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import WorkoutCalendar from '../components/WorkoutCalendar';
import {useDatabase} from '../contexts/DatabaseContext';
import fetchWorkoutsForDate from '../database/fetchWorkoutsForDate';
import WorkoutCard from '../components/WorkoutCard';
import ProgressRecord from '../types/ProgressRecord';

const HistoryScreen: React.FC = () => {
  const db = useDatabase();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<ProgressRecord[]>([]);
  console.log(selectedDay);
  const onDaySelected = (date: string) => {
    setSelectedDay(date);
    if (db) {
      fetchWorkoutsForDate(db, date, (fetchedWorkouts: any[]) => {
        setWorkouts(fetchedWorkouts);
      });
    }
  };
  console.log(workouts);
  return (
    <View style={styles.container}>
      {db && <WorkoutCalendar db={db} onDaySelected={onDaySelected} />}
      {selectedDay && db && (
        <ScrollView>
          {workouts.map(workout => (
            <WorkoutCard
              key={`${workout.workout_id}-${workout.date}`}
              name={workout.name}
              sets={workout.sets}
              reps={workout.reps}
              workoutId={workout.workout_id}
              date={selectedDay}
              db={db}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    height: '90%',
  },
});

export default HistoryScreen;
