import {useEffect, useState} from "react"
import { DeviceEventEmitter, PermissionsAndroid } from "react-native"
import { Pedometer } from 'expo-sensors'

export const StepState = {
  STILL: 'still',
  EASY: 'easy',
  INTENSE: 'intense',
}

export const useStepLevels = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [steps, setSteps] = useState(0)
  const [stepState, setStepState] = useState(StepState.STILL)
  const [stepEvents, setStepEvents] = useState([])
  useEffect(() => {
    const result = Pedometer.requestPermissionsAsync().then((result) => {
      setHasPermission(Boolean(result.granted))
      console.log(result)
    })
  }, [])
  useEffect(() => {
    console.log(hasPermission)
    const requestStepsPermission = async () => {
      try {
        const test = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION)
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
          {
            title: "Steps",
            message: "Need to access steps",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        console.log('done')
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can access the steps");
        } else {
          console.log("Steps permission denied");
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestStepsPermission()
    if (hasPermission) {
      const subscriber = Pedometer.watchStepCount((data) => {
        console.log(data)
        setSteps(data.steps)
        const now = new Date().getTime()
        const timestamps = [now, ...stepEvents].filter((ts) => (
          now - ts < 10000
        ))
        if (timestamps > 5) {
          setStepState(StepState.INTENSE)
        } else if (timestamps > 0) {
          setStepState(StepState.EASY)
        } else {
          setStepState(StepState.STILL)
        }
        setStepEvents(timestamps)
      })
      return () => {
        subscriber.remove()
      }
    }
  }, [hasPermission])

  return {
    stepState,
    steps,
  }
}
