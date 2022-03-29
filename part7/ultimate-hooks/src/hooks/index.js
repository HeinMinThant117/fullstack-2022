import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (url) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(url).then((response) => setData(response.data))
  }, [url])

  //   const getAll = async () => {
  // const response = await axios.get(url)
  // console.log(response.data)
  // setData(response.data)
  //   }

  return [data, {}]
}
