import { useState } from 'react'

const Heading = ({text}) => <h2>{text}</h2>

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [highestVote, setHighestVote] = useState(0)

  const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))


  // Type: function - getHighestVote()
  // Purpose: iterates through the votes array and returns the index of the greatest value. 
  const getHighestVote = (votes) => {
    let maxIndex = 0;

    for(let i = 1; i < votes.length; i++) {
      if (votes[i] > votes[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex
  }

  const handleVote = () => {
      const updatedVotes = [...votes];
      updatedVotes[selected] += 1;
      setVotes(updatedVotes)
      setHighestVote(getHighestVote(updatedVotes));
  }

  return (
    <div>
      <Heading text={"Anecdote of the day"}/>
      <p>{anecdotes[selected]}</p>
      {console.log(votes)}
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}> Vote +1 </button> 
      <button onClick={handleNext}>next anecdote</button>
      <Heading text={"Anecdote with the most votes"}/>
      <p>{anecdotes[highestVote]}</p>

    </div>
  )
}

export default App