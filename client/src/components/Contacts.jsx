import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    axios.get('/contacts').then(res => setContacts(res.data.contacts)).catch(err => console.log('err at fetching contacts', err))
  },[])
  return (
    <div>
      Contacts
    </div>
  )
}
