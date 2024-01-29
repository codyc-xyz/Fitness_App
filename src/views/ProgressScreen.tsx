import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    height: '90%',
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
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProgressScreen;
