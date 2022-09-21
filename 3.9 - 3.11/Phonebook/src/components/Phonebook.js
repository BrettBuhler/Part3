import React from "react"
const Phonebook = ({handleFilterChange, newFilter}) => {
    return (
      <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </div>
    )
  }
  export default Phonebook