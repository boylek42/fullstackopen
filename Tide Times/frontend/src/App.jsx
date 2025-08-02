import { useState } from 'react'
import { useEffect } from 'react'
import tideService from './services/tides'
import TideDisplay from './components/TideDisplay'


const App = () => {
  const [tideData, setTideToday] = useState(null)

  useEffect(() => {
    tideService.
    getData().
    then(currentExtremes => {
      console.log('Fetched high/lows: ', currentExtremes)
      setTideToday(currentExtremes)
    })
  }, [])
  
  if(!tideData) {
    return null
  }

  return (
    <TideDisplay extremeTides={ tideData }/>
  )
}

export default App