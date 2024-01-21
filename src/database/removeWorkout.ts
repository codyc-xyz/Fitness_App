import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';

type RemoveWorkoutFunction = (
  db: SQLiteDatabase,
  name: string,
  day: string,
) => void;

const removeWorkout: RemoveWorkoutFunction = (db, name, day) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'DELETE FROM workouts WHERE name = ? AND day = ?;',
      [name, day],
      () => console.log(`Workout ${name} removed`),
      (tx: Transaction, error: SQLError) =>
        console.log('Error: ' + error.message),
    );
  });
};

export default removeWorkout;
