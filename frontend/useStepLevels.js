import {useEffect, useState} from "react"
import { DeviceEventEmitter, PermissionsAndroid } from "react-native"
import { Pedometer } from 'expo-sensors'

export const StepState = {
  STILL: 0,
  EASY: 3,
  INTENSE: 5,
}

export const useStepLevels = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [steps, setSteps] = useState(0)
  const [stepState, setStepState] = useState(StepState.STILL)

  useEffect(() => {
    const result = Pedometer.requestPermissionsAsync().then((result) => {
      setHasPermission(Boolean(result.granted))
      console.log(result)
    })
  }, [])
  useEffect(() => {
    const step = (stepEvents) => {
      const now = new Date().getTime()
      const timestamps = [now, ...stepEvents].filter((ts) => (
        now - ts < 10000
      ))
      setSteps(timestamps.length)
      if (timestamps.length > 5) {
        setStepState(StepState.INTENSE)
      } else if (timestamps.length > 0) {
        setStepState(StepState.EASY)
      } else {
        setStepState(StepState.STILL)
      }
      return timestamps
    }
    if (hasPermission) {
      const subscriber = Pedometer.watchStepCount(step)
      return () => {
        subscriber.remove()
      }
    } else {
      // If no sensor permission - generate random data
      const takeStep = (seed, stepEvents) => {
        const newEvents = step(stepEvents)
        const sleepTime = seed * Math.random() * 1200
        setTimeout(() => takeStep(seed + 1 % 8, newEvents), sleepTime)
      }
      takeStep(1, [])
    }
  }, [hasPermission])

  return {
    stepState,
    steps,
  }
}
