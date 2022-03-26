const Hello = (props) => {
  return (
    <div>
      <p>Hello world {props.title}</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <h1>Greetings</h1>
      <Hello title='Poggers' />
      <Hello title='Dynamic' />
      <Hello title='Testing' />
    </div>
  )
}

export default App
