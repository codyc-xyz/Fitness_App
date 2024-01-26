import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import WorkoutView from '../components/WorkoutView';
import {useDatabase} from '../contexts/DatabaseContext';
import checkWorkoutsForWeek from '../database/checkWorkoutsForWeek';

const HomeScreen = () => {
  const db = useDatabase();
  const days = useMemo(
    () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [],
  );

  const [selectedDay, setSelectedDay] = useState('');
  const [dayCompleted, setDayCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const today = new Date().getDay();
    const adjustedDay = today === 0 ? 6 : today - 1;
    setSelectedDay(days[adjustedDay]);
  }, [days]);

  const getWeekStartAndEnd = () => {
    const currentDate = new Date();
    const dayOfWeek = (currentDate.getDay() + 6) % 7;
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - dayOfWeek);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const startOfWeek = firstDayOfWeek.toLocaleDateString('en-CA');
    const endOfWeek = lastDayOfWeek.toLocaleDateString('en-CA');

    return {startOfWeek, endOfWeek};
  };
  useEffect(() => {
    const {startOfWeek, endOfWeek} = getWeekStartAndEnd();
    if (db) {
      checkWorkoutsForWeek(db, startOfWeek, endOfWeek, setDayCompleted);
    }
  }, [db]);

  return (
    <View style={styles.container}>
      <HeaderBar
        days={days}
        selectedDay={selectedDay}
        dayCompleted={dayCompleted}
        setSelectedDay={setSelectedDay}
      />
      <View>{selectedDay && <WorkoutView day={selectedDay} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    marginHorizontal: 8,
  },
});

export default HomeScreen;
