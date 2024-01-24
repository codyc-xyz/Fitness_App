import React, {useState, useEffect} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import checkWorkoutsForMonth from '../database/fetchWorkoutsForMonth';

interface WorkoutCalendarProps {
  db: SQLiteDatabase;
  onDaySelected: (date: string) => void;
}

interface MarkedDates {
  [date: string]: {
    marked: boolean;
    dotColor: string;
  };
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({
  db,
  onDaySelected,
}) => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const loadWorkoutsForMonth = (month: string) => {
      checkWorkoutsForMonth(db, month, (daysWithWorkouts: string[]) => {
        const marked: MarkedDates = {};
        daysWithWorkouts.forEach(day => {
          marked[day] = {marked: true, dotColor: 'green'};
        });
        setMarkedDates(marked);
      });
    };

    const month = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    loadWorkoutsForMonth(month);
  }, [db]);

  const onDayPress = (day: DateData) => {
    if (markedDates[day.dateString]) {
      onDaySelected(day.dateString);
    }
  };

  return <Calendar onDayPress={onDayPress} markedDates={markedDates} />;
};

export default WorkoutCalendar;
