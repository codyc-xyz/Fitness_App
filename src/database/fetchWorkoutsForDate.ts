import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import ProgressRecord from '../types/Workout';

type FetchWorkoutsForDateFunction = (
  db: SQLiteDatabase,
  date: string,
  setWorkouts: (workouts: ProgressRecord[]) => void,
) => void;

const fetchWorkoutsForDate: FetchWorkoutsForDateFunction = (
  db,
  date,
  setWorkouts,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT * FROM progress WHERE date = ?;',
      [date],
      (tx, results: any) => {
        let workouts: ProgressRecord[] = [];
        for (let i = 0; i < results.rows.length; ++i) {
          workouts.push(results.rows.item(i));
        }
        setWorkouts(workouts);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default fetchWorkoutsForDate;
