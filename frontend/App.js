import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import Player from './components/Player';
import { Button, ButtonGroup }  from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  return (
    <View style={styles.container}>
    <Player />
    <Text>Open up App.js to start working on your app!</Text>
    <ButtonGroup
      buttons={['Mad', 'Sad', 'Glad', 'Depressed']}
      selectedIndex={selectedIndex}
      onPress={(value) => {
        setSelectedIndex(value);
      }}
      containerStyle={{ marginBottom: 20 }}
    /><StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEEDFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
