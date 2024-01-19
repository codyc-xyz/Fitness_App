import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

const openDatabase = (): Promise<SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      {
        name: 'FitnessAppDB',
        location: 'default',
      },
      db => {
        console.log('SQLite Database Connected');
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
