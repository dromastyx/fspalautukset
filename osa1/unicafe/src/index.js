import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+bad+neutral == 0) {
    return (
      <StatisticLine text="No feedback given." value ={''} />
    )
  }
  return (
  <div>
    <table>
      <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={good+bad+neutral}/>
      <StatisticLine text="Average" value={(good-bad)/(good+bad+neutral)}/>
      <StatisticLine text="Positive" value={100*good/(good+bad+neutral)+' %'}/>
    </table>
  </div>  
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text='Good'/>
      <Button handleClick={() => setNeutral(neutral+1)} text='Neutral'/>
      <Button handleClick={() => setBad(bad+1)} text='Bad'/>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)