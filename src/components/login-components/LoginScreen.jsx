import React, { useState } from 'react'
import { emailPattern } from '../../data/data';
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ logInputValues, setLogInputValues, activeDiv, setResetPassword, setActiveDiv}) {

let [loadingButton, setLoadingButton] = useState(false)
let [wrongPw, setWrongPw] = useState(false)

let handlePasswordReset = (state) => {
    if(emailPattern.test(logInputValues.email)){
        setResetPassword(state)
    }else{
        setLogErrors(logErrors => ({
            ...logErrors,
            email: false
        }))
    }
}

let [logErrors, setLogErrors] = useState({
    email: false,
    pw: false
})

let handleLogInput = (input) => {
    switch(input.target.id){
        case 'email':
            setLogInputValues(logInputValues => ({
                ...logInputValues,
                email: input.target.value
            }))
        break;

        case 'password': 
            setLogInputValues(logInputValues => ({
                ...logInputValues,
                pw: input.target.value
            }))
        break;

        default: 
        break;
    } 
}

let handleLogSubmit = async (e) => {
    e.preventDefault()

    setLoadingButton(true)

    if(emailPattern.test(logInputValues.email)){
        setLogErrors(logErrors => ({
            ...logErrors,
            email: false
        }))
    }else{
        setLogErrors(logErrors => ({
            ...logErrors,
            email: true
        }))
        setLoadingButton(false)
    }

    if(logInputValues.pw.length > 7){
        setLogErrors(logErrors => ({
            ...logErrors,
            pw: false
        }))

    }else{
        setLogErrors(logErrors => ({
            ...logErrors,
            pw: true
        }))
        setLoadingButton(false)
    }

    if(emailPattern.test(logInputValues.email) && logInputValues.pw.length > 7){
        let email = logInputValues.email
        let password = logInputValues.pw

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setLoadingButton(false)
            setWrongPw(false)
        }catch{
            setLoadingButton(false)
            setWrongPw(true)
        }
    }
}

return (
    <div className={activeDiv === 'log' ? "w-[480px] h-[408px] rounded-main bg-main-gray text-white p-8 active" : "w-[464px] h-[408px] rounded-main bg-main-gray text-white p-8"}>
        <form onSubmit={handleLogSubmit}>
            <div>
                <h1 className="font-semibold text-2xl text-center mb-2 leading-[30px]">Welcome back!</h1>
                <p className="font-normal text-secondary-gray text-center leading-[20px]">We're so excited to see you again!</p>
            </div>
            <div className="w-full text-left mt-5">
                <div className="mb-5">
                    <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="email">
                        EMAIL
                        <span className='text-red pl-1'>{logErrors.email ? '- Email is invalid' : '*'}</span>
                    </label>
                    
                    <div>
                        <input onChange={handleLogInput} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" type="email" name="email" id="email" />
                    </div>
                </div>
                <div>
                    <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="email">
                        PASSWORD
                        <span className="text-red pl-1">
                            {logErrors.pw ? '- Password is invalid' : wrongPw ? '- Password is incorrect' : '*'}
                        </span>
                    </label>
                    
                    <div>
                        <input onChange={handleLogInput} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" type="password" name="password" id="password" />
                    </div>
                </div>
                <button className="mt-1">
                    <div onClick={() => {handlePasswordReset(true)}} className="font-medium text-link text-sm hover:underline">Forgot your password?</div>
                </button>
                <button onClick={handleLogSubmit} className="main-btn" type="submit">
                    {loadingButton ?
                    <div className='flex'>
                        <div style={{ animationDelay: '0ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing'></div>
                        <div style={{ animationDelay: '100ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing mx-1'></div>
                        <div style={{ animationDelay: '200ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing'></div>
                    </div>
                    :
                    'Log in'
                    }
                </button>
                <div className="mt-0.5 text-sm">
                    <span className="text-gray-3">Need an account?</span>
                    <button type="button" onClick={() => {setActiveDiv('reg')}} className="pl-1">
                        <div className="text-link font-medium hover:underline">Register</div>
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}