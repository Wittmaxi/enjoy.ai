import React, {useEffect, useState} from 'react'
import Player from './components/Player';
import Moods from './components/Moods';
import { Button, ButtonGroup }  from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useApi } from './useApi'

import { API_URL } from "./env"
import {useStepLevels} from './useStepLevels';
import {useHr} from './useHr';
import HappyButton from './components/mood_buttons/HappyButton';
import BigHeader from './components/util/Header';
import DataDisplay from './components/DataDisplay';

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const { getInitial, sendUpdate, streamUuid } = useApi()
  const { steps, stepState } = useStepLevels()
  const { hr } = useHr(sendUpdate)

  useEffect(() => {
    sendUpdate({
      type: 'activity',
      value: stepState,
    })
  }, [stepState])

  useEffect(() => {
    getInitial()
  }, [])

  return (
    <View style={styles.container}>
    <BigHeader></BigHeader>
    <Moods handleUpdate={(value) => {
      sendUpdate({
        type: 'mood',
        value,
      })
    }} />
    <DataDisplay hr={hr} stepState={stepState}></DataDisplay> 
    <Text>{streamUuid}</Text>
    <Player uri={streamUuid ? `${API_URL}/stream/${streamUuid}` : ''} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: '#D1E9FF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
