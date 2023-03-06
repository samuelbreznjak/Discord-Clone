import React, { useState } from 'react'
import defaultpfp from '../../media/img/defaultpfp.png'

export default function UsersSidebar({ toggleServerMemberList, allUsers, initialPendingRequests, intitialAllFriends, myName, setActiveUserButtonId, activeUserButtonId, setUserButton, userButton, handleProfileButton, handleSendMessageButton }) {

const [userButtonTopPosition, setUserButtonTopPosition] = useState('0px')
const [userButtonBottomPosition, setUserButtonBottomPosition] = useState('unset')

let handleUserButton = (e, id) => {
e.preventDefault()

let username = e.target.getAttribute('data-username')
let rect;

if(username === myName){
    return
}

if(e.target.classList.contains('userbtnp')){
    rect = e.target.parentElement.parentElement.getBoundingClientRect().top;
}else if(e.target.classList.contains('userbtndiv')){
    rect = e.target.parentElement.getBoundingClientRect().top;
}else{
    rect = e.target.getBoundingClientRect().top;
}

if((window.innerHeight - rect) < 80){
    setUserButtonTopPosition('unset')
    setUserButtonBottomPosition(`0px`)
}else{
    setUserButtonBottomPosition('unset')
    setUserButtonTopPosition(`${rect - 49}px`)
}

setActiveUserButtonId('x')
setActiveUserButtonId(id)
setUserButton(!userButton)
}

  return (
    <div className={toggleServerMemberList ? 'bg-gray-4 relative min-h-[calc(100vh-49px)] max-h-[calc(100vh-49px)] m750:hidden' : 'hidden'}>
        <div className='overflow-y-scroll dropdownscrollbar pb-6 h-full'>
            <h3 className='text-gray-13 font-semibold text-xs p-siderbar tracking-[0.02em] mb-px'>
                MEMBERS — {allUsers.length}
            </h3>

            <div>
                {allUsers.map(item => {
                let thisIndex = allUsers.indexOf(item)
                let username = item.displayName
                let btnText;

                if(initialPendingRequests.filter(req => req.displayName === item.displayName).length > 0){
                    if(initialPendingRequests.find(req => req.displayName === item.displayName).incoming === true){
                    btnText = 'Accept friend request'
                    }else{
                    btnText = 'Cancel friend request'
                    }
                }else if(intitialAllFriends.includes(item.displayName)){
                    btnText = 'Unfriend'
                }else{
                    btnText = 'Add friend'
                }

                return(
                    <button data-username={username} onClick={e => {handleUserButton(e, thisIndex)}} key={crypto.randomUUID()} className='ml-2 userbtn btn px-2 h-[42px] flex items-center rounded hover:bg-gray-5 group min-w-[224px] m1000:min-w-[130px] m1000:max-w-[130px] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer'>
                        <div data-username={username} key={crypto.randomUUID()} style={{ backgroundImage: `url(${item.photoURL === 'default' ? defaultpfp : item.photoURL})` }} className='w-8 h-8 userbtn btn rounded-full bg-center bg-cover mr-3 userbtndiv'></div>
                        <div data-username={username} key={crypto.randomUUID()} className='whitespace-nowrap btn max-w-[70px] overflow-ellipsis overflow-hidden userbtn userbtndiv'>
                            <p data-username={username} key={crypto.randomUUID()} className='font-semibold btn text-base text-gray-13 group-hover:text-overlay-text userbtn userbtnp'>{item.displayName}</p>
                        </div>

                        <div style={{ top: `${userButtonTopPosition}`, bottom: `${userButtonBottomPosition}`}}  className={userButton && activeUserButtonId === thisIndex ? 'text-white absolute top-0 h-20 flex-col flex right-[246px] m1000:right-[156px] w-max text-sm font-medium bg-black p-2 z-20 rounded-md' : 'hidden'}>
                            <div onClick={(e) => {handleProfileButton(e, btnText, username)}} className='rounded-secondary text-left hover:bg-blue px-3 py-1.5'>{btnText}</div>
                            <div onClick={() => {handleSendMessageButton(username)}} className='rounded-secondary text-left hover:bg-blue px-3 py-1.5'>Send message</div>
                        </div>
                    </button>
                )
                })}
            </div>
        </div>
    </div>
  )
}
