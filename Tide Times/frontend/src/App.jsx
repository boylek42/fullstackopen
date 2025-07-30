import { useState } from 'react'
import { useEffect } from 'react'
import tideService from './services/tides'

const App = () => {
  const [extremeTides, setTideToday] = useState(null)

  useEffect(() => {
    tideService.
    getDailyExtremes().
    then(currentExtremes => {
      console.log('Fetched high/lows: ', currentExtremes)
      setTideToday(currentExtremes)
    })
  }, [])

  if (!extremeTides) {
    return null
  }

  const getLowTides = (extremeTides) => {
    if (!extremeTides) {
      return null
    }

    return extremeTides.lows.map(low => low.height)
  }

  const lowTides = getLowTides(extremeTides)

  const getHighTides = (extremeTides) => {
    if (!extremeTides) {
      return null
    }

    return extremeTides.highs.map(high => high.height)
  }

  const highTides = getHighTides(extremeTides)

  return (
    <>
      <p>1st High Tide Height: {highTides[0]} metres</p>
      <p>2nd High Tide Height: {highTides[1]} metres</p>

      <p>1st Low Tide Height: {lowTides[0]} metres</p>
      <p>2nd Low Tide Height: {lowTides[1]} metres</p>
      {/* {console.log(JSON.stringify(highTides))} */}
    </>
  )
}

export default App
