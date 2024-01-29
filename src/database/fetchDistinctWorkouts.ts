import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import DistinctWorkoutRecord from '../types/DistinctWorkoutRecord';

type FetchDistinctWorkoutsFunction = (
  db: SQLiteDatabase,
  setDistinctWorkouts: (distinctWorkouts: DistinctWorkoutRecord[]) => void,
) => void;

const fetchDistinctWorkouts: FetchDistinctWorkoutsFunction = (
  db,
  setDistinctWorkouts,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT DISTINCT name, sets, reps FROM progress ORDER BY name;',
      [],
      (tx, results: any) => {
        let distinctWorkouts = [];
        for (let i = 0; i < results.rows.length; ++i) {
          distinctWorkouts.push(results.rows.item(i));
        }
        setDistinctWorkouts(distinctWorkouts);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default fetchDistinctWorkouts;
