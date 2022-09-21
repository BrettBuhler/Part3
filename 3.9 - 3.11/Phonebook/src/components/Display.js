import React from "react"
import Person from "./Person"

const Display = ({persons, newFilter, deletePerson}) => {
    const newFilterInX = (x) => {
      if (x.toLowerCase().indexOf(newFilter.toLowerCase()) >= 0){
        return true
      }
      return false
    }
    if (newFilter === ''){
      return (
        <div>
          <h2>Numbers</h2>
          {persons.map(x => <Person person={x} key={x.id} deletePerson={deletePerson}/>)}
        </div>
      )
    }
    return (
      <div>
        <h2>Numbers</h2>
        {persons.filter(person => newFilterInX(person.name)).map(x => <Person person={x} key={x.key}/>)}
      </div>
    )
  }

  export default Display