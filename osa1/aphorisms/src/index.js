import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({aphorism, index, setter, voter, votes}) => {
  return (
    <div>
      <h2>Aphorism of the Day</h2>
      <p>{aphorism}</p>
      <p>{votes} votes</p>
      <button onClick={voter}>vote for this</button>
      <button onClick={setter}>next aphorism</button>
    </div>
  )
}

const MostVoted = ({aphorism, votes}) => {
  if (votes === 0) {
    return (
      <div>
        <h2>Aphorism with the most votes</h2>
        <p>No votes have been cast yet.</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Aphorism with the most votes</h2>
      <p>{aphorism}</p>
      <p>{votes} votes</p>
    </div>
  )
}

const App = ({aphorisms}) => {
  const [index, setIndex] = useState(randomIndex(aphorisms.length))
  const [votes, setVotes] = useState(Array.from(Array(aphorisms.length), () => 0))

  const setIndexToRandom = () => {
    // Never choose the same index twice in a row if there are two or more options.
    let newIndex = randomIndex(aphorisms.length)
    while (aphorisms.length > 1 && newIndex === index) {
      newIndex = randomIndex(aphorisms.length)
    }
    setIndex(newIndex)
  }

  const vote = () => {
    const currentVotes = [...votes]
    currentVotes[index] += 1
    setVotes(currentVotes)
  }

  const indexOfMostVoted = () => {
    let ind = 0
    let maxVotes = 0
    for (let [i, val] of votes.entries()) {
      if (val > maxVotes) {
        ind = i
        maxVotes = val
      }
    }
    return ind
  }

  const winningIndex = indexOfMostVoted()

  return (
    <div>
      <Display
        aphorism={aphorisms[index]}
        setter={setIndexToRandom}
        voter={vote}
        votes={votes[index]} />
      <MostVoted aphorism={aphorisms[winningIndex]} votes={votes[winningIndex]} />
    </div>
  )
}

const randomIndex = (size) => Math.floor(Math.random() * size)

const aphorisms = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App aphorisms={aphorisms} />,
  document.getElementById('root')
)
