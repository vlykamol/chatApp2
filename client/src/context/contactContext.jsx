import { createContext, useContext, useState } from "react";

const contactContext = createContext()

export function useContact(){
  return useContext(createContext)
}

export function contactProvider({children}) {

  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])


  const value = {}

  return <contactContext.Provider value={value}>
    {!loading && children}
    </contactContext.Provider>
}