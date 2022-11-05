import { useState, useEffect } from 'react'
import { DeviceEventEmitter, PermissionsAndroid } from "react-native"
import RNSoundLevel from 'react-native-sound-level'
import { Audio } from 'expo-av'

export const useSoundLevel = (handleUpdate) => {
  const [level, setLevel] = useState()
  const [hasPermission, setHasPermission] = useState(false)
  const [recording, setRecording] = useState();

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
      setTimeout(async () => {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        console.log(recording)
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
      }, 1000)
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  useEffect(() => {
    if (hasPermission) {
      console.log('starting to listen...')
      RNSoundLevel.start()
      RNSoundLevel.onNewFrame((data) => {
        console.log('sound level change', data)
        if (Math.abs(data.level - level) > 5) {
          handleUpdate({
            type: 'sound',
            value: data.level % 5 + 1,
          })
        }
        setLevel(data.value)
      })
      return () => RNSoundLevel.stop()
    }
  }, [hasPermission])

  return {
    level,
    startRecording,
  }
}

