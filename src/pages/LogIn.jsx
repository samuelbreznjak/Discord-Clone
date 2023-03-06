import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import ResetPassword from '../components/login-components/ResetPassword';
import LoginScreen from '../components/login-components/LoginScreen';
import RegisterScreen from '../components/login-components/RegisterScreen';
import TooYoung from '../components/login-components/TooYoung';
import LoadingDiv from '../components/login-components/LoadingDiv';
import { Helmet } from 'react-helmet';

export default function LogIn() {
  const navigate = useNavigate();

  let [resetPassword, setResetPassword] = useState(false)
  let [activeDiv, setActiveDiv] = useState('loading')

  let [logInputValues, setLogInputValues] = useState({
    email: '',
    pw: ''
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        navigate('/app')
      }else{
        setActiveDiv('log')
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
        <Helmet>
          <title>Discord | Your Place to Talk and Hang Out</title>
        </Helmet>
        <ResetPassword
            show={resetPassword} 
            email={logInputValues.email}
            setResetPassword={setResetPassword}
            setActiveDiv={setActiveDiv}
        />

        <div className="wrapper select-none invisiblebar">
            <LoginScreen 
                activeDiv={activeDiv}
                setLogInputValues={setLogInputValues}
                logInputValues={logInputValues} 
                setResetPassword={setResetPassword}
                setActiveDiv={setActiveDiv}
            />

            <RegisterScreen 
              activeDiv={activeDiv}
              setActiveDiv={setActiveDiv}
            />

            <TooYoung 
              activeDiv={activeDiv}
              setActiveDiv={setActiveDiv}
            />

            <LoadingDiv 
              activeDiv={activeDiv}
              setActiveDiv={setActiveDiv}
            />
        </div>
    </> 
  )
}