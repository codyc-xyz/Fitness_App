import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface HeaderBarProps {
  days: string[];
  selectedDay: string;
  dayCompleted: Record<string, boolean>;
  setSelectedDay: (day: string) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  days,
  selectedDay,
  dayCompleted,
  setSelectedDay,
}) => {
  const insets = useSafeAreaInsets();

  const headerStyle = {
    ...styles.headerBar,
    paddingTop: insets.top,
  };

  return (
    <View style={headerStyle}>
      {days.map(day => (
        <TouchableOpacity
          key={day}
          style={[
            styles.dayButton,
            selectedDay === day && styles.selectedDay,
            dayCompleted[day] && styles.greenBackground,
          ]}
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
  greenBackground: {
    backgroundColor: '#4CAF50',
  },
});

export default HeaderBar;
