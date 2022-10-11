import '../App.css'
import DataTable from 'react-data-table-component'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Information from './Information'
import axios from 'axios'

let Fileds = ''
let ID = ''
let Post = ''
let Mots_de_Passe = ''
let Formation = ''
let URL = ''
function Dashboard() {
  let navigate = useNavigate()

  //Plein de truc qui permet de Controller les TextFileds et de les changer par la meme occasion
  /* let [Civilité, setCivilité] = React.useState('')
  const handleChangeCivilité = (eventCivilité) => {
    setCivilité(eventCivilité.target.value)
  }
  let [Prenom, setPrenom] = React.useState('')
  const handleChangePrenom = (eventPrenom) => {
    setPrenom(eventPrenom.target.value)
  }
  let [Nom, setNom] = React.useState('')
  const handleChangeNom = (eventNom) => {
    setNom(eventNom.target.value)
  }
  let [Email, setEmail] = React.useState('')
  const handleChangeEmail = (eventEmail) => {
    setEmail(eventEmail.target.value)
  }
  let [Téléphone, setTéléphone] = React.useState('')
  const handleChangeTéléphone = (eventTéléphone) => {
    setTéléphone(eventTéléphone.target.value)
  }
*/
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows)
  }, [])
  /************************************************************************************************************************/
  const columns = [
    {
      name: 'ID Champion',
      selector: (row) => row.championId,
    },
    {
      name: 'Champion point',
      selector: (row) => row.championPoints,
    },
    {
      name: 'Coffre Obtenue',
      selector: (row) => row.chestGranted,
    },
  ]

  /*  const data = [
    {
      id: 1,
      civilite: 'M',
      prenom: 'Beetlejuice',
      nom: 'juice',
      Email: '1988',
      Téléphone: '0796235263',
    },
    {
      id: 2,
      civilite: 'Mme',
      prenom: 'Reine',
      nom: 'des Junkers',
      Email: 'AH AH what `s that ',
      Téléphone: 'Street',
    },
    {
      id: 3,
      civilite: 'M',
      prenom: 'Malcolm',
      nom: 'Graves',
      Email: 'PanPan',
      Téléphone: 'have money on you he will find you',
    },
    {
      id: 4,
      civilite: 'M',
      prenom: 'Aatrox',
      nom: 'GodKiller',
      Email: 'Death',
      Téléphone: 'Being Alive',
    },
  ]*/
  /************************************************************************************************************************/

  // let [data, setData] = React.useState([])

  let [dataid, setDataid] = React.useState([])

  const handleChange = ({ selectedRows }) => {
    console.log(selectedRows.map((row) => row.id))
    setDataid(selectedRows.map((row) => row.id))
    console.log(dataid[0], dataid[1])
    if (dataid[0] === '' || dataid[0] === undefined || dataid[0] === null) {
      console.log('1st row selecteds')
      //TRI DE INFO
      Fileds = JSON.stringify(selectedRows).split('"')
      //console.log(Fileds)
      ID = Fileds[3]
      Post = Fileds[7]
      /*setCivilité((Civilité = Fileds[5]))
      setPrenom((Prenom = Fileds[9]))
      setNom((Nom = Fileds[13]))
      setEmail((Email = Fileds[17]))
      setTéléphone((Téléphone = Fileds[21]))*/

      //console.log(Civilité, Prenom, Nom, Email, Téléphone)
    } else {
      if (selectedRows[1] === undefined) {
        Fileds = JSON.stringify(selectedRows).split('"')

        ID = Fileds[3]
        /* setCivilité((Civilité = Fileds[5]))
        setPrenom((Prenom = Fileds[9]))
        setNom((Nom = Fileds[13]))
        setEmail((Email = Fileds[17]))
        setTéléphone((Téléphone = Fileds[21]))*/
      } else {
        console.log('Multiple Rows selected')

        /* setCivilité('')
        setPrenom('')
        setNom('')
        setEmail('')
        setTéléphone('')*/
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Deleteall = async () => {
    console.log(dataid, ID)
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
    Mots_de_Passe = ''
    Formation = ''
    setDataid([])
    console.log(dataid, ID)
    setToggleCleared(!toggleCleared)
  }

  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      URL =
        'https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/jgLdeCHjY0dfooe5J-LgtjGKtw_yFQFvfvulguvJ0ZfUGD0'
      const res = await axios.get(URL, {
        headers: {
          'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
          Origin: 'https://developer.riotgames.com',
          'X-Riot-Token': 'RGAPI-5276740e-b8c4-4854-8d60-0f247b1d601d',
        },
      })
      setData(res.data)
    }
    if (query.length === 0 || query.length > 0) fetchData()
  }, [query])
  //jgLdeCHjY0dfooe5J-LgtjGKtw_yFQFvfvulguvJ0ZfUGD0
  const Update = () => {
    setTimeout(function () {
      let path = `/Information`
      navigate(path)
    }, 500)
  }

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {}

    return (
      <div>
        <Button onClick={Update} color="primary" variant="contained">
          Update
        </Button>
        <Button onClick={Deleteall} color="error" variant="contained">
          Delete
        </Button>
      </div>
    )
  }, [Deleteall, data, selectedRows, toggleCleared])

  return (
    <div>
      <DataTable
        title="Utilisateurs"
        columns={columns}
        data={data}
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

export default Dashboard
