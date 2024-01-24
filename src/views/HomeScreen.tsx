import * as React from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import WorkoutView from '../components/WorkoutView';
import FooterBar from '../components/FooterBar';

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
    <View>
      <HeaderBar
        days={days}
        selectedDay={selectedDay}
        dayCompleted={dayCompleted}
        setSelectedDay={setSelectedDay}
      />
      {selectedDay && (
        <WorkoutView
          day={selectedDay}
          onDayCompletionChange={handleDayCompletionChange}
        />
      )}
      <FooterBar />
    </View>
  );
};

export default HomeScreen;
