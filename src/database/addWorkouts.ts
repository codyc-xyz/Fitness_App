import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';

type AddWorkoutFunction = (
  db: SQLiteDatabase,
  name: string,
  sets: number,
  reps: number,
  day: string,
) => void;

const addWorkout: AddWorkoutFunction = (db, name, sets, reps, day) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'INSERT INTO workouts (name, sets, reps, day) VALUES (?, ?, ?, ?);',
      [name, sets, reps, day],
      (tx, results: any) => console.log('Workout added', results), // Replace 'any' with the correct type if available
      (tx, error: SQLError) => console.log('Error: ' + error.message), // Corrected error callback
    );
  });
};

export default addWorkout;
