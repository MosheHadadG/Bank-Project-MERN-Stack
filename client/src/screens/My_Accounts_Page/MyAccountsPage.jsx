import React, { useContext, useEffect, useState } from 'react'
import { getUserAccounts } from '../../API/ServerAPI/server.users';
import { appContext } from '../../context/appContext';
import CardAccount from '../../components/CardAccount/CardAccount';
import './MyAccountsPage.css'
import Spinner from '../../components/Spinner/Spinner';

function MyAccountsPage() {
  const { token } = useContext(appContext);
  const [accounts, setAccounts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getMyAccounts = async () => {
      const myAccounts = await getUserAccounts(token);
      if(myAccounts.response && myAccounts.response.data.error) return setErrorMsg(myAccounts.response.data.error)
      setAccounts(myAccounts);
    }
    getMyAccounts();
  },[])

  const renderAccounts = () => {
    const renderedAccounts = accounts.map((account) => <CardAccount key={account._id} account={account} />);
    return renderedAccounts;
  }



  return (
    <div style={{ textAlign: 'center'}} className='accounts-container'>
      <div className='accounts'>
        {errorMsg && <h3>{errorMsg}</h3>}
        {accounts.length > 0 && renderAccounts()}
        {!errorMsg && accounts.length === 0 && <Spinner />}

      </div>

    </div>

  )
}

export default MyAccountsPage