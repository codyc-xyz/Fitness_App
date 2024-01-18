import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const HeaderBar = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.headerBar}>
      {days.map(day => (
        <TouchableOpacity key={day} style={styles.dayButton}>
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
});

export default HeaderBar;
