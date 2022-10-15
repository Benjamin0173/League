import '../App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Client() {
  const [searchText, setSearchText] = useState('')
  const [gameList, setgameList] = useState([])

  const SavedPseudo = localStorage.getItem('Pseudo')

  const handleSavedPseudo = (eventSavedPseudo) => {
    updatePseudo(eventSavedPseudo.target.value)
  }
  const [Pseudo, updatePseudo] = useState(
    SavedPseudo ? JSON.parse(SavedPseudo) : []
  )
  useEffect(() => {
    localStorage.setItem('Pseudo', JSON.stringify(Pseudo))
  }, [Pseudo])

  /////////
  const SavedGame = localStorage.getItem('Game')
  let [Game, updateGame] = useState(SavedGame ? JSON.parse(SavedGame) : [])

  useEffect(() => {
    localStorage.setItem('Game', JSON.stringify(Game))
  }, [Game])

  let navigate = useNavigate()

  function getPlayerGames(event) {
    updatePseudo(searchText)
    console.log(Pseudo)
    console.log(searchText)
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
  //console.log(searchText)
  /*const User = gameList.gameData.info.participants.filter(
    gameList.gameData.info.participants === searchText
  )*/

  function getGameDetail(event, index) {
    console.log('button n °' + index)
    updateGame((Game = event))
    console.log(Game)
    //console.log(Object.keys(event))
    /*Object.keys(event).map((value) => {
      console.log(event[value])*/
    setTimeout(function () {
      let path = `/Information`
      navigate(path)
    }, 0)
  }

  return (
    <div className="App">
      <h2>Welcome to our proxy server app!</h2>
      <TextField
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      ></TextField>
      <Button onClick={getPlayerGames} variant="outlined" className="button">
        Get the past 5 game from the player
      </Button>
      {gameList.length !== 0 ? (
        <>
          {gameList.map((gameData, index) => (
            <button
              key={index}
              className="Client_Button"
              onClick={() => {
                getGameDetail(gameData.metadata.matchId, index)
              }}
            >
              <h2>Match : {gameData.info.gameMode}</h2>

              <p>Timer : {(gameData.info.gameDuration / 60).toFixed(2)}</p>
              <div>
                {gameData.info.participants.map((data, participantIndex) => (
                  <div key={participantIndex}>
                    {data.summonerName === Pseudo ? (
                      <div className="Client_positionbutton">
                        <div className="Information_positionInfoChamp">
                          <p className="p_Champion">
                            Champion : {data.championName}
                          </p>
                          <p className="p_Champion">{data.champLevel}</p>
                          <p className="p_Champion">
                            Champion ID: {data.championId}
                          </p>
                        </div>
                        <div className="Information_positionInfoChamp">
                          <p className="p_Stats">
                            KDA: {data.kills} / {data.deaths} / {data.assists}
                          </p>
                          <p className="p_Stats">
                            {(
                              (data.kills + data.assists) /
                              data.deaths
                            ).toFixed(2)}{' '}
                            :1 KDA
                          </p>
                          <p className="p_Stats">
                            CS :
                            {data.totalMinionsKilled +
                              data.neutralMinionsKilled}
                            (
                            {(
                              (data.totalMinionsKilled +
                                data.neutralMinionsKilled) /
                              (gameData.info.gameDuration / 60)
                            ).toFixed(1)}
                            )
                          </p>
                        </div>
                        <div className="Client_positionInfoChamp">
                          <p>Win : {data.win.toString()}</p>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </button>
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
