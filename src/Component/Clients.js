import '../App.css'
import React, { useState } from 'react'
import axios from 'axios'

function Client() {
  const [searchText, setSearchText] = useState('')
  const [gameList, setgameList] = useState([])

  function getPlayerGames(event) {
    //console.log(searchText)
    axios
      .get('http://localhost:4000/past5Games', {
        params: { username: { searchText } },
      })
      .then(function (response) {
        setgameList(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  console.log(gameList)

  return (
    <div className="App">
      <h2>Welcome to our proxy server app!</h2>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <button onClick={getPlayerGames}>
        Get the past 5 game from your player
      </button>
      {gameList.length !== 0 ? (
        <>
          {gameList.map((gameData, index) => (
            <span id={index}>
              <h2>Game {index + 1}</h2>
              <div>
                {gameData.info.participants.map((data, participantIndex) => (
                  <p>
                    PLAYER {participantIndex + 1}: {data.summonerName}, KDA:{' '}
                    {data.kills} / {data.deaths} / {data.assists}
                  </p>
                ))}
              </div>
            </span>
          ))}
        </>
      ) : (
        <>
          <p>We have No Data!</p>
        </>
      )}
    </div>
  )
}

export default Client
