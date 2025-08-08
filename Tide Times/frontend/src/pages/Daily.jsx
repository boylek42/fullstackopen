import { useState, useEffect } from 'react'
import tideService from '../services/tides'
import DisplayDaily from '../components/DisplayDaily'
import SelectStation from '../components/SelectStation'
import stations from '../services/stations'
import Grid from '@mui/material/Grid'

const Daily = () => {
  const [dailyData, setTideToday] = useState(null)
  const [currentTide, setCurrentTide] = useState(null)
  const [currentStation, setCurrentStation] = useState(stations[0]) // Start with first station
  // const [rising, setRising] = useState(true) // If the tide is Rising

  console.log('Daily component rendered, currentStation:', currentStation)
  console.log('dailyData:', dailyData, 'currentTide:', currentTide)

  useEffect(() => {
    console.log('useEffect running with currentStation:', currentStation)
    if (currentStation) {
      console.log('Making API call for station:', currentStation.name)
      tideService
        .getDataByStation(currentStation)
        .then(currentExtremes => {
          console.log('API response:', currentExtremes)
          const today = currentExtremes.dailyExtremes.tides
          const current = currentExtremes.currentHeight.height
          console.log(`High/lows: ${today}`)
          console.log(`Current height: ${current}`)
          
          setTideToday(today)
          setCurrentTide(current)
        })
        .catch(error => {
          console.error('API error:', error)
        })
    }
  }, [currentStation]) // Runs whenever currentStation changes
  
  if(!dailyData || !currentTide) {
    return <div>Loading...</div>
  }

  return (
    <>
    <Grid maxWidth='100%'>
      {<h1>Current Tide Data</h1>
      <SelectStation 
        currentStation={currentStation} 
        setCurrentStation={setCurrentStation} 
      />
      <h2>Station: {currentStation.name}</h2>}
      <DisplayDaily currentHeight={currentTide} extremeTides={dailyData}/>
    </Grid>
    </>
  )
}

export default Daily