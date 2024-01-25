import {SQLiteDatabase} from 'react-native-sqlite-storage';

const createTables = (db: SQLiteDatabase) => {
  console.log('Creating tables...');
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, sets INTEGER, reps INTEGER, day TEXT);',
      [],
      () => console.log('Workouts table created'),
      (tx, error) => {
        console.log('Error: ' + error.message);
        return false; // The TypeScript type for the error callback expects a boolean return
      },
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, sets INTEGER, reps INTEGER, workout_id INTEGER, date TEXT, weight INTEGER, unit TEXT, set_reps TEXT, success BOOLEAN, FOREIGN KEY(workout_id) REFERENCES workouts(id));',
      [],
      () => console.log('Progress table created'),
      (tx, error) => {
        console.log('Error: ' + error.message);
        return false;
      },
    );
  });
};

export default createTables;
