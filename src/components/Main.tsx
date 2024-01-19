import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import HeaderBar from './HeaderBar';
import WorkoutView from './WorkoutView';

const Main = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const today = new Date().getDay() - 1;
    setSelectedDay(days[Math.max(0, today)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <HeaderBar
        days={days}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <WorkoutView day={selectedDay} />
    </View>
  );
};

export default Main;
