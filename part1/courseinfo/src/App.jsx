const Header = (pros) => {
  return (
    <div>
      <h1>{pros.course}</h1>
    </div>
  )
}

const Content = (pros) => {
  return (
    <div>
      <p>
        {pros.part1} {pros.exercises1}
      </p>
      <p>
        {pros.part2} {pros.exercises2}
      </p>
      <p>
        {pros.part3} {pros.exercises3}
      </p>
    </div>
  )
}

const Total = (pros) => {
  return (
    <div>
      <p>Number of exercises {pros.exercises1 + pros.exercises2 + pros.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} 
        part2={part2} exercises2={exercises2} 
        part3={part3} exercises3={exercises3}
      />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App