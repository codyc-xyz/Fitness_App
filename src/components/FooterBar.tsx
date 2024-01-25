import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigate} from 'react-router-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const insets = useSafeAreaInsets();

  const containerStyle = {
    ...styles.navContainer,
    paddingBottom: insets.bottom,
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigate('/')}>
        <Icon name="home" type="material" size={30} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigate('/history')}>
        <Icon name="history" type="material" size={30} />
        <Text>History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigate('/progress')}>
        <Icon name="bar-chart" type="material" size={30} />
        <Text>Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f2f2f2',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default NavBar;
