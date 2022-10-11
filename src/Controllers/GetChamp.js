import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

let URL = ''

export function GetChamp() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      URL =
        'http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json'
      const res = await axios.get(URL, {
        headers: { 'X-Api-Key': 'k7Lujk2lcPNXhC6de4ajhA==B14mWcDEh4mNt7Ej' },
      })
      setData(res.data)
    }
    if (query.length === 0 || query.length > 0) fetchData()
  }, [query])
}
