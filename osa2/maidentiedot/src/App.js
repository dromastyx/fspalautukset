import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {

  const api_key = process.env.REACT_APP_API_KEY
  const [ weather, setWeather ] = useState([null])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`).then(response => {
        setWeather(response.data.current)
      })
}, [])

  if(!weather) return null

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>Temperature: </b> {weather.temperature} Celsius</p>
      <img src={weather.weather_icons} alt="Weather icon" width="100"></img>
      <p><b>Wind: </b> {weather.wind_speed} direction {weather.wind_dir}</p>
    </div>
  )

}

const Country = ({country}) => {
   return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country.flag} alt="Flag of the country" width="200"></img>
      <Weather capital={country.capital}/>
    </div>
  )
  
}

const Countries = ({countries, clickHandler}) => {
    const len = countries.length
    if (len > 10) {
      return (
          <p>Too many countries, specify another filter.</p>
      )
    }
    if (len > 1) {
      return (
        <ul>
          {countries.map(country => 
          <div key={country.name}>
            {country.name} <button onClick={() => clickHandler(country)}>
                Show</button>
          </div>
          )}
        </ul>
      )
    }
    if (len == 1) {
      return (
          <Country country={countries[0]}/>
        )
    }
    else {
      return (
          <p>No countries.</p>
      )
    }
  }


const App = () => {

    const [ countries, setCountries] = useState([])
    const [ filter, setFilter ] = useState('')

    const handleCountriesToShow = (event) => {
        setFilter(event.target.value)
    }

    const showCountry = (country) => {
      setFilter(country.name)
    }

    const countriesToShow = countries.filter(country => 
      country.name.toUpperCase().includes(filter.toUpperCase()))    

    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
          })
    }, [])

  return (
      <div>
        Find countries<input onChange={handleCountriesToShow}/>
        <p>Countries to show {countriesToShow.length}</p> 
        <Countries countries={countriesToShow} clickHandler={showCountry}/>
      </div>
  )
}

export default App