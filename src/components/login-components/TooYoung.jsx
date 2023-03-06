import React from 'react'
import illustration from '../../media/img/13.png'

export default function TooYoung({ activeDiv, setActiveDiv }) {

  return (
    <div className={activeDiv === 'too young' ? "w-[480px] regform:px-4 min-h-[395px] rounded-main bg-main-gray text-white p-8 active" : "w-[480px] h-[395px] rounded-main bg-main-gray text-white p-8"}>
        <img className='mx-auto mb-5' src={illustration} alt="13" />

        <h1 className="font-semibold text-2xl text-center mb-2 mt-[23px] leading-[30px]">Unable to register</h1>

        <div className='mb-6 text-secondary-gray leading-5 text-center'>
            You must be at least 13 years old to use Discord.  
            <a className='text-link' href="https://support.discord.com/hc/en-us/articles/360040724612" rel="noreferrer noopener" target="_blank"> View our help article</a> to learn more.
        </div>

        <button onClick={() => {setActiveDiv('log')}} className="relative text-white flex items-center justify-center w-full bg-button-initial hover:bg-button-hover ease-linear duration-150 font-medium text-sm rounded-secondary leading-[16px] min-w-[130px] h-[38[x]] min-h-[38px]" type="button">
            <div>Back to Login</div>
        </button>
    </div>
  )
}
