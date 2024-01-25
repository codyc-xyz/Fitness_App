import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import {SetDetail} from '../types/ProgressRecord';

type RecordProgressFunction = (
  db: SQLiteDatabase,
  workout_id: number,
  name: string,
  sets: number,
  reps: number,
  date: string,
  weight: number,
  unit: string,
  setDetails: SetDetail[],
  success: boolean,
) => void;

const recordProgress: RecordProgressFunction = (
  db,
  workout_id,
  date,
  weight,
  unit,
  setDetails,
  success,
) => {
  const setRepsString = JSON.stringify(setDetails.map(set => set.count));

  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'INSERT INTO progress (workout_id, date, weight, unit, set_reps, success) VALUES (?, ?, ?, ?, ?, ?);',
      [workout_id, date, weight, unit, setRepsString, success],
      (tx, results: any) => console.log('Progress recorded', results),
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default recordProgress;
