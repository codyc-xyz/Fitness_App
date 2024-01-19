import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface HeaderBarProps {
  days: string[];
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  days,
  selectedDay,
  setSelectedDay,
}) => {
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
