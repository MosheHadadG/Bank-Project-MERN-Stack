import React, { useContext, useState } from 'react'
import './LoginBox.css'
import { loginUser } from '../../API/ServerAPI/server.users';
import { appContext } from '../../context/appContext';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner'

const initialState = {
  email: '',
  password: '',
}


function LoginBox({ loginMode, setLoginMode }) {
  const [formLogin, setFormLogin] = useState(initialState);
  const [wrongMsg, setWrongMsg] = useState(false)
  const [spinner, setSpinner] = useState(false)


  let history = useHistory();
  // Global State
  const { setToken } = useContext(appContext);

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormLogin({ ...formLogin, [nameInput]: value })

  }


  const handleClick = async (event) => {
    event.preventDefault()
    setSpinner(true)
    const userLogin = await loginUser(formLogin);
    setSpinner(false)
    if (userLogin.error) return setWrongMsg(userLogin.error);


    const userToken = userLogin.token;
    setToken(userToken);
    localStorage.setItem('token', userToken);
    history.push('/')

  }

  return (
    <div className='login-container'>

      {spinner ? <Spinner /> :
        <>
          <form className='login-form' action="">
            <div className='login-inputs'>

              <input onChange={handleChange} placeholder="Email"
                name='email' value={formLogin.email} type="email" required />

              <input onChange={handleChange} placeholder="Password"
                name='password' autoComplete="true" password={formLogin.password} type="password" required />
            </div>

            <button onClick={handleClick} type='submit'>Login</button>
          </form>

          <div className='login-bottom'>
            {wrongMsg && <h3 style={{ color: 'red', textAlign: 'center' }}>{wrongMsg}</h3>}
            {loginMode && <h4 style={{ color: 'white' }}>Don't have an account yet? <a onClick={() => setLoginMode(false)}>Sign Up</a></h4>}
          </div>
        </>
      }
    </div>

  )
}

export default LoginBox