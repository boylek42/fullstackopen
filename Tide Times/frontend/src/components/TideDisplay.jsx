const DisplayDaily = ({currentHeight, extremeTides} ) => {
  if(!currentHeight || !extremeTides) {
      return <p>Loading data...</p>
  }

  console.log(`Current Height: ${currentHeight}`)
  console.log(`Highs/Low's: ${extremeTides}`)

  const getLowTides = (extremeTides) => extremeTides.lows.map(low => ({type: 'Low', time: low.time, height: low.height}))
  const lowTides = getLowTides(extremeTides)
  const getHighTides = (extremeTides) => extremeTides.highs.map(high => ({ type: 'High', time: high.time, height: high.height }))
  const highTides = getHighTides(extremeTides)
  
  return (
    <>
      <h3>Current tide height: {currentHeight} metres</h3>
      <h3>High / Low Tides</h3>
      <ul>
        {highTides.map((recording, index) => (
          <li key={index}> {recording.type} Tide at {recording.time}: {recording.height}</li>
        ))}
       {lowTides.map((recording, index) => (
          <li key={index}>{recording.type} Tide at {recording.time}: {recording.height}</li>
        ))}
      </ul>
    </>
  )
}

export default DisplayDaily