import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WorkoutCalendar from '../components/WorkoutCalendar';
import {useDatabase} from '../contexts/DatabaseContext'; // Import your useDatabase hook
import Workout from '../types/Workout';

const HistoryScreen: React.FC = () => {
  const db = useDatabase();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const onDaySelected = (date: string) => {
    setSelectedDay(date);
    if (db) {
      fetchWorkoutsForDay(db, date, (fetchedWorkouts: Workout[]) => {
        setWorkouts(fetchedWorkouts);
      });
    }
  };

  return (
    <View style={styles.container}>
      {db && <WorkoutCalendar db={db} onDaySelected={onDaySelected} />}
      {selectedDay && (
        <View style={styles.workoutList}>
          {/* Render the list of workouts for the selected day */}
          {workouts.map((workout, index) => (
            <Text key={index}>{workout.name}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

// ... [styles]

export default HistoryScreen;
