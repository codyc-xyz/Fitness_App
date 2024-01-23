import * as React from 'react';
import {useState, useEffect} from 'react';
import {View} from 'react-native';
import HeaderBar from './HeaderBar';
import WorkoutView from './WorkoutView';

const Main = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedDay, setSelectedDay] = useState('');
  const [dayCompleted, setDayCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const today = new Date().getDay();
    const adjustedDay = today === 0 ? 6 : today - 1;
    setSelectedDay(days[adjustedDay]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDayCompletionChange = (day: string, completed: boolean) => {
    setDayCompleted(prev => ({...prev, [day]: completed}));
  };

  return (
    <View>
      <HeaderBar
        days={days}
        selectedDay={selectedDay}
        dayCompleted={dayCompleted[selectedDay]}
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
