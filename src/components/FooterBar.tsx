import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigate} from 'react-router-native';

const FooterBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('/')}>
        <Icon name="home" type="material" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/history')}>
        <Icon name="history" type="material" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/progress')}>
        <Icon name="bar-chart" type="material" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default FooterBar;
