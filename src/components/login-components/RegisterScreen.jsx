import React, { useState } from 'react'
import { auth, db } from "../../firebase";
import { collection, doc, setDoc, query, where, getCountFromServer } from "firebase/firestore"
import { emailPattern, days, years, months } from '../../data/data';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import RegInputs from './RegInputs';
import DateDropdownBtn from './DateDropdownBtn';

export default function RegisterScreen({ activeDiv, setActiveDiv }) {

let [loadingButton, setLoadingButton] = useState(false)

let [regInputValues, setRegInputValues] = useState({
    email: '',
    pw: '',
    user: '',
})

let [regErrors, setRegErrors] = useState({
    email: false,
    pw: false,
    user: false,
    date: false
})

let [day, setDay] = useState('Day')
let [month, setMonth] = useState('Month')
let [year, setYear] = useState('Year')

let [toggleCheckbox, setToggleCheckbox] = useState(false)
let [toggleCheckbox1, setToggleCheckbox1] = useState(false)

let [invalidEmail, setInvaildEmail] = useState(false)
let [invalidUser, setInvalidUser] = useState(false)

let [dayDropdown, setDayDropdown] = useState(false)
let [monthDropdown, setMonthDropdown] = useState(false)
let [yearDropdown, setYearDropdown] = useState(false)

let handleRegSubmit = async (e) => {
    e.preventDefault()

    setLoadingButton(true)

    const usersRef = collection(db, "users");
    const emailQuery = query(usersRef, where("email", "==", `${regInputValues.email}`));
    const userNameQuery = query(usersRef, where("displayName", "==", `${regInputValues.user}`));

    if(emailPattern.test(regInputValues.email)){
        setRegErrors(regErrors => ({
            ...regErrors,
            email: false
        }))
    }else{
        setRegErrors(regErrors => ({
            ...regErrors,
            email: true
        }))
        setLoadingButton(false)
    }

    if(regInputValues.user.trim().length > 1){
        setRegErrors(regErrors => ({
            ...regErrors,
            user: false
        }))
    }else{
        setRegErrors(regErrors => ({
            ...regErrors,
            user: true
        }))
        setLoadingButton(false)
    }

    if(regInputValues.pw.trim().length > 7){
        setRegErrors(regErrors => ({
            ...regErrors,
            pw: false
        }))
    }else{
        setRegErrors(regErrors => ({
            ...regErrors,
            pw: true
        }))
        setLoadingButton(false)
    }

    if(day === 'Day' || month === 'Month' || year === 'Year'){
        setRegErrors(regErrors => ({
            ...regErrors,
            date: true
        }))
        setLoadingButton(false)
    }else{
        setRegErrors(regErrors => ({
            ...regErrors,
            date: false
        }))
    }

    const emailCount = await getCountFromServer(emailQuery);
    const usernameCount = await getCountFromServer(userNameQuery);

    if(emailCount.data().count === 1){
        setInvaildEmail(true)
    }else{
        setInvaildEmail(false)
    }

    if(usernameCount.data().count === 1){
        setInvalidUser(true)
    }else{
        setInvalidUser(false)
    }

    if(emailPattern.test(regInputValues.email) && regInputValues.user.trim().length > 1 && regInputValues.pw.trim().length > 7 && (day !== 'Day' && month !== 'Month' && year !== 'Year') && usernameCount.data().count !== 1 && emailCount.data().count !== 1){
        let thisDate = new Date()
        let birthDate = new Date(`${month}/${day}/${year}`)

        let difference = (thisDate.getTime() - birthDate.getTime()) / (60 * 60 * 24 * 1000);
        let years = Math.floor((difference/365.25))

        if(years < 13){
            setActiveDiv('too young')
            setLoadingButton(false)

            setRegErrors({
                email: false,
                pw: false,
                user: false,
                date: false
            })

            setRegInputValues({
                email: '',
                pw: '',
                user: '',
            })

            setDay('Day')
            setMonth('Month')
            setYear('Year')
        }else{
            let email = regInputValues.email
            let password = regInputValues.pw
            let displayName = regInputValues.user
            let photoURL = 'default'

            try{
                const res = await createUserWithEmailAndPassword(auth, email, password)

                await updateProfile(res.user, {
                    displayName,
                });

                await setDoc(doc(db, "users", displayName), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL,
                    friends: [],
                    chats: []
                });

                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    setLoadingButton(false)
                }catch(err){
                    console.log(err)
                }
            }catch(err){
                console.log(err)
            }
        }
    }else{
        setLoadingButton(false)
    }
}

