const Course = ({header, parts}) => {
  console.log('Course is working, the following is parts:', parts)
  const totalExercises = parts.reduce((next, part) => {return (next + part.exercises)}, 0)

  return (
    <>
      <h2>{header}</h2>
      {parts.map(part => <p key={part.id}>{part.name}: {part.exercises}</p>)}
      <b>Total of {totalExercises} exercises</b>
    </>
  )
}

export default Course