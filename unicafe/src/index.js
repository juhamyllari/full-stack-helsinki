import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({incrementer, text}) => <button onClick={() => incrementer()}>{text}</button>

const Feedback = ({incrementers}) => {
  return (
    <div>
      <h2>anna palautetta</h2>
      <Button incrementer={incrementers[0]} text="hyvä"/>
      <Button incrementer={incrementers[1]} text="neutraali"/>
      <Button incrementer={incrementers[2]} text="huono"/>
    </div>
  )
}

const Statistic = ({name, value}) => {
  return <p>{name}: {value}</p>
}

const Statistics = ({counters}) => {
  const [positive, neutral, negative] = counters
  const total = positive + neutral + negative
  const average = (positive - negative) / total
  const positiveRatio = ((positive / total) * 100) + " %"

  if (total === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <Statistic name="hyvä" value={counters[0]}/>
      <Statistic name="neutraali" value={counters[1]}/>
      <Statistic name="huono" value={counters[2]}/>
      <Statistic name="yhteensä" value={total}/>
      <Statistic name="keskiarvo" value={average}/>
      <Statistic name="positiivisia" value={positiveRatio}/>
    </div>
  )
}

const App = (props) => {
  const [positive, setPositive] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [negative, setNegative] = useState(0)

  const incrementers = [
    () => setPositive(positive+1),
    () => setNeutral(neutral+1),
    () => setNegative(negative+1)
  ]

  const counters = [
    positive,
    neutral,
    negative
  ]

  return (
    <div>
      <Feedback incrementers={incrementers}/>
      <Statistics counters={counters}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
