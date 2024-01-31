import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const loadWorkoutsForMonth = useCallback(
    (month: string) => {
      checkWorkoutsForMonth(db, month, (daysWithWorkouts: string[]) => {
        const marked: MarkedDates = {};
        daysWithWorkouts.forEach(day => {
          marked[day] = {marked: true, dotColor: 'green'};
        });
        setMarkedDates(marked);
      });
    },
    [db],
  );

  useEffect(() => {
    const currentMonth = getMonthString(new Date());
    loadWorkoutsForMonth(currentMonth);
  }, [loadWorkoutsForMonth]);

  const getMonthString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
  };

  const onMonthChange = (monthData: {month: number; year: number}) => {
    const monthString = `${monthData.year}-${monthData.month
      .toString()
      .padStart(2, '0')}`;
    loadWorkoutsForMonth(monthString);
  };

  const onDayPress = (day: DateData) => {
    if (markedDates[day.dateString]) {
      onDaySelected(day.dateString);
    }
  };

  const calendarStyle = {
    paddingTop: insets.top,
  };

  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={markedDates}
      style={calendarStyle}
      onMonthChange={onMonthChange}
    />
  );
};

export default WorkoutCalendar;
