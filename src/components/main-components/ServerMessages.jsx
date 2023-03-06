import React, { useEffect, useRef, useState } from 'react'
import defaultpfp from '../../media/img/defaultpfp.png'
import { auth, db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'
import useMatchMedia from 'react-use-match-media';

export default function ServerMessages({ activeChannelName, activeChannelMessages, allUsers, myName, setActiveMessageButtonId, serverInputValue, setServerInputValue, messageButton, setMessageButton, hideMessageButton, activeMessageButtonId, initialPendingRequests, intitialAllFriends, handleProfileButton, handleSendMessageButton }) {

const dummy = useRef()
const isViewportSmall = useMatchMedia('(max-width: 450px)');

useEffect(() => {
    dummy.current.scrollIntoView();
}, [activeChannelMessages])

const [messageButtonXPosition, setMessageButtonXPosition] = useState('152px')
const [messageButtonYPosition, setMessageButtonYPosition] = useState('0px')

let handleMessageButton = (e, btn, id) => {
e.preventDefault()

let rect = e.target.getBoundingClientRect();

if(btn === 'pfp'){
    if(e.target.parentElement.nextElementSibling.children[0].children[0].innerText === myName){
        return
    }

    setMessageButtonXPosition('55px')

    if((window.innerHeight - rect.top) < 150){
        let diff = 146 - (window.innerHeight - rect.top)
        setMessageButtonYPosition(`-${diff}px`)
    }else{
        setMessageButtonYPosition('0px')
    }

}else{
    if(e.target.innerText === myName){
        return
    }

    if((window.innerHeight - rect.top) < 150){
        let diff = 150 - (window.innerHeight - rect.top)
        setMessageButtonYPosition(`-${diff}px`)
    }else{
        setMessageButtonYPosition('0px')
    }

    let buttonLeft = e.target.offsetWidth + 63
    setMessageButtonXPosition(`${buttonLeft}px`)
}

setActiveMessageButtonId('x')
setActiveMessageButtonId(id)
setMessageButton(!messageButton)
}

let sendServerMessage = async (e) => {
    e.preventDefault()

    if(serverInputValue.trim() === ''){
        return
    }

    const { displayName } = auth.currentUser;

    await addDoc(collection(db, activeChannelName), {
    text: serverInputValue,
    createdAt: new Date(),
    displayName,
    });

    dummy.current.scrollIntoView({ behavior: 'smooth' });
    setServerInputValue('');
}

  return (
    <div className='h-full'>
        <div className='bg-main-gray h-[calc(100vh-117px)] pb-5 overflow-y-scroll chatbar text-overlay-text'>
            <div className='m-4 mb-6'>
                <div className='h-[68px] w-[68px] rounded-full bg-gray-12 flex items-center justify-center'>
                    <svg width="44" height="44" viewBox="0 0 24 24" x="0" y="0" aria-hidden="true" role="img"><path fill="white" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
                </div>
                <h3 className="text-white font-bold text-[32px] leading-10 mt-[7px] mb-[6px]" >Welcome to #{activeChannelName}!</h3>
                <div className='text-secondary-gray'>
                    This is the start of the #{activeChannelName} channel. 
                </div>
            </div>

            <div>
                {activeChannelMessages && activeChannelMessages.map(message => {
                let isSameSender, firstMessageDate, btnText;

                let newDay = false

                let thisIndex = activeChannelMessages.indexOf(message)

                let currentDate = new Date()

                let messageDate = new Date(message.createdAt.seconds * 1000);

                let formattedTime = messageDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

                let dayDiff = currentDate.getDate() - messageDate.getDate()
                let monthDIff = currentDate.getMonth() - messageDate.getMonth()
                let yearDiff = currentDate.getFullYear() - messageDate.getFullYear()

                if(yearDiff > 0 || monthDIff > 0){
                    dayDiff += 50;
                }

                let newDayDateFormat = messageDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})

                let photoURL = allUsers.find(item => item.displayName === message.displayName).photoURL

                if(thisIndex === 0){
                    isSameSender = false;
                    newDay = true
                }else{
                    isSameSender = (message.displayName === activeChannelMessages[thisIndex - 1].displayName)

                    if(new Date(message.createdAt.seconds * 1000).getDay() !== new Date(activeChannelMessages[thisIndex - 1].createdAt.seconds * 1000).getDay()){
                    newDay = true
                    }
                }

                if(dayDiff === 0){
                    firstMessageDate = 'Today at ' + formattedTime
                }else if(dayDiff === 1){
                    firstMessageDate = 'Yesterday at ' + formattedTime
                }else if(dayDiff > 1){
                    firstMessageDate = messageDate.toLocaleDateString("en-US") + ' ' + formattedTime
                }else{
                    firstMessageDate = formattedTime
                }

                if(initialPendingRequests.filter(req => req.displayName === message.displayName).length > 0){
                    if(initialPendingRequests.find(req => req.displayName === message.displayName).incoming === true){
                    btnText = 'Accept friend request'
                    }else{
                    btnText = 'Cancel friend request'
                    }
                }else if(intitialAllFriends.includes(message.displayName)){
                    btnText = 'Unfriend'
                }else{
                    btnText = 'Add friend'
                }
                
                return(
                    <div key={crypto.randomUUID()}>
                    {newDay ? 
                    <div key={crypto.randomUUID()} className='flex justify-center text-xs font-semibold text-gray-14 relative m400:px-2 px-4 mt-[17px]'>
                        <p key={crypto.randomUUID()} className='z-10 px-2 py-px bg-main-gray'>{newDayDateFormat}</p>
                        <div key={crypto.randomUUID()} className='w-[calc(100%-32px)] bg-gray-10 h-px absolute top-2'></div>
                    </div> 
                    : null}

                    {isSameSender && !newDay ? 
                    <div key={crypto.randomUUID()} className='px-4 m400:px-2 py-1 hover:bg-gray-11 group'>
                        <div key={crypto.randomUUID()} className='grid grid-cols-message m400:gap-2 gap-4'>
                            <div key={crypto.randomUUID()}>
                                <div key={crypto.randomUUID()} className="text-center text-gray-14 m400:text-[10px] text-[11px] font-medium tracking-tighter flex items-center justify-center">
                                <p className='leading-[22px] hidden group-hover:inline'>{formattedTime}</p>
                                </div>
                            </div>
                            <div key={crypto.randomUUID()} className='flex flex-col'>
                                <p key={crypto.randomUUID()} className='leading-[22px] break-words'>{message.text}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div key={crypto.randomUUID()} className='px-4 m400:px-2 mt-[17px] py-1 hover:bg-gray-11'>
                        <div key={crypto.randomUUID()} className='grid grid-cols-message m400:gap-2 gap-4 relative'>
                            <button onClick={e => {handleMessageButton(e, 'pfp', thisIndex)}} onBlur={hideMessageButton} key={crypto.randomUUID()} className='pt-1 btn msgbtn h-max'>
                                <div key={crypto.randomUUID()} style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})` }} className='bg-center msgbtn btn bg-cover h-10 rounded-full'></div>
                            </button>
                            <div key={crypto.randomUUID()} className='flex flex-col min-h-[44px]'>
                                <div className='flex items-center'>
                                <button disabled={isViewportSmall} onClick={e => {handleMessageButton(e, 'username', thisIndex)}} onBlur={hideMessageButton} key={crypto.randomUUID()} className='btn msgbtn font-medium leading-[22px] mr-1.5 text-white w-min m400:text-sm hover:underline'>{message.displayName}</button>
                                <p className='font-medium text-xs text-gray-14 m400:text-[10px] leading-[22px]'>{firstMessageDate}</p>
                                </div>
                                <p key={crypto.randomUUID()} className='leading-[22px] break-words'>{message.text}</p>
                            </div>

                            <div style={{ left: `${messageButtonXPosition}`, top: `${messageButtonYPosition}`}} className={messageButton && activeMessageButtonId === thisIndex ? 'absolute flex-col flex w-max text-sm font-medium bg-black p-2 z-20 rounded-md' : 'hidden'}>
                                <button onClick={(e) => {handleProfileButton(e, btnText, message.displayName)}} className='rounded-secondary text-left hover:bg-blue px-3 py-1.5'>{btnText}</button>
                                <button onClick={() => {handleSendMessageButton(message.displayName)}} className='rounded-secondary text-left hover:bg-blue px-3 py-1.5'>Send message</button>
                            </div>
                        </div>
                    </div>
                    }
                    </div>
                )
                })}
                <span ref={dummy}></span>
            </div>

        </div>
        <div className='w-full h-[68px] bg-main-gray pb-6 px-4 z-10'>
            <form onSubmit={sendServerMessage} className='h-full'>
                <input value={serverInputValue} onChange={(e) => setServerInputValue(e.target.value)} className='bg-gray-10 w-full h-full rounded-lg px-4 outline-none text-overlay-text' placeholder={`Message #${activeChannelName}`} type="text" />
            </form>
        </div>
    </div>
  )
}
