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
        {pros.part.name} {pros.part.exercises}
      </p>
    </div>
  )
}

const Content = (pros) => {
  return (
    <div>
      {
        pros.parts.map(value => <Part key={value.name} part={value}/>)
      }
    </div>
  )
}

function sum(parts){
  let t = 0
  parts.forEach(value => t = t + value.exercises)
  return t
}

const Total = (pros) => {
  return (
    <div>
      <p>Number of exercises {sum(pros.parts)}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App