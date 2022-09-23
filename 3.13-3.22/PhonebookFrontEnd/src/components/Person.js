import React from "react"
import personService from '../services/phonebook.js'
import forceUpdate from 'react'

const Person = ({person, deletePerson}) => {
    return (
      <p>{person.name}: {person.number} <button name={person.name} type='button' onClick={deletePerson} value={person.id}>delete{person.id}</button></p>
    )
  }

  export default Person