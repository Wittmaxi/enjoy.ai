import { useState, useEffect } from 'react'

import { API_URL } from "./env"

export const useApi = () => {
  const [streamUuid, setStreamUuid] = useState('')
  const [paramState, setParamState] = useState({
    hr: 3,
    activity: 3,
    sound: 3,
    mood: 3,
  })

  const getInitial = async () => {
    try {
      const resp = await fetch(`${API_URL}/request_audio`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramState),
      })
      const data = await resp.json()
      console.log(data)
      if (data.UUID) {
        setStreamUuid(data.UUID)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const sendUpdate = async ({ type, value }) => {
    console.log(type, value)
    try {
      setParamState({
        ...paramState,
        [type]: value,
      })
      const resp = await fetch(`${API_URL}/request_audio`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paramState,
          [type]: value,
          UUID: streamUuid,
        }),
      })
      const data = await resp.json()
    } catch (e) {
      console.error(e)
    }
  }


  return {
    getInitial,
    sendUpdate,
    streamUuid,
  }
}

