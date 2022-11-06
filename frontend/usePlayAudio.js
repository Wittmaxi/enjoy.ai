import { useState } from 'react'
import { Audio } from "expo-av"

export const usePlayAudio = () => {
  const [sound, setSound] = useState()
  const setAudio = async (uri) => {
    if (uri) {
      console.log('AUDIO ', uri)
      const sound = new Audio.Sound()
      try {
        await sound.loadAsync({
          uri
        })
        setSound(sound)
        console.log('AUDIO load done')
      } catch (e) {
        console.error('LoadAudioError', e)
      }
    }
  }

  const play = async () => {
    try {
      sound?.playAsync()
    } catch (e) {
      console.error('PlayError', e)
    }
  }

  const pause = async () => {
    try {
      sound?.pauseAsync()
    } catch (e) {
      console.error('PauseError', e)
    }
  }

  const reset = async () => {
    try {
      sound?.stopAsync()
    } catch (e) {
      console.error('StopError', e)
    }
  }

  return {
    setAudio,
    loading: sound === undefined,
    play,
    pause,
    reset,
  }
}
