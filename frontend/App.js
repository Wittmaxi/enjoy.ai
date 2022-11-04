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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7FCCF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
