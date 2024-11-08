import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const GiveFeedback = ({good, setGood, neutral, setNeutral, bad, setBad}) => {
  return (
    <div>
      <Button handleClick={()=>{setGood(good+1)}} text='good'/>
      <Button handleClick={()=>{setNeutral(neutral+1)}} text='neutral'/>
      <Button handleClick={()=>{setBad(bad+1)}} text='bad'/>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*(-1)) / total
  const positive = (good) / total * 100
  if (total) {
    return (
      <div>
        <StatisticsLine text='good' value={good}/>
        <StatisticsLine text='neutral' value={neutral}/>
        <StatisticsLine text='bad' value={bad}/>
        <StatisticsLine text='average' value={average}/>
        positive {positive}%
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <GiveFeedback good={good} setGood={setGood} 
                    neutral={neutral} setNeutral={setNeutral}
                    bad={bad} setBad={setBad}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App