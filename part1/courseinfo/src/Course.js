const Header = (props) => {
  return <h1>{props.title}</h1>
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part.name} exercise={part.exercises} />
      ))}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
)
const Total = ({ parts }) => {
  let total = parts.reduce((sum, p) => sum + p.exercises, 0)
  return <p>Total of {total} exercises </p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
