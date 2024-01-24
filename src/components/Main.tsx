import React from 'react';
import {View} from 'react-native';
import {NativeRouter, Route, Routes} from 'react-router-native';
import HomeScreen from '../views/HomeScreen';

const Main = () => {
  return (
    <View>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {/* <Route path="/history" element={<HistoryScreen />} />
     <Route path="/progress" element={<ProgressScreen />} /> */}
        </Routes>
      </NativeRouter>
    </View>
  );
};

export default Main;
