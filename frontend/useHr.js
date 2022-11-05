import { useEffect, useState } from 'react'

export const useHr = (handleUpdate) => {
  const [hr, setHr] = useState(100)
  const [hrLevel, setHrLevel] = useState(3)
  // Mock HR since we don't have any live sensor

  useEffect(() => {
    const updateHr = () => {
      const rand = Math.random() * 180
      if (rand > hr) {
        setHr((hr) => hr - 1)
      } else if (Math.random() > 0.95) {
        setHr(170)
      } else {
        setHr((hr) => hr + 1)
      }
      setTimeout(() => updateHr(), 10000)
    }
    updateHr()
  }, [])

  useEffect(() => {
    let newLevel = 1
    console.log(hr, hrLevel)
    if (hr > 160) {
      // High
      newLevel = 5
    } else if (hr > 120) {
      // High
      newLevel = 4
    } else if (hr > 90) {
      // High
      newLevel = 3
    } else if (hr > 60) {
      // High
      newLevel = 2
    }      setHrLevel(newLevel)
    if (hrLevel !== newLevel) {
      handleUpdate({
        type: 'hr',
        value: newLevel,
      })
    }
  }, [hr])

  return {
    hr
  }
}

