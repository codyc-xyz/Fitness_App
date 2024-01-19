import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import ProgressRecord from '../types/ProgressRecord';

type GetProgressForWorkoutFunction = (
  db: SQLiteDatabase,
  workout_id: number,
  callback: (progressRecords: ProgressRecord[]) => void,
) => void;

const getProgressForWorkout: GetProgressForWorkoutFunction = (
  db,
  workout_id,
  callback,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT * FROM progress WHERE workout_id = ?;',
      [workout_id],
      (tx, results: any) => {
        let progressRecords: ProgressRecord[] = [];
        for (let i = 0; i < results.rows.length; i++) {
          progressRecords.push(results.rows.item(i));
        }
        callback(progressRecords);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message), // Corrected error callback
    );
  });
};

export default getProgressForWorkout;
