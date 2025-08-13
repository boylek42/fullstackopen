import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SelectStation from '../components/SelectStation'
import Card from '@mui/material/Card'
import Wave from 'react-wavify'

const DisplayDaily = ({currentHeight, extremeTides, currentStation, setCurrentStation} ) => {
  
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
  <>
  <Grid container direction='column' spacing={2} sx={{textAlign: 'center', py: 4}}>
    <Wave mask="url(#mask)" fill="#1277b0" >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0" stopColor="white" />
          <stop offset="0.7" stopColor="black" />
        </linearGradient>
        <mask id="mask">
          <rect x="0" y="0" width="2000" height="120" fill="url(#gradient)"  />
        </mask>
      </defs>
    </Wave>
    {/* Current Tide Height */}
    <Grid item xs={12}>
      <Typography variant='h3' sx={{fontWeight: 300, mt: 2}}>
        {currentHeight}m
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant='h6' color="text.secondary" sx={{mt: 1}}>
        Currently rising at {currentStation}
      </Typography>
      <p></p>
    </Grid>

    <Grid item xs={12}>
      {<SelectStation currentStation={currentStation} setCurrentStation={setCurrentStation} />}
    </Grid>

  {/* Title */}
    <Grid item xs={12}>
      <Typography variant='h5' sx={{fontWeight: 500, mt: 3}}>
        Today's Tide Extremes
      </Typography>
    </Grid>

    
    <Grid item xs={12}>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        {/* High Tide Card */}
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <Card variant='outlined' sx={{ p: 2, minWidth: 200 }}>
            {nextLow ? (
              <>
                <Typography>{nextHigh.type}</Typography>
                <Typography color="text.secondary">{nextHigh.time}</Typography>
                <Typography variant="h6">{nextHigh.height}</Typography>
              </>
            ) : (
              <Typography color='text.secondary'>No more low tides today</Typography>
            )}
          </Card>
        </Grid>
        
        {/* Low Tide Card */}
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <Card variant='outlined' sx={{ p: 2, minWidth: 200 }}>
            {nextLow ? (
              <>
                <Typography>{nextLow.type}</Typography>
                <Typography color="text.secondary">{nextLow.time}</Typography>
                <Typography variant="h6">{nextLow.height}</Typography>
              </>
            ) : (
              <Typography color='text.secondary'>No more low tides today</Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  </>
)}

export default DisplayDaily