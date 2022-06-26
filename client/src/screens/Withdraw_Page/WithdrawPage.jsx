import React, { useContext, useState } from 'react'
import { depositToUserSpecificAccount, withdrawFromMySpecificAccount } from '../../API/ServerAPI/server.users';
import { appContext } from '../../context/appContext';

const initialState = {
  accountID: '',
  amount: ''
}

function WithdrawPage() {

  const { token } = useContext(appContext)
  const [formWithdraw, setFormWithdraw] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);
  const [withdrawDetails, setWithdrawDetails] = useState(null);

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormWithdraw({ ...formWithdraw, [nameInput]: value })

  }

  const handleClick = async (event) => {
    event.preventDefault()
    const { accountID, amount } = formWithdraw;
    if (!accountID || !amount) return setErrorMsg('Please enter all fields');

    const withdrawDetails = await withdrawFromMySpecificAccount(token, { ...formWithdraw, amount: +formWithdraw.amount });
    if (!withdrawDetails || withdrawDetails.message) return setErrorMsg('Withdraw failed');
    console.log(withdrawDetails);
    setErrorMsg(null);
    setFormWithdraw(initialState);
    setWithdrawDetails(withdrawDetails.withdraw);
    
  }

  return (
    <div className='main-container'>
      <form className='login-form' action="">
        <div className='login-inputs'>

          <input onChange={handleChange} placeholder="Account id..."
            name='accountID' value={formWithdraw.accountID} type="text" required />

          <input onChange={handleChange} placeholder="Amount..."
            name='amount' value={formWithdraw.amount} type="number" required />
        </div>

        <button onClick={handleClick} type='submit'>Withdraw</button>
      </form>
      <div className='msg'>
        {errorMsg && <h4>{errorMsg}</h4>}
        {withdrawDetails &&
          <>
            <h2>The Withdraw was completed successfully</h2>
            <h4>Name Account Owner: {withdrawDetails.NameAccountOwner}</h4>
            <h3>Withdrawal amount: {withdrawDetails.amount}</h3>
            <h3>From Account: {withdrawDetails.fromAccount}</h3>
            <h3>date: {withdrawDetails.date}</h3>
          </>
        }
      </div>
    </div>
  )
}

export default WithdrawPage;