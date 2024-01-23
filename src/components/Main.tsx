import * as React from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import HeaderBar from './HeaderBar';
import WorkoutView from './WorkoutView';

const Main = () => {
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
      console.log(date);
      const dayOfWeek = new Date(`${date}T12:00:00`).getDay();
      console.log(dayOfWeek);
      const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      console.log(adjustedDay);
      const dayName = days[adjustedDay];
      console.log(dayName, days, adjustedDay);

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
    </View>
  );
};

export default Main;
