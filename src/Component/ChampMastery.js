import '../App.css'
import React, { useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { Button } from '@mui/material'

function ChampionMastery() {
  const [searchText, setSearchText] = useState('')
  const [champMastery, setChampMastery] = useState([])

  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows)
  }, [])

  function getChampionMastery(event) {
    //console.log(searchText)
    axios
      .get('http://localhost:4000/ChampionMastery', {
        params: { username: { searchText } },
      })
      .then(function (response) {
        setChampMastery(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  console.log(champMastery)

  const columns = [
    {
      name: 'ID Champion',
      selector: (row) => row.championId,
    },
    {
      name: 'Champion level',
      selector: (row) => row.championLevel,
    },
    {
      name: 'Champion Point',
      selector: (row) => row.championPoints,
    },
  ]

  const handleChange = ({ selectedRows }) => {}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Deleteall = async () => {
    /* console.log(dataid, ID)
    dataid.forEach(async (ID) => {
      //await DeleteData(ID).then(() => Load())
      console.log(dataid, ID)
    })
    ID = ''
    /*setCivilité('')
    setPrenom('')
    setNom('')
    setEmail('')
    setTéléphone('')*/
    /*Mots_de_Passe = ''
    Formation = ''
    setDataid([])
    console.log(dataid, ID)
    setToggleCleared(!toggleCleared)*/
  }

  const Update = () => {
    /*setTimeout(function () {
      let path = `/Information`
      navigate(path)
    }, 500)*/
  }
  const contextActions = React.useMemo(() => {
    const handleDelete = () => {}

    return (
      <div>
        <Button onClick={Update} color="primary" variant="contained">
          See More
        </Button>
        <Button onClick={Deleteall} color="error" variant="contained">
          Delete
        </Button>
      </div>
    )
  }, [Deleteall, champMastery, selectedRows, toggleCleared])

  /* {champMastery.length !== 0 ? (
        <>
          {champMastery.map((champMasteryData, index) => (
            <span id={index}>
              <div>
                <p>id Champion :{champMasteryData.championId}</p>
                <p>Champion level : {champMasteryData.championLevel}</p>
                <p>Champion point : {champMasteryData.championPoints}</p>
                <br></br>
              </div>
            </span>
          ))}
        </>
      ) : (
        <>
          <p>We have No Data!</p>
        </>
      )}*/
  return (
    <div className="App">
      <h2>Welcome to our proxy server app!</h2>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <button onClick={getChampionMastery}>
        Get all the champ Mastery of an account
      </button>
      <DataTable
        title="Utilisateurs"
        columns={columns}
        data={champMastery}
        selectableRows
        selectableRowsHighlight
        contextActions={contextActions}
        onSelectedRowsChange={(handleRowSelected, handleChange)}
        clearSelectedRows={toggleCleared}
        pagination
      />
    </div>
  )
}

export default ChampionMastery
