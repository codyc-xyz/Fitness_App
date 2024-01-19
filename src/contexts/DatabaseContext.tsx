import React, {createContext, useContext} from 'react';
import openDatabase from '../database/SQLiteDB';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

const DatabaseContext = createContext<SQLiteDatabase | null>(null);

type DatabaseProviderProps = {
  children: React.ReactNode;
};

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
}) => {
  const [db, setDb] = React.useState<SQLiteDatabase | null>(null);

  React.useEffect(() => {
    openDatabase()
      .then(database => {
        setDb(database);
      })
      .catch(error => {
        console.error('Failed to open database:', error);
      });
  }, []);

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
