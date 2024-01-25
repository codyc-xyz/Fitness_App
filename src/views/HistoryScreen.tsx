import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import WorkoutCalendar from '../components/WorkoutCalendar';
import {useDatabase} from '../contexts/DatabaseContext'; // Import your useDatabase hook
import Workout from '../types/Workout';
import fetchWorkoutsForDate from '../database/fetchWorkoutsForDate';
import WorkoutCard from '../components/WorkoutCard';

const HistoryScreen: React.FC = () => {
  const db = useDatabase();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const onDaySelected = (date: string) => {
    setSelectedDay(date);
    if (db) {
      fetchWorkoutsForDate(db, date, (fetchedWorkouts: Workout[]) => {
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
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              name={workout.name}
              sets={workout.sets}
              reps={workout.reps}
              workoutId={workout.id}
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
