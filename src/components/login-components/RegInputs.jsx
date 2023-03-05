import React from 'react'

export default function RegInputs({ regErrors, regInputValues, setRegInputValues, invalidEmail, invalidUser }) {
let handleRegInput = (input) => {
    switch(input.target.id){
        case 'email2':
            setRegInputValues(regInputValues => ({
                ...regInputValues,
                email: input.target.value
            }))
        break;

        case 'password2':
            setRegInputValues(regInputValues => ({
                ...regInputValues,
                pw: input.target.value
            }))
        break;

        case 'username':
            setRegInputValues(regInputValues => ({
                ...regInputValues,
                user: input.target.value
            }))
        break;

        default: 
            break;
    }
}

  return (
    <>
        <div className="mb-5">
            <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="email2">
                EMAIL
                <span className='text-red pl-1'>
                    {regErrors.email ? '- Email is invalid' : ''}
                    {invalidEmail ? '- Email is already in use' : ''}
                </span>
            </label>
            
            <div>
                <input value={regInputValues.email} onChange={handleRegInput} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" type="email" name="email" id="email2" />
            </div>
        </div>

        <div className="mb-5">
            <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="username">
                USERNAME
                <span className='text-red pl-1'>
                    {regErrors.user ? '- Must be at least 2 characters long' : ''}
                    {invalidUser ? '- This username already exists' : ''}
                </span>
            </label>
            
            <div>
                <input value={regInputValues.user} onChange={handleRegInput} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" type="username" name="username" id="username" />
            </div>
        </div>
        <div className="mb-5">
            <label className="leading-[16px] tracking-wide mb-2 text-xs font-bold text-secondary-gray block" htmlFor="password2">
                PASSWORD
                <span className='text-red pl-1'>{regErrors.pw ? '- Must be at least 8 characters long' : ''}</span>
            </label>
            
            <div>
                <input value={regInputValues.pw} onChange={handleRegInput} className="bg-black focus:outline-none rounded-secondary text-base w-full h-10 p-2.5" type="password" name="password" id="password2" />
            </div>
        </div>
    </>
  )
}
