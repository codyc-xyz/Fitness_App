import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import ProgressRecord from '../types/ProgressRecord';

type FetchDistinctWorkoutsFunction = (
  db: SQLiteDatabase,
  setDistinctWorkouts: (distinctWorkouts: ProgressRecord[]) => void,
) => void;

const fetchDistinctWorkouts: FetchDistinctWorkoutsFunction = (
  db,
  setDistinctWorkouts,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT name, sets, reps FROM progress GROUP BY name, sets, reps;',
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
