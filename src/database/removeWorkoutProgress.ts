import {SQLiteDatabase, SQLError} from 'react-native-sqlite-storage';

const removeWorkoutProgress = (
  db: SQLiteDatabase,
  name: string,
  sets: number,
  reps: number,
  onSuccess: () => void,
  onError: (error: SQLError) => void,
) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM progress WHERE name = ? AND sets = ? AND reps = ?',
      [name, sets, reps],
      () => {
        onSuccess();
      },
      (_, error) => {
        onError(error);
        return false;
      },
    );
  });
};

export default removeWorkoutProgress;
