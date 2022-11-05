import { useState, useEffect } from 'react'
import { Audio } from "expo-av"

export const usePlayAudio = () => {
  const [sound, setSound] = useState()
  const setAudio = async (uri) => {
    const sound = new Audio.Sound()
    setSound(sound)
    await sound.loadAsync({
      uri
    })
  }

  const play = () => {
    sound?.playAsync()
  }

  const pause = () => {
    sound?.pauseAsync()
  }

  const reset = () => {
    sound?.stopAsync()
  }

  return {
    setAudio,
    play,
    pause,
    reset,
  }
}
