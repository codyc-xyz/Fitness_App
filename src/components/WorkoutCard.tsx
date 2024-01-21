import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type WorkoutCardProps = {
  name: string;
  sets: number;
  reps: number;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({name, sets, reps}) => {
  const initialSetState = {clicked: false, count: reps};
  const [setDetails, setSetDetails] = useState(
    new Array(sets).fill(initialSetState),
  );

  const toggleSetCompletion = (index: number) => {
    setSetDetails(
      setDetails.map((set, i) => {
        if (i === index) {
          if (set.count === 0) {
            return {...initialSetState, count: 5};
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

  return (
    <View style={styles.card}>
      <Text style={styles.workoutHeader}>{`${name} ${sets}x${reps}`}</Text>
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
                : null,
            ]}
            onPress={() => toggleSetCompletion(index)}>
            <Text style={styles.setNumber}>{set.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  workoutHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    margin: 5,
  },
  completedSet: {
    backgroundColor: 'lightgreen',
  },
  setNumber: {
    fontSize: 16,
  },
  yellowSet: {
    backgroundColor: 'yellow',
  },
});

export default WorkoutCard;
