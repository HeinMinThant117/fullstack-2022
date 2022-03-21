import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
  }, [])

  useEffect(() => {
    let countryRegex = new RegExp(countrySearch, 'i')
    setFilteredCountries(
      countries.filter((country) => countryRegex.test(country.name.common))
    )
  }, [countrySearch, countries])

  const handleCountryChange = (event) => setCountrySearch(event.target.value)

  return (
    <div>
      {/* Country Search */}
      <div>
        find countries
        <input onChange={handleCountryChange} />
      </div>
      {/* Country List */}
      <CountryList countries={filteredCountries} />
    </div>
  )
}

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    let country = countries[0]

    return <CountryView country={country} />
  }

  return (
    <div>
      {countries.map((country) => (
        <CountryEntry country={country} />
      ))}
    </div>
  )
}

const CountryView = ({ country }) => {
  let languages = Object.values(country.languages)
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    console.log('hey')
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
      )
      .then((response) => setWeather(response.data))
  }, [country])


  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages</h2>
      <ul>
        {languages.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt='country flag' />
      {weather && (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {weather.main.temp} Celsius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt='Weather'
          />
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </div>
  )
}

const CountryEntry = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false)

  const handleShowCountry = () => {
    setShowCountry(!showCountry)
  }
  return (
    <div>
      {country.name.common}
      <button onClick={handleShowCountry}>show</button>
      {showCountry && <CountryView country={country} />}
    </div>
  )
}

export default App
