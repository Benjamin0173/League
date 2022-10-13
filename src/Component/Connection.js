import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import useInput from '../hooks/use-Inputs'

// eslint-disable-next-line no-unused-vars
let role = ''
let Email = ''
let Mots_de_Passe = ''
let dataMDP = ''
let dataMAIL = ''
let message = ''

const Connection = (props) => {
  let navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      select: {},
    },
  })

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== '')

  const formSubmissionHandler = (event) => {
    console.log(enteredName)

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM

    //setEnteredEmail('');
    //setEnteredEmailTouched(false);
  }

  const onSubmit = async (data) => {
    data.preventDefault()

    if (!enteredNameIsValid) {
      return
    }

    resetNameInput()
    resetEmailInput()

    //TRI DE DATA
    data = JSON.stringify(data)
    data = data.toString().split('"')
    dataMAIL = data[5]
    dataMDP = data[9]
    console.log(dataMAIL, dataMDP)
    //console.log(Fileds)

    const emailInputClasses = enteredEmailIsInvalid
      ? 'form-control invalid'
      : 'form-control'

    if (enteredNameIsValid && enteredEmailIsValid) {
      message = 'Email non reconnu'
    }
    if (dataMAIL === '123456benjamin.rey@gmail.com') {
      message = 'Mots de passe Correct'
      console.log(dataMAIL)
      setTimeout(function () {
        let path = `/client`
        navigate(path)
      }, 2000)
    } else {
      message = 'Mots de passe Incorrect'
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <div className="message">Connection</div>
      <div className="Appsouspartie">
        <div className="Appsoussouspartie">
          <TextField
            id="email"
            variant="outlined"
            placeholder="Email"
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
            value={enteredEmail}
            {...register('EMail', {
              pattern: /^\S+@\S+$/i,
              required: true,
            })}
          />
          {errors.EMail && <p>Email Faux ou non Reconnu</p>}
        </div>
        <div className="Appsoussouspartie">
          <TextField
            id="MDP"
            variant="outlined"
            placeholder="Mots de Passe"
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
            //onChange={someChangeHandler}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('Mots_de_Passe', {
              pattern: /^[^ \t][A-Z]+[a-z]+[0-9]+[^A-Za-z0-9_]+$/i,
              min: 8,
              required: true,
              max: 20,
            })}
          />
          {errors.Mots_de_Passe && <p>Mots de passe Incorrect</p>}
        </div>
      </div>
      <div className="button">
        <Button type="submit" variant="contained">
          Connection
        </Button>
      </div>
      <div className="message">{message}</div>
    </form>
  )
}

export default Connection
