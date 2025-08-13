import stations from "../services/stations"

const SelectStation = ({ currentStation, setCurrentStation }) => {

  const getStationByName = (name) => {
    return stations.find((station) => station.name === name)
  }

  const handleSelectChange = (e) => {
    const stationName = e.target.value
    
    // Get the full station object and update parent
    const station = getStationByName(stationName)
    if(station) {
      setCurrentStation(station)
    }
  }

  return (
    <>
      <div>
        <label>
          Location:   
          <select value={currentStation.name} onChange={handleSelectChange}>
            <option value='Malahide'>Malahide</option>
            <option value='Howth'>Howth</option>
            <option value='Dublin - North Wall'>Dublin - North Wall</option>
            <option value='Dun Laoghaire'>Dun Laoghaire</option>
            <option value='Cromer'>Cromer</option>
          </select>
        </label>
      </div>
    </>
  )
}

export default SelectStation