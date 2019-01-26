import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
)

const Content = (props) => {
  return props.course.parts.map(p => <div>{p.name} {p.exercises}</div>)
}

const Total = (props) => {
  const total = props.course.parts.map(part => part.exercises).reduce((x, y) => x + y, 0)
  return (
    <div>Yhteensä {total} tehtävää</div>
  )
}

const App = () => {
  const course = {name: 'Half Stack -sovelluskehitys',
                  parts: [
                    {name: 'Reactin perusteet', exercises: 10},
                    {name: 'Tiedonvälitys propseilla', exercises: 7},
                    {name: 'Komponenttien tila', exercises: 14}
                    ]
                  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
