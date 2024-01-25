import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import Workout from '../types/Workout';

type FetchWorkoutsForDateFunction = (
  db: SQLiteDatabase,
  date: string,
  setWorkouts?: (workouts: Workout[]) => void,
  onDayCompletionChange?: (
    date: string | Date | number,
    allCompleted: boolean,
  ) => void,
) => void;

const fetchWorkoutsForDate: FetchWorkoutsForDateFunction = (
  db,
  date,
  setWorkouts,
  onDayCompletionChange,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT * FROM progress WHERE date = ?;',
      [date],
      (tx, results: any) => {
        let workouts: Workout[] = [];
        for (let i = 0; i < results.rows.length; ++i) {
          workouts.push(results.rows.item(i));
        }
        if (setWorkouts) {
          setWorkouts(workouts);
        }
        if (onDayCompletionChange) {
          onDayCompletionChange(date, workouts.length > 0);
        }
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default fetchWorkoutsForDate;