return (
    <div className={activeDiv === 'reg' ? "w-[480px] h-[610px] rounded-main bg-main-gray text-white p-8 active" : "w-[480px] h-[610px] rounded-main bg-main-gray text-white p-8"}>
        <form onSubmit={handleRegSubmit}>
            <h1 className="font-semibold text-2xl text-center mb-2 leading-[30px]">Create an account</h1>
            <div className="mt-5">
                <RegInputs 
                    regErrors={regErrors}
                    regInputValues={regInputValues}
                    invalidEmail={invalidEmail}
                    invalidUser={invalidUser}
                    setRegInputValues={setRegInputValues}
                />

                <div>
                    <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="date">
                        DATE OF BIRTH
                        <span className='text-red pl-1'>{regErrors.date ? '- Date is invalid' : ''}</span>
                    </label>
                    
                    <div className="text-base w-full h-10 grid gap-2.5 grid-cols-dropdowns">
                        <DateDropdownBtn
                            setDateDropdown={setMonthDropdown}
                            setDate={setMonth}
                            dateDropdown={monthDropdown}
                            dates={months}
                            date={month}
                        />

                        <DateDropdownBtn
                            setDateDropdown={setDayDropdown}
                            setDate={setDay}
                            dateDropdown={dayDropdown}
                            dates={days}
                            date={day}
                        />

                        <DateDropdownBtn
                            setDateDropdown={setYearDropdown}
                            setDate={setYear}
                            dateDropdown={yearDropdown}
                            dates={years}
                            date={year}
                        />
                    </div>
                </div>

                <div className="flex items-center mr-2 mt-[25px] px-[1px]">
                    <div className="flex justify-center items-center w-[22px] h-[22px] relative rounded-md outline outline-border outline-1">
                        <input type="checkbox" name="checkbox" id="checkbox" className="cursor-pointer w-[22px] h-[22px] rounded-md relative before:w-full before:h-full before:bg-main-gray before:block before:rounded-md appearance-none" onClick={() => {setToggleCheckbox(true)}} checked={toggleCheckbox} readOnly/>
                        <div className="cursor-pointer absolute rounded-md w-[22px] h-[22px] z-10 pt-[2px] pl-[1.5px] bg-button-initial" onClick={() => {setToggleCheckbox(false)}} style={{ display: toggleCheckbox ? 'block' : 'none' }} >
                            <svg className="rounded-md" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
                        </div>
                    </div>
                    
                    <div className="text-xs">
                        <p onClick={() => {setToggleCheckbox(!toggleCheckbox)}} className="inline cursor-pointer pl-[9px] text-overlay-text">I have read and agree to Discord's </p>
                        <a className="text-link inline hover:underline" href="//discord.com/terms" rel="noreferrer noopener" target="_blank">Terms of Service</a>
                        <p onClick={() => {setToggleCheckbox(!toggleCheckbox)}} className="inline cursor-pointer text-overlay-text"> and </p>
                        <a className="text-link inline hover:underline" href="//discord.com/privacy" rel="noreferrer noopener" target="_blank">Privacy Policy</a>
                        <p className="inline">.</p>
                    </div>
                </div>

                <div className="flex items-center mr-2 mt-[9px] px-[1px]">
                    <div className="flex justify-center items-center w-[22px] h-[22px] relative rounded-md outline outline-border outline-1">
                        <input type="checkbox" name="checkbox" id="checkbox1" className="cursor-pointer w-[22px] h-[22px] rounded-md relative before:w-full before:h-full before:bg-main-gray before:block before:rounded-md appearance-none" onClick={() => {setToggleCheckbox1(true)}} checked={toggleCheckbox} readOnly/>
                        <div className="cursor-pointer absolute rounded-md w-[22px] h-[22px] z-10 pt-[2px] pl-[1.5px] bg-button-initial" onClick={() => {setToggleCheckbox1(false)}} style={{ display: toggleCheckbox1 ? 'block' : 'none' }} >
                            <svg className="rounded-md" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
                        </div>
                    </div>
                    
                    <p onClick={() => {setToggleCheckbox1(!toggleCheckbox1)}} className="cursor-pointer text-xs pl-[9px] text-gray-3">(Optional) It’s okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time.</p>
                </div>

                <button disabled={!toggleCheckbox} onClick={handleRegSubmit} className={toggleCheckbox ? 'main-btn active' : 'main-btn disabled hover:bg-button-initial group'} type="submit">
                    <div className='continue'>
                        {loadingButton ?
                        
                        <div className='flex'>
                            <div style={{ animationDelay: '0ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing'></div>
                            <div style={{ animationDelay: '100ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing mx-1'></div>
                            <div style={{ animationDelay: '200ms' }} className='w-[6px] h-[6px] bg-white rounded-full opacity-100 animate-pulsing'></div>
                        </div>
                        
                        :
                        'Continue'
                        }
                    </div>
                    <div className='w-[190px] h-[64px] bg-black-2 opacity-1 text-white bottom-[50px] absolute scale-0 group-hover:scale-100 text-sm px-3 py-2 leading-4 rounded-main transition-all duration-75'>
                        <div className='text-left'>
                            You need to agree to our terms of service to continue
                        </div>
                        <div className='relative top-[7px] left-20 w-[10px] border-transparent border-[5px] border-t-black-2'></div>
                    </div>
                </button>

                <div onClick={() => {setActiveDiv('log')}} className="text-link text-sm font-medium hover:underline cursor-pointer">Already have an account?</div>
            </div>
        </form>
    </div>
  )
}
