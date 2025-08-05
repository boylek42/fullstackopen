import { useState } from 'react'
import { useEffect } from 'react'
import tideService from '../services/tides'
import DisplayDaily from '../components/DisplayDaily'
import stations from "../services/stations"



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
    <>
    <h1>Current Tide Data</h1>
    <DisplayDaily currentHeight = {currentTide} extremeTides={ dailyData }/>
    </>
  )
}

export default Daily