import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import Workout from '../types/Workout';

type LoadWorkoutsForDayFunction = (
  db: SQLiteDatabase,
  day: string,
  setWorkouts: (workouts: Workout[]) => void,
) => void;

const loadWorkoutsForDay: LoadWorkoutsForDayFunction = (
  db,
  day,
  setWorkouts,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT * FROM workouts WHERE day = ?;',
      [day],
      (tx, results: any) => {
        let workouts: Workout[] = [];
        for (let i = 0; i < results.rows.length; ++i) {
          workouts.push(results.rows.item(i));
        }
        setWorkouts(workouts);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default loadWorkoutsForDay;
