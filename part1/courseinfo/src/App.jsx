const Header = (pros) => {
  return (
    <div>
      <h1>{pros.course}</h1>
    </div>
  )
}

const Part = (pros) => {
  return (
    <div>
      <p>
        {pros.part} {pros.exercises}
      </p>
    </div>
  )
}

const Content = (pros) => {
  return (
    <div>
      <Part part={pros.part1.name} exercises={pros.part1.exercises}/>
      <Part part={pros.part2.name} exercises={pros.part2.exercises}/>
      <Part part={pros.part3.name} exercises={pros.part3.exercises}/>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  )
}

export default App