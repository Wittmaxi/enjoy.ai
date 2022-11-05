import React, {useEffect, useState} from 'react'
import Player from './components/Player';
import Moods from './components/Moods';
import { Button, ButtonGroup }  from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useApi } from './useApi'

import { API_URL } from "./env"
import {useSoundLevel} from './useSoundLevel';
import {useStepLevels} from './useStepLevels';
import {useHr} from './useHr';

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const { getInitial, sendUpdate, streamUuid } = useApi()
  const { level, startRecording } = useSoundLevel(sendUpdate)
  const { steps, stepState } = useStepLevels()
  useHr(sendUpdate)

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
    <Moods handleUpdate={(value) => {
      sendUpdate({
        type: 'mood',
        value,
      })
    }} />
    <Player uri={streamUuid ? `${API_URL}/stream/${streamUuid}` : ''} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: '#A7FCCF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
