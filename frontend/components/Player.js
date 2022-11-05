import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Icon } from "@rneui/base";
import PlayButton from './PlayButton';

import { usePlayAudio } from '../usePlayAudio'
import FancyPlay from './FancyPlay';
import FancyPlayPaused from './FanncyPlayPaused';

export default ({ uri }) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const { setAudio, play, pause, reset } = usePlayAudio()

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
      <PlayButton></PlayButton>
      <Pressable
        onPress={toggleStartStop}
      >
        {isPlaying ? <FancyPlayPaused></FancyPlayPaused> : <FancyPlay></FancyPlay>}
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
