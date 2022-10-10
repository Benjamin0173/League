import '../App.css'
import DataTable from 'react-data-table-component'
import React, { useState } from 'react'
import {
  TextField,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  FormControl,
} from '@mui/material'

let Fileds = ''
let ID = ''
let Post = ''
let Mots_de_Passe = ''
let Formation = ''

function Dashboard() {
  //Plein de truc qui permet de Controller les TextFileds et de les changer par la meme occasion
  let [Civilité, setCivilité] = React.useState('')
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

  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows)
  }, [])

  const columns = [
    {
      name: 'Civilité',
      selector: (row) => row.civilite,
    },
    {
      name: 'Prenom',
      selector: (row) => row.prenom,
    },
    {
      name: 'Nom',
      selector: (row) => row.nom,
    },
  ]

  const data = [
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
      Email: '1984',
      Téléphone: '065649562',
    },
  ]

  // let [data, setData] = React.useState([])

  let [dataid, setDataid] = React.useState([])

  const handleChange = ({ selectedRows }) => {
    console.log(selectedRows.map((row) => row._id))
    setDataid(selectedRows.map((row) => row._id))
    console.log(dataid[0], dataid[1])
    if (dataid[0] === '' || dataid[0] === undefined || dataid[0] === null) {
      console.log('1st row selecteds')
      //TRI DE INFO
      Fileds = JSON.stringify(selectedRows).split('"')
      //console.log(Fileds)
      ID = Fileds[3]
      Post = Fileds[7]
      setCivilité((Civilité = Fileds[5]))
      setPrenom((Prenom = Fileds[9]))
      setNom((Nom = Fileds[13]))
      setEmail((Email = Fileds[17]))
      setTéléphone((Téléphone = Fileds[21]))

      //console.log(Civilité, Prenom, Nom, Email, Téléphone)
    } else {
      if (selectedRows[1] === undefined) {
        Fileds = JSON.stringify(selectedRows).split('"')

        ID = Fileds[3]
        setCivilité((Civilité = Fileds[5]))
        setPrenom((Prenom = Fileds[9]))
        setNom((Nom = Fileds[13]))
        setEmail((Email = Fileds[17]))
        setTéléphone((Téléphone = Fileds[21]))
      } else {
        console.log('Multiple Rows selected')

        setCivilité('')
        setPrenom('')
        setNom('')
        setEmail('')
        setTéléphone('')
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
    setCivilité('')
    setPrenom('')
    setNom('')
    setEmail('')
    setTéléphone('')
    Mots_de_Passe = ''
    Formation = ''
    setDataid([])
    console.log(dataid, ID)
    setToggleCleared(!toggleCleared)
  }

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.title
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared)
        //setData(differenceBy(data, selectedRows, 'title'))
      }
    }

    return (
      <Button onClick={Deleteall} color="error" variant="contained" icon>
        Delete
      </Button>
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
