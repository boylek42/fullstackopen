import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { alignItems, flex, flexDirection } from '@mui/system'
const DisplayDaily = ({currentHeight, extremeTides} ) => {
  
  const getLowTides = (extremeTides) => extremeTides.lows.map(low => ({type: 'Low', time: low.time, height: low.height, fullDateTime: low.fullDateTime }))
  const lowTides = getLowTides(extremeTides)
  const getHighTides = (extremeTides) => extremeTides.highs.map(high => ({ type: 'High', time: high.time, height: high.height , fullDateTime: high.fullDateTime }))
  const highTides = getHighTides(extremeTides)
  const now = new Date()

  if(!currentHeight || !extremeTides) {
      return <p>Loading data...</p>
  }

  console.log(`Current Height: ${currentHeight}`)
  console.log(`Highs/Low's: ${extremeTides}`)

  const getNextTide = (tideList) => {
    return tideList.map(tide => ({ ...tide, date: new Date(tide.fullDateTime) }))
    .filter(tide => tide.date > now)
    .sort((a, b) => a.date - b.date)[0] || null;
  }

  const nextLow = getNextTide(lowTides)
  const nextHigh = getNextTide(highTides) 

  console.log('Next low is: ', nextLow)
  console.log('Next high is: ', nextHigh)

  // const isRising = (currentHeight, nextLow)
  
return (
    <Grid container direction="column" sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column'}}>
      {/* Top Half - Current Tide */}
      <Grid
        item
        sx={{
          flex: 1,
          backgroundColor: 'lightsalmon',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 75
        }}
      >
        <h1>{currentHeight}m</h1>
        <p>Currently rising</p>
      </Grid>

     <Grid
  item
  sx={{
    flex: 1,
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 75,
  }}
>
  {/* Title */}
  <Grid container direction="row" alignItems="center">
    <Grid item xs={12}>
      <h3 style={{ marginBottom: 32 }}>Today's Tide Extremes</h3>
    </Grid>
    <Grid container item xs={12} justifyContent="center" spacing={4}>
      <Grid item>
        <Box textAlign="center">
          {nextHigh ? (
            <p>
              {nextHigh.type}
              <br />
              {nextHigh.time}
              <br />
              {nextHigh.height}m
            </p>
          ) : (
            <p>No more high tides today</p>
          )}
        </Box>
      </Grid>
      <Grid item>
        <Box textAlign="center">
          {nextLow ? (
            <p>
              {nextLow.type}
              <br />
              {nextLow.time}
              <br />
              {nextLow.height}m
            </p>
          ) : (
            <p>No more low tides today</p>
          )}
        </Box>
      </Grid>
    </Grid>
  </Grid>
</Grid>
</Grid>)}

export default DisplayDaily