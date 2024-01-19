import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const HeaderBar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const today = new Date().getDay();
    setSelectedDay(days[today]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.headerBar}>
      {days.map(day => (
        <TouchableOpacity
          key={day}
          style={[styles.dayButton, selectedDay === day && styles.selectedDay]}
          onPress={() => setSelectedDay(day)}>
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
  dayButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
  },
  dayText: {
    color: '#000',
  },
  selectedDay: {
    backgroundColor: '#E0E0E0',
  },
});

export default HeaderBar;
