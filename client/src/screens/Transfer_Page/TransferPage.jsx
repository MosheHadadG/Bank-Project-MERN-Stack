import React, { useContext, useState } from 'react'
import { transferFromUserSpecificAccount } from '../../API/ServerAPI/server.users';
import { appContext } from '../../context/appContext';

const initialState = {
  fromAccountID: '',
  toAccountID: '',
  amount: ''
}

function TransferPage() {

  const { token } = useContext(appContext)
  const [formTransfer, setFormTransfer] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);
  const [transferDetails, setTransferDetails] = useState(null);

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormTransfer({ ...formTransfer, [nameInput]: value })

  }

  const handleClick = async (event) => {
    event.preventDefault()
    const { fromAccountID, toAccountID, amount } = formTransfer;
    if (!fromAccountID || !toAccountID || !amount) return setErrorMsg('Please enter all fields');

    const transferDetails = await transferFromUserSpecificAccount(token, { ...formTransfer, amount: +formTransfer.amount });
    if (!transferDetails || transferDetails.message) return setErrorMsg('Transfer failed');

    setErrorMsg(null);
    setFormTransfer(initialState);
    setTransferDetails(transferDetails);
  }

  return (
    <div className='main-container'>
      <form className='login-form' action="">
        <div className='login-inputs'>

          <input onChange={handleChange} placeholder="From Account Id..."
            name='fromAccountID' value={formTransfer.fromAccountID} type="text" required />

          <input onChange={handleChange} placeholder="to Account Id..."
            name='toAccountID' value={formTransfer.toAccountID} type="text" required />

          <input onChange={handleChange} placeholder="Amount..."
            name='amount' value={formTransfer.amount} type="number" required />
        </div>

        <button onClick={handleClick} type='submit'>Transfer</button>
      </form>
      <div className='msg'>
        {errorMsg && <h4>{errorMsg}</h4>}
        {transferDetails &&
          <>
            <h2>The transfer was completed successfully</h2>
            <h4>Name Sender: {transferDetails.nameSender}</h4>
            <h4>From Account: {transferDetails.fromAccount}</h4>
            <h4>Name Receiver: {transferDetails.NameReceiver}</h4>
            <h4>To Account: {transferDetails.toAccount}</h4>
            <h3>Amount: {transferDetails.amount}</h3>
          </>
        }
      </div>
    </div>
  )
}

export default TransferPage