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