import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import createTables from './createTables';

const openDatabase = (): Promise<SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      {
        name: 'FitnessAppDB',
        location: 'default',
      },
      db => {
        console.log('SQLite Database Connected');
        createTables(db);
        resolve(db);
      },
      error => {
        console.log('Error opening database: ' + error.message);
        reject(error);
      },
    );
  });
};

export default openDatabase;
