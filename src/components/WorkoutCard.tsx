import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import recordProgress from '../database/recordProgress';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Icon} from '@rneui/themed';
import getProgressForWorkout from '../database/getProgressForWorkout';

type WorkoutCardProps = {
  name: string;
  sets: number;
  reps: number;
  workoutId: number;
  date: string;
  db: SQLiteDatabase;
  onRemove: () => void;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  name,
  sets,
  reps,
  workoutId,
  db,
  date,
  onRemove,
}) => {
  const initialSetState = {clicked: false, count: reps};
  const [setDetails, setSetDetails] = useState(
    new Array(sets).fill(initialSetState),
  );
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    getProgressForWorkout(db, workoutId, date, progressRecords => {
      console.log(progressRecords);
      if (progressRecords.length > 0) {
        setSubmitted(true);

        const recordWeight = progressRecords[0].weight;
        setWeight(recordWeight.toString());

        const newSetDetails = progressRecords[0].set_reps.map(repCount => ({
          clicked: true,
          count: repCount,
        }));
        setSetDetails(newSetDetails);

        const recordUnit = progressRecords[0].unit;
        setUnit(recordUnit);
      }
    });
  }, [db, workoutId, date]);

  const handleSubmit = () => {
    const success = setDetails.every(set => set.count >= reps);
    const currentDate = new Date().toISOString().split('T')[0];

    recordProgress(
      db,
      workoutId,
      currentDate,
      parseFloat(weight),
      unit,
      setDetails,
      success,
    );
    setSubmitted(true);
  };

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'kg' ? 'lbs' : 'kg'));
  };

  const toggleSetCompletion = (index: number) => {
    setSetDetails(
      setDetails.map((set, i) => {
        if (i === index) {
          if (set.count === 0) {
            return {...initialSetState, count: reps};
          } else {
            return {
              clicked: true,
              count: set.clicked ? set.count - 1 : set.count,
            };
          }
        }
        return set;
      }),
    );
  };

  const handleRemove = () => {
    onRemove();
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.workoutHeader}>{`${name} ${sets}x${reps}`}</Text>
        <TextInput
          style={styles.weightInput}
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
          placeholder="Weight"
        />
        <TouchableOpacity style={styles.unitButton} onPress={toggleUnit}>
          <Text style={styles.unitText}>{unit.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>

      <View style={styles.setsContainer}>
        {setDetails.map((set, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.setCircle,
              set.clicked
                ? set.count < reps
                  ? styles.yellowSet
                  : styles.completedSet
                : styles.incompleteSet,
            ]}
            onPress={() => toggleSetCompletion(index)}>
            <Text style={styles.setNumber}>{set.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.submitRow}>
        {!submitted ? (
          <TouchableOpacity
            style={
              weight === '' || setDetails.some(set => !set.clicked)
                ? styles.submitButtonDisabled
                : styles.submitButton
            }
            onPress={handleSubmit}
            disabled={weight === '' || setDetails.some(set => !set.clicked)}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.checkmarkContainer}>
            <Icon
              name="check-circle-outline"
              size={32}
              type="Ionicons"
              color="#4CAF50"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  workoutHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  completedSet: {
    backgroundColor: '#4CAF50',
  },
  incompleteSet: {
    backgroundColor: '#eee',
  },
  setNumber: {
    fontSize: 14,
  },
  yellowSet: {
    backgroundColor: 'yellow',
  },
  removeButton: {
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  removeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weightInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    minWidth: 40,
    marginRight: 8,
    textAlign: 'center',
  },
  unitButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 8,
  },
  unitText: {
    fontWeight: 'bold',
  },
  submitRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  submitButton: {
    padding: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  submitButtonDisabled: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  checkmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WorkoutCard;
