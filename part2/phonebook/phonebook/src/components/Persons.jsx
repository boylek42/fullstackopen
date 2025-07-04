const Persons = ({persons, filterTerm, handleDelete}) => {
    console.log('Persons is executed.')
    const contactsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(filterTerm.toLowerCase())
    )

    console.log('Contacts to show is defined as: ', contactsToShow)

    {if (persons.length === 0) return(<p>Add a contact.</p>)}
    return(
        <>
        
        {contactsToShow.map((person) => 
        <div key={person.name}>
            <li className='contacts'>{person.name}: {person.number}</li>
            <button onClick={() => handleDelete(person.id, person.name)}>delete {person.name}</button>
        </div>)
        }
        </>
        
    )
}

export default Persons