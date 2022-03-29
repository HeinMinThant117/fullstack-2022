import { useState } from 'react'

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero,
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const App = () => {
  //   const counter = useCounter()
  //   return (
  //     <div>
  //       <div>{counter.value}</div>
  //       <button onClick={counter.increase}>increase</button>
  //       <button onClick={counter.decrease}>decrease</button>
  //       <button onClick={counter.zero}>zero</button>
  //     </div>
  //   )

  const nameField = useField('text')
  const birthdayField = useField('date')
  const heightField = useField('number')

  return (
    <div>
      <form>
        name:
        <input {...nameField} />
        <br />
        birthdate:
        <input {...birthdayField} />
        <br />
        height:
        <input {...heightField} />
      </form>

      <div>
        {nameField.value} {birthdayField.value} {heightField.value}
      </div>
    </div>
  )
}

export default App
