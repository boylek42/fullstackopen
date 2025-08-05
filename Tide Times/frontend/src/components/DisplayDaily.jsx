const DisplayDaily = ({currentHeight, extremeTides} ) => {
  
  if(!currentHeight || !extremeTides) {
      return <p>Loading data...</p>
  }

  console.log(`Current Height: ${currentHeight}`)
  console.log(`Highs/Low's: ${extremeTides}`)

  const getLowTides = (extremeTides) => extremeTides.lows.map(low => ({type: 'Low', time: low.time, height: low.height, fullDateTime: low.fullDateTime }))
  const lowTides = getLowTides(extremeTides)
  const getHighTides = (extremeTides) => extremeTides.highs.map(high => ({ type: 'High', time: high.time, height: high.height , fullDateTime: high.fullDateTime }))
  const highTides = getHighTides(extremeTides)

  const now = new Date()


  const getNextTide = (tideList) => {
  return tideList
    .map(tide => ({ ...tide, date: new Date(tide.fullDateTime) }))
    .filter(tide => tide.date > now)
    .sort((a, b) => a.date - b.date)[0] || null;
  }

  const nextLow = getNextTide(lowTides)
  const nextHigh = getNextTide(highTides) 

  console.log('Next low is: ', nextLow)
  console.log('Next high is: ', nextHigh)
  
  return (
    <>
      <h3>Current tide height:</h3>
      <p>{currentHeight} metres</p>
      <h3>High / Low Tides</h3>

      {nextHigh ? (<p>Next High Tide at {nextHigh.time}: {nextHigh.height} metres</p>) : (<p>No more high tides today</p>)}
      {nextLow ? (<p>Next Low Tide at {nextLow.time}: {nextLow.height} metres</p>) : (<p>No more low tides today</p>)}
      

      {/* <ul>
        {highTides.map((recording, index) => (
          <li key={index}> {recording.type} Tide at {recording.time}: {recording.height}</li>
        ))}
       {lowTides.map((recording, index) => (
          <li key={index}>{recording.type} Tide at {recording.time}: {recording.height}</li>
        ))}
      </ul> */}
    </>
  )
}

export default DisplayDaily