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

  const getLocalMonthString = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11

    return `${year}-${month.toString().padStart(2, '0')}`; // Format: YYYY-MM
  };

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

    const month = getLocalMonthString();
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
