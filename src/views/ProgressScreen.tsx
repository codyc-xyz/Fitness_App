import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDatabase} from '../contexts/DatabaseContext';
import fetchDistinctWorkouts from '../database/fetchDistinctWorkouts';
import fetchAllWorkoutProgress from '../database/fetchAllWorkoutProgress';
import DistinctWorkoutRecord from '../types/DistinctWorkoutRecord';
import WorkoutProgressRecord from '../types/WorkoutProgressRecord';
import WorkoutGraph from '../components/WorkoutGraph';

const ProgressScreen: React.FC = () => {
  const db = useDatabase();
  const [distinctWorkouts, setDistinctWorkouts] = useState<
    DistinctWorkoutRecord[]
  >([]);
  const [selectedWorkout, setSelectedWorkout] =
    useState<DistinctWorkoutRecord | null>(null);
  const [workoutProgress, setWorkoutProgress] = useState<
    WorkoutProgressRecord[]
  >([]);

  const insets = useSafeAreaInsets();

  const containerStyle = {
    ...styles.container,
    paddingTop: insets.top,
  };

  useEffect(() => {
    if (db) {
      fetchDistinctWorkouts(db, setDistinctWorkouts);
    }
  }, [db]);

  const onCardPress = (workout: DistinctWorkoutRecord) => {
    if (db) {
      setSelectedWorkout(workout);
      fetchAllWorkoutProgress(
        db,
        workout.name,
        workout.sets,
        workout.reps,
        setWorkoutProgress,
      );
    }
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>Completed Workouts</Text>
      <ScrollView>
        {distinctWorkouts.map((workout, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onCardPress(workout)}>
            <Text style={styles.cardText}>
              {workout.name} - {workout.sets}x{workout.reps}
            </Text>
          </TouchableOpacity>
        ))}
        {selectedWorkout && <WorkoutGraph data={workoutProgress} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    marginHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },

  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProgressScreen;
