import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const changeState = (t) => {
    store.dispatch( {type: t} )
  }

  return (
    <div>
      <button onClick={() => changeState('GOOD')}>hyvä</button> 
      <button onClick={() => changeState('OK')}>neutraali</button> 
      <button onClick={() => changeState('BAD')}>huono</button>
      <button onClick={() => changeState('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
