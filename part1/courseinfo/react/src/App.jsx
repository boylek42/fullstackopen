import {useState} from 'react'

const Header = ({text}) => <h2>{text}</h2>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const Display = ({text, value}) => <div>{text}: {value}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)

  const all = good + neutral + bad
  const calculateAvg = () => {

  }


  const handleClick = (choice) => {
    const handler = () => {
      if(choice === 'good') {
        setAvg(avg + 1)
        setGood(good + 1)
      }
      else if (choice === 'bad') {
        setAvg(avg + 0)
        setBad(bad + 1)
      } else {
        setAvg(avg - 1)
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
      <Display text={'Good'} value={good}/>
      <Display text={'Neutral'} value={neutral}/>
      <Display text={'Bad'} value={bad}/>
      <Display text={'All'} value={all}/>
      <Display text={'Avg'} value={(avg)}/>
    </>
)



}

export default App