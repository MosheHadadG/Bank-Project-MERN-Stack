import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomePage from './screens/Home_Page/HomePage';
import NavBar from './components/navbar/NavBar';
import DashboardPage from './screens/Dashboard_Page/DashboardPage';
import { useContext, useEffect } from 'react';
import { appContext } from './context/appContext';
import AsideBar from './components/aside/AsideBar';
import MyAccountsPage from './screens/My_Accounts_Page/MyAccountsPage';
import TransferPage from './screens/Transfer_Page/TransferPage';
import DepositPage from './screens/Deposit_Page/DepositPage';
import WithdrawPage from './screens/Withdraw_Page/WithdrawPage';


function App() {
 const { token, setToken } = useContext(appContext)
 
 useEffect(() => {
  const tokenLocalStorage = localStorage.getItem('token');
  if(tokenLocalStorage) {
    setToken(tokenLocalStorage);
  }

 }, [])

  // const userToken = localStorage.getItem('token');


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        {!token ?

          <Route exact path="/" component={HomePage} />
          :
          <>
          <main >
           <AsideBar />
          <Route exact path="/" component={DashboardPage} />
          <Route exact path="/transfer" component={TransferPage} />
          <Route exact path="/my-accounts" component={MyAccountsPage} />
          <Route exact path="/deposit" component={DepositPage} />
          <Route exact path="/withdraw" component={WithdrawPage} />
          
          </main>
          </>

        }
      </BrowserRouter>

    </div>
  );
}

export default App;
