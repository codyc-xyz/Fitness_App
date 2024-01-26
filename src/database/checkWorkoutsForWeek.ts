// Import or define the types for your database and transaction
import {
  SQLiteDatabase,
  SQLError,
  Transaction,
  ResultSet,
} from 'react-native-sqlite-storage';

type SetDayCompletedFunction = (daysCompleted: Record<string, boolean>) => void;

const days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const checkWorkoutsForWeek = (
  db: SQLiteDatabase,
  startDate: string,
  endDate: string,
  setDayCompleted: SetDayCompletedFunction,
) => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      'SELECT DISTINCT date FROM progress WHERE date BETWEEN ? AND ?;',
      [startDate, endDate],
      (tx: Transaction, results: ResultSet) => {
        let daysCompleted: Record<string, boolean> = {};
        for (let i = 0; i < results.rows.length; ++i) {
          const date = new Date(results.rows.item(i).date);
          const dayOfWeek = (date.getDay() + 6) % 7;
          const dayName = days[dayOfWeek];
          daysCompleted[dayName] = true;
        }
        setDayCompleted(daysCompleted);
      },
      (tx: Transaction, error: SQLError) =>
        console.log('Error: ' + error.message),
    );
  });
};

export default checkWorkoutsForWeek;
