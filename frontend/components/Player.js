import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Icon } from "@rneui/base";

import { usePlayAudio } from '../usePlayAudio'
import FancyPlay from './FancyPlay';
import FancyPlayPause from './FanncyPlayPause';

export default ({ uri }) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const { setAudio, loading, play, pause, reset } = usePlayAudio()

  useEffect(() => {
    setAudio(uri)
  }, [uri])

  const toggleStartStop = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  return (
    <View>
      <Pressable
        onPress={toggleStartStop}
      >
        {isPlaying ? <FancyPlayPause></FancyPlayPause> : <FancyPlay loading={loading}></FancyPlay>}
      </Pressable>
      <Pressable
        onPress={() => {
          reset()
          setIsPlaying(false)
        }}
        style={styles.btnSmall}
      >
        <Icon name={"retweet"} type="antdesign" color="#000" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  btnSmall: {
    paddingTop: 10,
    padding: 5,
  }
});
