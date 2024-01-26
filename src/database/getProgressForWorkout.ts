import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import ProgressRecord from '../types/ProgressRecord';

type GetProgressForWorkoutFunction = (
  db: SQLiteDatabase,
  workout_id: number,
  date: string,
  callback: (progressRecords: ProgressRecord[]) => void,
) => void;

const getProgressForWorkout: GetProgressForWorkoutFunction = (
  db,
  workout_id,
  date,
  callback,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT * FROM progress WHERE workout_id = ? AND date = ?;',
      [workout_id, date],
      (tx, results: any) => {
        let progressRecords: ProgressRecord[] = [];
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);

          if (row.set_reps) {
            row.set_reps = JSON.parse(row.set_reps);
          } else {
            row.set_reps = [];
          }
          progressRecords.push(row);
        }
        callback(progressRecords);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default getProgressForWorkout;
