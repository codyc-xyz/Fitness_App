import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import ProgressRecord from '../types/ProgressRecord';

type FetchAllWorkoutProgressFunction = (
  db: SQLiteDatabase,
  name: string,
  sets: number,
  reps: number,
  setWorkoutProgress: (workoutProgress: ProgressRecord[]) => void,
) => void;

const fetchAllWorkoutProgress: FetchAllWorkoutProgressFunction = (
  db,
  name,
  sets,
  reps,
  setWorkoutProgress,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT weight, date, success FROM progress WHERE name = ? AND sets = ? AND reps = ?;',
      [name, sets, reps],
      (tx, results: any) => {
        let workoutProgress = [];
        for (let i = 0; i < results.rows.length; ++i) {
          workoutProgress.push(results.rows.item(i));
        }
        setWorkoutProgress(workoutProgress);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default fetchAllWorkoutProgress;
