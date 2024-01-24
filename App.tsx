import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Main from './src/components/Main';
import {DatabaseProvider} from './src/contexts/DatabaseContext';

function App(): React.ReactNode {
  return (
    <SafeAreaProvider>
      <DatabaseProvider>
        <View style={styles.container}>
          <SafeAreaView>
            <Main />
          </SafeAreaView>
        </View>
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
