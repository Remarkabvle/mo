import React, { useState } from 'react'
import "./todolist.scss";

function Todolist() {
    const [fname,  setFname] = useState("")
    const [lname,  setLname] = useState("")
    const [age,  setAge] = useState("")
    const [users, setUsers] = useState([])


    
    const handleSubmit = (event) => {
        event.preventDefault()
        const user = {
            id: new Date().getTime(),
            fname,
            lname,
            age: +age,
        }
        setUsers(prev => [...prev, user])
        setFname("")
        setLname("")
        setAge("")
    }
    console.log(users);

    const handelDeleteUser = id => {
        let filteredUsers = users?.filter(user => user.id !== id)
        confirm("uchadi hozir") ? setUsers(filteredUsers) : "nothing" 
    }

    const userItems = users?.map(el => (
        <div key={el.id} className="card">
                    <div className="card__image"></div>
                    <h3>{el.fname}</h3>
                    <p>{el.lname}</p>
                    <p>{el.age}</p>
                    <button onClick={()=> handelDeleteUser(el.id)}>delete</button>
                </div>
    ))

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={fname}
                    onChange={(event) => setFname(event.target.value)}
                    type="text"
                    placeholder='fname' />
                <input type="text" placeholder='lname'
                    onChange={(e) => setLname(e.target.value)}
                    value={lname}
                />
                <input type="number" placeholder='age'
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                />
                <button>Create</button>
            </form>
            <div className="wrapper">
                {userItems}
            </div>
        </>
    )
}

export default Todolist
