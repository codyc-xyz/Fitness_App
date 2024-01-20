import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type WorkoutCardProps = {
  name: string;
  sets: number;
  reps: number;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({name, sets, reps}) => {
  const [completedSets, setCompletedSets] = useState<Array<boolean>>(
    new Array(sets).fill(false),
  );

  const toggleSetCompletion = (index: number) => {
    const updatedSets = [...completedSets];
    updatedSets[index] = !updatedSets[index];
    setCompletedSets(updatedSets);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.workoutHeader}>{`${name} ${sets}x${reps}`}</Text>
      <View style={styles.setsContainer}>
        {completedSets.map((completed, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.setCircle, completed ? styles.completedSet : null]}
            onPress={() => toggleSetCompletion(index)}>
            <Text style={styles.setNumber}>{reps}</Text>
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
    backgroundColor: 'lightgreen', // A pleasant shade of green
  },
  setNumber: {
    fontSize: 16,
  },
});

export default WorkoutCard;
