import React from 'react';

const CourseHeader = ({courseName}) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(p =><p key={p.id}>{p.name} {p.exercises}</p>)}
    </div>
  )
}

const Summary = ({parts}) => {
  const total = parts.map(p => p.exercises).reduce((x, y) => x + y, 0)
  return (
    <div>
      <p>Yhteensä {total} tehtävää.</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <CourseHeader courseName={course.name}/>
      <Content parts={course.parts} />
      <Summary parts={course.parts} />
    </div>
  )
}

export default Course
