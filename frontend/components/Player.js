import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Icon } from "@rneui/base";

import { usePlayAudio } from '../usePlayAudio'

export default () => {

  const [isPlaying, setIsPlaying] = useState(false)
  const { setAudio, play, pause, reset } = usePlayAudio()

  useEffect(() => {
    setAudio('https://stream.bauermedia.fi/radionova/radionova_64.aac')
  }, [])

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
        style={styles.btn}
      >
        <Icon name={!isPlaying ? "play" : "pause"} type="antdesign" color="#000" />
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
  btn: {
    padding: 50,
    borderRadius: 100,
    backgroundColor: "#BEEDFD",
  },
  btnSmall: {
    paddingTop: 10,
    padding: 5,
  }
});
