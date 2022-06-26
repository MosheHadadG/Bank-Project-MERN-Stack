import React from 'react'
// import { contextApp } from '../../context/contextApp';
// import { deleteUser, getUsers } from '../../ServerAPI/admin'
import './CardAccount.css'


function CardAccount({ account }) {
  // const { setUsers } = useContext(contextApp);

  // const handleRemoveUser = async (event, id) => {
  //   await deleteUser(id);
  //   const updatedUsers = await getUsers();
  //   setUsers(updatedUsers)
  // }

  const { _id, cash, credit } = account;
  return (
    <div key={_id} className='account'>
      <h5>cash: {cash}₪</h5>
      <h5>credit: {credit}₪</h5>
      <h5>id: {_id}</h5>
      <div className='delete-button'>
      {/* <button onClick={(event) => handleRemoveUser(event, passportID)}>Delete Account</button> */}
      </div>
    </div>
  )
}

export default CardAccount;