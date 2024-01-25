import * as React from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import WorkoutView from '../components/WorkoutView';

const HomeScreen = () => {
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

  const handleDayCompletionChange = useCallback(
    (date: string, completed: boolean) => {
      const dayOfWeek = new Date(`${date}T12:00:00`).getDay();
      const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const dayName = days[adjustedDay];

      setDayCompleted(prev => {
        if (prev[dayName] !== completed) {
          return {...prev, [dayName]: completed};
        }
        return prev;
      });
    },
    [days],
  );

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
