import {
  SQLiteDatabase,
  SQLError,
  Transaction,
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
      (tx, results: any) => {
        let daysCompleted: Record<string, boolean> = {};
        for (let i = 0; i < results.rows.length; ++i) {
          const dateString = results.rows.item(i).date;
          const date = new Date(dateString);

          const dayOfWeek = date.getDay();

          const dayName = days[dayOfWeek];

          daysCompleted[dayName] = true;
        }
        setDayCompleted(daysCompleted);
      },
      (tx, error: SQLError) => console.log('Error: ' + error.message),
    );
  });
};

export default checkWorkoutsForWeek;
