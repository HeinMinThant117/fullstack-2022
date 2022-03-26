import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        {/* <button onClick={handleGoodClick}>good</button> */}
        <Button name='good' handleClick={handleGoodClick} />
        <Button name='bad' handleClick={handleBadClick} />
        <Button name='neutral' handleClick={handleNeutralClick} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <h2>No feedback given</h2>
  }
  return (
    <table>
      <h1>statistics</h1>
      <StatisticLine title='good' value={good} />
      <StatisticLine title='neutral' value={neutral} />
      <StatisticLine title='bad' value={bad} />
      <StatisticLine title='all' value={good + neutral + bad} />
      <StatisticLine
        title='average'
        value={(good - bad) / (good + bad + neutral)}
      />
      <StatisticLine
        title='positive'
        value={(good / (good + neutral + bad)) * 100 + '%'}
      />
    </table>
  )
}

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
)

const StatisticLine = ({ title, value }) => (
  <tr>
    <td>{title}</td>
    <td>{value}</td>
  </tr>
)

export default App
