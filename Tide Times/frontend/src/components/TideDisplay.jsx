const TideDisplay = ({extremeTides}) => {
  if(!extremeTides) {
      return <p>Loading data...</p>
  }

  console.log("Extreme tides is: ", extremeTides)
  const getLowTides = (extremeTides) => extremeTides.lows.map(low => low.height)
  const lowTides = getLowTides(extremeTides)
  
  const getHighTides = (extremeTides) => extremeTides.highs.map(high => high.height)
  const highTides = getHighTides(extremeTides)
  return (
    <>
      {console.log(`Current high tide: ${highTides}`)}
      <p>1st High Tide Height: {highTides[0]} metres</p>
      <p>2nd High Tide Height: {highTides[1]} metres</p>
      <p>1st Low Tide Height: {lowTides[0]} metres</p>
      <p>2nd Low Tide Height: {lowTides[1]} metres</p>
    </>
  )
}

export default TideDisplay