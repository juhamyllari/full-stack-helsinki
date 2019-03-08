import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
  } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import DetailedAnecdote from './components/DetailedAnecdote'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const notify = (msg, duration = 10) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification('')
    }, duration * 1000)
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <p>{notification}</p>
      <Router >
        <div>
          <div>
            <Link style={padding} to="/">anecdotes</Link>
            <Link style={padding} to="/create">create new</Link>
            <Link style={padding} to="/about">about</Link>
          </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <DetailedAnecdote anecdote={anecdoteById(match.params.id)} />} />
          <Route exact path="/create" render={() =>
            <CreateNew addNew={addNew} notify={notify} />} />
          <Route exact path="/about" render={() => <About />} />
        </div>
      </Router>
      <Footer />
    </div>
  )

  // return (
  //   <div>
  //     <h1>Software anecdotes</h1>
  //     <Menu />
  //     <AnecdoteList anecdotes={anecdotes} />
  //     <About />
  //     <CreateNew addNew={addNew} />
  //     <Footer />
  //   </div>
  // )
}

export default App;