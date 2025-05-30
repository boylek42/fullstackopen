const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Content = props => {
    return (
      <>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part.name}: {props.part.exercises}</p>
    )
  }
  
  
  const Total = (props) => {
    let total = (props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises)
    return (
      <p>The total is: {total}</p>    
      )
    }
  
  const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} /> 
      </>
    )
  }
  
  export default App









import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    console.log('clicked!')
  }

  // setTimeout(
  //   () => setCounter(counter + 1), 1000
  // )

  // console.log(`Value is: ${counter}`)

  return(
    <>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
    </>
  )
}

export default App










import {useState} from 'react'

const App = () => {
  const [count, setCount] = useState(10)

  const minus = () => {
    if(isValid(count)) {
      setCount(count - 1)
      printCount()
    }    
  }

  const reset = () => {
    setCount(10)
  }

  const isValid = (count) => {
    return (count > 0);
  }

  const printCount = () => {
    console.log("Count is now: ", count)
  }



  return (
    <>
      <button onClick={minus}> 
        Minus
      </button>

      <button onClick={reset}> 
        Reset
      </button>

      <p>Count: {count}</p>
    </>
  )
}

export default App









import {useState} from 'react'

const App = () => {
const [count, setCount] = useState(10)

const minus = () => {
  if(isValid(count)) {
    setCount(count - 1)
    printCount()
  }    
}

const reset = () => {
  setCount(10)
}

const isValid = (count) => {
  return (count > 0);
}

const printCount = () => {
  console.log("Count is now: ", count)
}



return (
  <>
    <button onClick={minus}> 
      Minus
    </button>

    <button onClick={reset}> 
      Reset
    </button>

    <p>Count: {count}</p>
  </>
)
}

export default App









import { useState } from "react"

const Display = ({counter}) => <p>The count is: {counter}</p>
const Button = ({action, onClick}) => (<button onClick={onClick}>{action}</button>)

const App = () => {
  const [counter, setCount] = useState(0)
  console.log("The current count is: ", counter)

  const increaseCount = () => {
    setCount(counter + 1)
    console.log("Increasing...counter was: ", counter)
  }

  const decreaseCount = () => {
      console.log("Decreasing...counter before was: ", counter)
      setCount(counter - 1)
  }

  const doubleCount = () => {
    return (
      setCount(counter * 2)
    )
  }

  const halfCount = () => {
    return (
      setCount(counter / 2)
    )
  }

  return(
    <> 
      <Display counter={counter}/>
      <Button action={'+'} onClick={increaseCount}/>
      <Button action={'-'} onClick={decreaseCount}/>
      <Button action={'Double the count'} onClick={doubleCount}/>
      <Button action={'Half the count'} onClick={halfCount}/>
    </>
  )
}

export default App





import {useState} from 'react'

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>The App is used by pressing the buttons</div>
    )  
  }
  return (
    <div>
      Button press history: {allClicks.join(' ')}
    </div>
  )
}

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Button = (props) => {
  console.log('The props object is the following: ' + props)
  const {onClick, text} = props
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClicks = () => {
    setAll(allClicks.concat('L'))
    setTotal(total + 1)
    console.log('Left before: ', left)
    setLeft(left + 1)
    console.log('Left after: ', left)
  }
  const handleRightClicks = () => {
    setAll(allClicks.concat('R'))
    setTotal(total + 1)
    setRight(right + 1)
  }
  const Total = ({allClicks}) => {
    if (total === 0) {
      return <div>Total number of clicks: 0</div>
    }
    return (
      <div>
        Total number of clicks: {allClicks.length}
      </div>
    )
  }

  return (
    <>
      {left}
      <Button onClick={handleLeftClicks} text='left'/>
      {right}
      <Button onClick={handleRightClicks} text = 'Right'/>
      <br/>
      <History allClicks={allClicks}/>
      <Total allClicks={allClicks}/>
      
    </>
  )
}

export default App














import {useState} from 'react'

const Display = (props) => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

export default App