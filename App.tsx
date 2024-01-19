import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HeaderBar from './src/components/HeaderBar';
import Main from './src/components/Main';
import {DatabaseProvider} from './src/contexts/DatabaseContext';

function App(): React.JSX.Element {
  return (
    <DatabaseProvider>
      <SafeAreaView style={styles.container}>
        <HeaderBar />
        <Main />
      </SafeAreaView>
    </DatabaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default App;
