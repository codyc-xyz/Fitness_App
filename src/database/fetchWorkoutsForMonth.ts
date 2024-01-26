import {
  SQLiteDatabase,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';

type CheckWorkoutsForMonthFunction = (
  db: SQLiteDatabase,
  month: string,
  setDaysWithWorkouts: (days: string[]) => void,
) => void;

const checkWorkoutsForMonth: CheckWorkoutsForMonthFunction = (
  db,
  month,
  setDaysWithWorkouts,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT DISTINCT date FROM progress WHERE date LIKE ?;',
      [`${month}%`],
      (tx, results: any) => {
        let daysWithWorkouts: string[] = [];
        for (let i = 0; i < results.rows.length; ++i) {
          daysWithWorkouts.push(results.rows.item(i).date);
          console.log(daysWithWorkouts);
        }
        setDaysWithWorkouts(daysWithWorkouts);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default checkWorkoutsForMonth;
