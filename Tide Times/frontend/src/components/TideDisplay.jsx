const DisplayDaily = ({currentHeight, extremeTides} ) => {
  if(!currentHeight || !extremeTides) {
      return <p>Loading data...</p>
  }

  console.log(`Current Height: ${currentHeight}`)
  console.log(`Highs/Low's: ${extremeTides}`)

  extremeTides.forAll()

  const getLowTides = (extremeTides) => extremeTides.lows.map(low => low.height)
  const lowTides = getLowTides(extremeTides)
  const getHighTides = (extremeTides) => extremeTides.highs.map(high => high.height)
  const highTides = getHighTides(extremeTides)
  
  return (
    <>
      <h3>Current tide height: {currentHeight} metres</h3>
      {console.log(`Current high tide: ${highTides}`)}
      <h3>High / Low Tides</h3>
      <ul>
        <li>1st High Tide Height: {highTides[0]} metres</li>
        <li>2nd High Tide Height: {highTides[1]} metres</li>
        <li>1st Low Tide Height: {lowTides[0]} metres</li>
        <li>2nd Low Tide Height: {lowTides[1]} metres</li>
      </ul>
    </>
  )
}

export default DisplayDaily