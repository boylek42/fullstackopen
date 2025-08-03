// import { useState } from 'react'
// import { useEffect } from 'react'
// import tideService from '../services/tides.js'


// const Current = () => {
//   const [currentHeight, setCurrentHeight] = useState(null)

//   useEffect(() => {
//     tideService.
//     getData('current').
//     then(currentHeight => {
//       console.log('Current Tide: ', currentHeight)
//       setCurrentHeight(currentHeight.height)
//     })
//   }, [])

//   if(!currentHeight) {
//     return <p>Loading data...</p>
//   }
  
//   return(
//     <>
//       {console.log(`Current high tide: ${currentHeight}`)}
//       <p>Sea Level is currently: {currentHeight} metres</p>
//     </>
//   )
// }

// export default Current