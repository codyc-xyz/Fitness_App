import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import WorkoutProgressRecord from '../types/WorkoutProgressRecord';

type FetchAllWorkoutProgressFunction = (
  db: SQLiteDatabase,
  name: string,
  sets: number,
  reps: number,
  setWorkoutProgress: (workoutProgress: WorkoutProgressRecord[]) => void,
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
      'SELECT weight, date, unit, success FROM progress WHERE name = ? AND sets = ? AND reps = ?;',
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
