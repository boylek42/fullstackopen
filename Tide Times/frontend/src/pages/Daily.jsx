import { useState } from 'react'
import { useEffect } from 'react'
import tideService from '../services/tides'
import DisplayDaily from '../components/TideDisplay'


const Daily = () => {
  const [dailyData, setTideToday] = useState(null)
  const [currentTide, setCurrentTide] = useState(null)

  useEffect(() => {
    tideService.
    getData('current').
    then(currentExtremes => {
      const today = currentExtremes.dailyExtremes.tides
      const current = currentExtremes.currentHeight.height
      console.log(`High/lows: ${today}`)
      console.log(`Current height: ${current}`)
      
      setTideToday(today)
      setCurrentTide(current)
    })
  }, [])
  
  if(!dailyData || !currentTide) {
    return null
  }

  return (
    <DisplayDaily currentHeight = {currentTide} extremeTides={ dailyData }/>
  )
}

export default Daily