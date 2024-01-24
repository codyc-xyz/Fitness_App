import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigate} from 'react-router-native';

const FooterBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default FooterBar;
