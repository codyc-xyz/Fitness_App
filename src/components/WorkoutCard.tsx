import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

type WorkoutCardProps = {
  name: string;
  sets: number;
  reps: number;
  onRemove: () => void;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  name,
  sets,
  reps,
  onRemove,
}) => {
  const initialSetState = {clicked: false, count: reps};
  const [setDetails, setSetDetails] = useState(
    new Array(sets).fill(initialSetState),
  );
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg'); // default unit

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

  const handleRemove = () => {
    onRemove();
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Weight"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={unit}
          onValueChange={itemValue => setUnit(itemValue)}
          style={styles.picker}
          mode="dropdown">
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="lb" value="lb" />
        </Picker>
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
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  removeButtonText: {
    fontWeight: 'bold',
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  picker: {
    flex: 1,
    ...(Platform.OS === 'android' && {color: 'blue'}), // Optional styling for Android
  },
});

export default WorkoutCard;
