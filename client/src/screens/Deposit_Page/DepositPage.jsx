import React, { useContext, useState } from 'react'
import { depositToUserSpecificAccount } from '../../API/ServerAPI/server.users';
import { appContext } from '../../context/appContext';

const initialState = {
  accountID: '',
  cash: ''
}

function DepositPage() {

  const { token } = useContext(appContext)
  const [formDeposit, setFormDeposit] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);
  const [depositDetails, setDepositDetails] = useState(null);

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormDeposit({ ...formDeposit, [nameInput]: value })

  }

  const handleClick = async (event) => {
    event.preventDefault()
    const { accountID, cash } = formDeposit;
    if (!accountID || !cash) return setErrorMsg('Please enter all fields');

    const depositDetails = await depositToUserSpecificAccount(token, { ...formDeposit, cash: +formDeposit.cash });
    if (!depositDetails || depositDetails.message) return setErrorMsg('Deposit failed');

    setErrorMsg(null);
    setFormDeposit(initialState);
    setDepositDetails(depositDetails);
  }

  return (
    <div className='main-container'>
      <form className='login-form' action="">
        <div className='login-inputs'>

          <input onChange={handleChange} placeholder="Account id..."
            name='accountID' value={formDeposit.accountID} type="text" required />

          <input onChange={handleChange} placeholder="Amount..."
            name='cash' value={formDeposit.cash} type="number" required />
        </div>

        <button onClick={handleClick} type='submit'>Deposit</button>
      </form>
      <div className='msg'>
        {errorMsg && <h4>{errorMsg}</h4>}
        {depositDetails &&
          <>
            <h2>The deposit was completed successfully</h2>
            <h2>Current account status</h2>
            <h4>Account ID: {depositDetails._id}</h4>
            <h3>Cash: {depositDetails.cash}</h3>
            <h3>Credit: {depositDetails.credit}</h3>
          </>
        }
      </div>
    </div>
  )
}

export default DepositPage;