import React, { useState } from 'react';
import "./todolist.scss";

function Todolist() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editUser) {
            let index = users?.findIndex(el => el.id === editUser.id);
            let updatedUser = {
                id: editUser.id,
                fname,
                lname,
                age: +age,
                address,
            };
            let updatedUsers = [...users];
            updatedUsers.splice(index, 1, updatedUser);
            setUsers(updatedUsers);
        } else {
            const user = {
                id: new Date().getTime(),
                fname,
                lname,
                age: +age,
                address,
            };
            setUsers(prev => [...prev, user]);
        }
        setFname("");
        setLname("");
        setAge("");
        setAddress("");
    };

    const handelDeleteUser = id => {
        let filteredUsers = users?.filter(user => user.id !== id);
        if (window.confirm("Are you sure you want to delete?")) {
            setUsers(filteredUsers);
        }
    };

    const handelEditUser = el => {
        setEditUser(el);
        setFname(el.fname);
        setLname(el.lname);
        setAge(el.age);
        setAddress(el.address);
    };

    const handleLearnMore = user => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const userItems = users.map(el => (
        <div key={el.id} className="card">
            <div className="card__image"></div>
            <h3>{el.fname}</h3>
            <p>{el.lname}</p>
            <p>{el.age}</p>
            <p>{el.address}</p>
            <div className="btns">
                <button onClick={() => handelDeleteUser(el.id)}>Delete</button>
                <button onClick={() => handelEditUser(el)}>Edit</button>
                <button className='learnMore' onClick={() => handleLearnMore(el)}>Learn more</button>
            </div>
        </div>
    ));

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={fname}
                    onChange={(event) => setFname(event.target.value)}
                    type="text"
                    placeholder='First Name' />
                <input
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    type="text"
                    placeholder='Last Name'
                />
                <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    placeholder='Age'
                />
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder='Address'
                />
                <button>{editUser ? "Save" : "Create"}</button>
            </form>
            <div className="wrapper">
                {userItems}
            </div>
            {selectedUser && (
                <ProductDetails data={selectedUser} close={closeModal} />
            )}
        </>
    );
}

const ProductDetails = ({ data, close }) => {
    return (
        <div className="product__modal">
            <div className="product__detail">
                <h1>{data.fname} {data.lname}</h1>
                <p>Age: {data.age}</p>
                <p>Address: {data.address}</p>
                <button onClick={close}>Close</button>
            </div>
        </div>
    );
};

export default Todolist;
