import {useState} from 'react'

const Header = ({text}) => <h2>{text}</h2>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  if (props.all !== 0) {

    return (
      <>
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good}/>
          <StatisticsLine text="neutral" value={props.neutral}/>
          <StatisticsLine text="bad" value={props.bad}/>
          <StatisticsLine text="all" value={props.all}/>
          <StatisticsLine text="avg" value={props.avg}/>
          <StatisticsLine text="positivity" value={props.positivity}/>
        </tbody>
      </table>
      </>
    )
  }
  return <p>No feedback given.</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const all = good + neutral + bad
  const calculateAverage = () => {
    if(all === 0) {
      return 0
    }
    return (good - bad) / (good + neutral + bad)
  }

  const calculatePositivity = () => {
    if (good === 0) {
      return 0
    }
    return ((good / all) * 100) + '%'
  }

  const avg = calculateAverage()
  const positivity = calculatePositivity()

  const handleClick = (choice) => {
    const handler = () => {
      if(choice === 'good') {
        setGood(good + 1)
      }
      else if (choice === 'bad') {
        setBad(bad + 1)
      } else {
        setNeutral(neutral + 1)
      }
    }
    return handler
  }

  return (  
    <>
      <Header text='give feedback'/>
      <Button text={'good'} onClick={handleClick('good')}/>
      <Button text={'neutral'} onClick={handleClick('neutral')}/>
      <Button text={'bad'} onClick={handleClick('bad')}/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} positivity={positivity}/>

    </>
)
}

export default App