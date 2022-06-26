import React, { useContext, useEffect, useState } from 'react'
import { getUserWithdrawals } from '../../API/ServerAPI/server.users';
import { appContext } from '../../context/appContext';
import CardWithdraw from '../../components/CardWithdraw/CardWithdraw';
import Spinner from '../../components/Spinner/Spinner';


function DashboardPage() {
  const { token } = useContext(appContext);
  const [withdrawals, setWithdrawals] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getMyWithdrawals = async () => {
      const MyWithdrawals = await getUserWithdrawals(token);
      if(MyWithdrawals.response && MyWithdrawals.response.data.error) return setErrorMsg(MyWithdrawals.response.data.error)
      setWithdrawals(MyWithdrawals);
    }
    getMyWithdrawals();
  },[])

  const renderWithdrawals = () => {
    const renderedWithdrawals = withdrawals.map((withdraw) => <CardWithdraw key={withdraw._id} withdraw={withdraw} />);
    return renderedWithdrawals;
  }

  return (
    <>
    <h2>My Withdrawals</h2>
    <div style={{ textAlign: 'center'}} className='accounts-container'>
      
      <div className='accounts'>
        {errorMsg && <h3>{errorMsg}</h3>}
        {withdrawals.length > 0 && renderWithdrawals()}
        {!errorMsg && withdrawals.length === 0 && <Spinner />}

      </div>

    </div>
    </>

  )
}

export default DashboardPage;