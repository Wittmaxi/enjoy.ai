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
    console.log('URI: ', uri)
    setAudio(uri)
    // setAudio('http://35.228.240.243/stream/92d653a5-25ad-4ec1-ad06-02f0149f0007')
    // setAudio('https://stream.bauermedia.fi/radionova/radionova_64.aac')
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
