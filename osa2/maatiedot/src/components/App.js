import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        setCountries(result.data)
      })
  }, [])
  return (
    <>
      <FilterBox filter={filter} setFilter={setFilter}/>
      <CountryListDisplay countries={countries} filter={filter} setFilter={setFilter}/>
    </>
  )
}

const FilterBox = ({filter, setFilter}) => {
  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <p>Find countries by name</p>
      <input value={filter} onChange={handleChange}/>
    </div>
  )
}

const CountryListDisplay = ({countries, filter, setFilter}) => {
  const limit = 10
  const countriesToShow = countries.filter(c => c
                          .name
                          .toLowerCase()
                          .includes(filter.toLowerCase()))
  const size = countriesToShow.length
  if (size > limit) {
    return filter === '' ? '' : <p>Too many countries match. Please use another filter.</p>
  } else if (size > 1) {
    return countriesToShow.map(c => (
      <div key={c.name}>
        {c.name} <button onClick={() => {
          setFilter(c.name)
        }}>Show</button>
      </div>))
  } else if (size === 1) {
    return <CountryInformation country={countriesToShow[0]}/>
  } else {
    return <p>No countries match the filter.</p>
  }
}

const CountryInformation = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
      {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="150" />
      <CapitalWeather capital={country.capital} />
    </div>
  )
}

const CapitalWeather = ({capital}) => {
  if (process.env.REACT_APP_APIXU_KEY === undefined) {
    return <p>Place a valid Apixu key in .env to fetch weather data.</p>
  }
  const callHead = 'http://api.apixu.com/v1/current.json?key='
  const callTail = `&q=${capital}`
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(`${callHead}${process.env.REACT_APP_APIXU_KEY}${callTail}`)
      .then((result) => {setWeather(result.data)})
    }, [])
  if (Object.keys(weather).length === 0) {
    return null
  } else {
    return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p>Temperature: {weather.current.temp_c} °C</p>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} width="50" />
    </div>)
  }
}

export default App;
