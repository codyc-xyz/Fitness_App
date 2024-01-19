import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Workout from '../types/Workout';

type WorkoutViewProps = {
  day: string;
};

const WorkoutView: React.FC<WorkoutViewProps> = ({day}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    loadWorkoutsForDay(day);
  }, [day]);

  const loadWorkoutsForDay = (day: string) => {
    const newWorkouts: Workout[] = []; // Replace with the actual logic to load workouts
    setWorkouts(newWorkouts);
  };

  const getNextMonday = (): Date => {
    // Specify return type
    const now = new Date();
    now.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
    now.setHours(0, 0, 0, 0); // Set to midnight
    return now;
  };

  const resetWeeklyProgress = () => {
    // Reset progress logic here
    // Schedule next reset
    scheduleWeeklyReset();
  };

  useEffect(() => {
    const timeoutId = scheduleWeeklyReset();
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleWeeklyReset = () => {
    const nextMonday = getNextMonday();
    const msUntilNextMonday = nextMonday.getTime() - new Date().getTime();
    return setTimeout(resetWeeklyProgress, msUntilNextMonday);
  };

  return <View>{/* Workout rendering logic */}</View>;
};

export default WorkoutView;
