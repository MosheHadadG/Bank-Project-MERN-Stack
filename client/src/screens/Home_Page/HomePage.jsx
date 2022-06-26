import React, { useState } from 'react'
import LoginBox from '../../components/login_box/LoginBox'
import './HomePage.css'
import Card from '../../components/card/Card'
import RegisterBox from '../../components/register_box/RegisterBox';

function HomePage() {
  const [loginMode, setLoginMode] = useState(true);



  return (
    <div className='home-page-container'>

      <div className="sub-header">
        {loginMode ? 
          <LoginBox loginMode={loginMode} setLoginMode={(bol) => setLoginMode(bol)} /> 
          :
          <RegisterBox loginMode={loginMode} setLoginMode={(bol) => setLoginMode(bol)} />}

      </div>
      <div className='cards'>
        <Card
          srcIcon={<i className="fa-solid fa-sack-dollar fa-2xl"></i>}
          title="Save Your Money"
          desc=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, alias?"
        />
        <Card
          srcIcon={<i className="fa-solid fa-globe fa-2xl"></i>}
          title="Bank Online"
          desc=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, alias?"
        />
        <Card
          srcIcon={<i className="fa-brands fa-cc-visa fa-2xl"></i>}
          title="Cash Back"
          desc=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, alias?"
        />
        <Card
          srcIcon={<i className="fa-solid fa-file-invoice-dollar fa-2xl"></i>}
          title="Unlimited Accounts"
          desc=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, alias?"
        />
      </div>

    </div>
  )
}

export default HomePage