import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HeaderBar from './src/components/HeaderBar';
import Main from './src/components/Main';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <Main />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default App;
