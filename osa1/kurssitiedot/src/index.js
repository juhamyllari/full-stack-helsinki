import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => (
  <div>
    <h1>{course.name}</h1>
  </div>
)

const Content = ({course}) => {
  return course.parts.map(p => <Part key={p.name} name={p.name} exercises={p.exercises}/>)
}

const Part = ({name, exercises}) => {
  return <div>{name} {exercises}</div>
}

const Total = ({course}) => {
  const total = course.parts.map(part => part.exercises).reduce((x, y) => x + y, 0)
  return (
    <p>Yhteensä {total} tehtävää</p>
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
