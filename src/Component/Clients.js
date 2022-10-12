import '../App.css'
import React, { useState } from 'react'
import axios from 'axios'
import DetailGame from './DetailGame'
import { TextField, Button } from '@mui/material'

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
  //console.log(searchText)
  /*const User = gameList.gameData.info.participants.filter(
    gameList.gameData.info.participants === searchText
  )*/

  return (
    <div className="App">
      <h2>Welcome to our proxy server app!</h2>
      <TextField
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      ></TextField>
      <Button onClick={getPlayerGames} variant="outlined" className="button">
        Get the past 5 game from your player
      </Button>
      {gameList.length !== 0 ? (
        <>
          {gameList.map((gameData, index) => (
            <button id={index} className="Client_Button">
              <h2>Match : {gameData.info.gameMode}</h2>

              <p>Timer : {(gameData.info.gameDuration / 60).toFixed(2)}</p>
              <div>
                {gameData.info.participants.map((data, participantIndex) => (
                  <div>
                    {data.summonerName === searchText ? (
                      <div className="Client_positionbutton">
                        <div className="Client_positionInfoChamp">
                          <p className="p_Champion">
                            Champion : {data.championName}
                          </p>
                          <p className="p_Champion">{data.champLevel}</p>
                          <p className="p_Champion">
                            Champion ID: {data.championId}
                          </p>
                        </div>
                        <div className="Client_positionInfoChamp">
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
