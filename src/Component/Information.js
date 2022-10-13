import { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'

const Information = ({ event }) => {
  const GameId = JSON.parse(localStorage.getItem('Game'))
  const SavedPseudo = JSON.parse(localStorage.getItem('Pseudo'))

  const [gameList, setgameList] = useState(null)

  async function getgame() {
    await axios
      .get('http://localhost:4000/GameId', {
        params: { username: { GameId } },
      })
      .then(function (response) {
        setgameList(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    getgame()
  }, [GameId])
  console.log('gameList: ', gameList)
  return (
    <div className="App">
      {gameList && (
        <>
          <h2>
            Match : {gameList.info.gameMode} in {gameList.info.platformId} in{' '}
            {gameList.info.gameVersion}
          </h2>

          <p>Timer : {(gameList.info.gameDuration / 60).toFixed(2)}</p>
          <div>
            {gameList.info.participants.map((data, participantIndex) => (
              <div key={participantIndex}>
                {data.summonerName === SavedPseudo ? (
                  <div className="Information_positionbutton">
                    <div className="Information_positionInfoChamp">
                      <p className="p_Information_Champion">
                        Champion : {data.championName}
                      </p>
                      <p className="p_Information_Champion">
                        {data.champLevel}
                      </p>
                      <p className="p_Information_Champion">
                        Champion ID: {data.championId}
                      </p>
                    </div>
                    <div className="Information_positionKDA">
                      <p className="p_Information_Stats">
                        KDA: {data.kills} / {data.deaths} / {data.assists}
                      </p>
                      <p className="p_Information_Stats">
                        {((data.kills + data.assists) / data.deaths).toFixed(2)}{' '}
                        : 1 KDA
                      </p>
                      <p className="p_Information_Stats">
                        CS :
                        {data.totalMinionsKilled + data.neutralMinionsKilled}(
                        {(
                          (data.totalMinionsKilled +
                            data.neutralMinionsKilled) /
                          (gameList.info.gameDuration / 60)
                        ).toFixed(1)}
                        )
                      </p>
                    </div>
                    <div className="Information_positionMisc">
                      <p className="p_Information_Stats">
                        Win : {data.win.toString()}
                      </p>

                      <p className="p_Information_Stats">
                        Consomable acheter : {data.consumablesPurchased}
                      </p>

                      <p className="p_Information_Stats">
                        Gold Obtenue : {data.goldEarned}
                      </p>
                      <p className="p_Information_Stats">
                        Gold Depenser : {data.goldSpent}
                      </p>

                      <p className="p_Information_Stats">
                        Plus Grand Meutre en séries : {data.largestKillingSpree}
                      </p>
                      <p className="p_Information_Stats">
                        Plus Grand MultiKill : {data.largestMultiKill}
                      </p>
                      <p className="p_Information_Stats">
                        Le temps rester en vis le plus long :
                        {data.longestTimeSpentLiving / 60}
                      </p>

                      <p className="p_Information_Stats">
                        Q utiliser : {data.spell1Casts}
                      </p>
                      <p className="p_Information_Stats">
                        W utiliser : {data.spell2Casts}
                      </p>
                      <p className="p_Information_Stats">
                        E utiliser : {data.spell3Casts}
                      </p>
                      <p className="p_Information_Stats">
                        R utiliser : {data.spell4Casts}
                      </p>
                      <p className="p_Information_Stats">
                        Team Abandon avant 15min :{' '}
                        {data.teamEarlySurrendered.toString()}
                      </p>
                    </div>
                    <div className="Information_positionVision">
                      <p className="p_Information_Stats">
                        Score de vision : {data.visionScore}
                      </p>
                      <p className="p_Information_Stats">
                        visionWardsBoughtInGame : {data.visionWardsBoughtInGame}
                      </p>
                      <p className="p_Information_Stats">
                        Balise de vision Tuer : {data.wardsKilled}
                      </p>
                      <p className="p_Information_Stats">
                        Balise de vision Placer : {data.wardsPlaced}
                      </p>
                      <p className="p_Information_Stats">
                        sightWardsBoughtInGame : {data.sightWardsBoughtInGame}
                      </p>
                    </div>
                    <div className="Information_positionObjectif">
                      <p className="p_Information_Stats">
                        Dégats infliger au batiments :{' '}
                        {data.damageDealtToBuildings}
                      </p>
                      <p className="p_Information_Stats">
                        Dégats infliger au Objectif :{' '}
                        {data.damageDealtToObjectives}
                      </p>
                      <p className="p_Information_Stats">
                        Dégats infliger au Tourrel : {data.damageDealtToTurrets}
                      </p>
                      <p className="p_Information_Stats">
                        Tourrel Perdu : {data.turretsLost}
                      </p>
                      <p className="p_Information_Stats">
                        Objectif Volée : {data.objectivesStolen}
                      </p>
                      <p className="p_Information_Stats">
                        Assist Objectif Volée : {data.objectivesStolenAssists}
                      </p>
                    </div>
                    <div className="Information_positionDamage">
                      <p className="p_Information_Stats">
                        SelfMitiged Damage : {data.damageSelfMitigated}
                      </p>
                      <p className="p_Information_Stats">
                        Plus Gros Crit : {data.largestCriticalStrike}
                      </p>
                      <p className="p_Information_Stats">
                        Dégat Magic Infligée : {data.magicDamageDealt}
                      </p>
                      <p className="p_Information_Stats">
                        Dégat Magic Infligée au Champion :{' '}
                        {data.magicDamageDealtToChampions}
                      </p>
                      <p className="p_Information_Stats">
                        Dégat Magic Recus : {data.magicDamageTaken}
                      </p>

                      <p className="p_Information_Stats">
                        Dégat Physique Infliger : {data.physicalDamageDealt}
                      </p>
                      <p className="p_Information_Stats">
                        Dégat Physique Infliger au Champion :{' '}
                        {data.physicalDamageDealtToChampions}
                      </p>
                      <p className="p_Information_Stats">
                        Dégat Physique Recus : {data.physicalDamageTaken}
                      </p>
                      <p className="p_Information_Stats">
                        timeCCingOthers : {data.timeCCingOthers}
                      </p>
                      <p className="p_Information_Stats">
                        totalDamageDealt : {data.totalDamageDealt}
                      </p>
                      <p className="p_Information_Stats">
                        totalDamageDealtToChampions :{' '}
                        {data.totalDamageDealtToChampions}
                      </p>
                      <p className="p_Information_Stats">
                        totalDamageShieldedOnTeammates :{' '}
                        {data.totalDamageShieldedOnTeammates}
                      </p>
                      <p className="p_Information_Stats">
                        totalDamageTaken : {data.totalDamageTaken}
                      </p>
                      <p className="p_Information_Stats">
                        totalHeal : {data.totalHeal}
                      </p>
                      <p className="p_Information_Stats">
                        totalTimeCCDealt : {data.totalTimeCCDealt}
                      </p>
                      <p className="p_Information_Stats">
                        totalTimeSpentDead : {data.totalTimeSpentDead}
                      </p>
                      <p className="p_Information_Stats">
                        totalUnitsHealed : {data.totalUnitsHealed}
                      </p>
                      <p className="p_Information_Stats">
                        trueDamageDealt : {data.trueDamageDealt}
                      </p>
                      <p className="p_Information_Stats">
                        trueDamageDealtToChampions :{' '}
                        {data.trueDamageDealtToChampions}
                      </p>
                      <p className="p_Information_Stats">
                        trueDamageTaken : {data.trueDamageTaken}
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Information
