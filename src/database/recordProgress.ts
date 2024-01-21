import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';

type RecordProgressFunction = (
  db: SQLiteDatabase,
  workout_id: number,
  date: string,
  weight: number,
  unit: string,
  success: boolean,
) => void;

const recordProgress: RecordProgressFunction = (
  db,
  workout_id,
  date,
  weight,
  unit,
  success,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'INSERT INTO progress (workout_id, date, weight, unit, success) VALUES (?, ?, ?, ?, ?);',
      [workout_id, date, weight, unit, success],
      (tx, results: any) => console.log('Progress recorded', results),
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default recordProgress;
