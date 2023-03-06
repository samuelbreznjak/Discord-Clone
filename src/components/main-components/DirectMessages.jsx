import React, { useRef, useEffect } from 'react'
import defaultpfp from '../../media/img/defaultpfp.png'
import { auth, db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'

export default function DirectMessages({ activeConversationName, activeConversationPfp, activeConversationButton, activeConverastionMessages, allUsers, friendshipState, handleProfileButton, dmInputValue, setDmInputValue }) {

const dummy = useRef()

useEffect(() => {
    dummy.current.scrollIntoView();
}, [activeConverastionMessages])

let sendConversationMessage = async (e) => {
e.preventDefault()

if(dmInputValue.trim() === ''){
    return
}

const { displayName } = auth.currentUser;
let users = [displayName, activeConversationName]
users.sort()

await addDoc(collection(db, `${users[0]}-${users[1]}`), {
    text: dmInputValue,
    createdAt: new Date(),
    displayName,
});

dummy.current.scrollIntoView({ behavior: 'smooth' });
setDmInputValue('');
}
  return (
    <>
        <div className='bg-main-gray px-2 min-h-[49px] border-b border-black flex items-center w-full'>
            <div className='h-6 mx-2'>
                <svg x="0" y="0" width="24" height="24" viewBox="0 0 24 24"><path fill="#8e9196" d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z"></path></svg>
            </div>
            <div className='mr-2 text-white'>
                <h1 className='font-semibold'>{activeConversationName}</h1>
            </div>
        </div> 

        <div className='bg-main-gray h-[calc(100%-117px)] pb-5 overflow-y-scroll chatbar text-overlay-text'>
            <div className='m-4 mb-6'>
            <div style={{ backgroundImage: `url(${activeConversationPfp === 'default' ? defaultpfp : activeConversationPfp})` }} className='h-20 w-20 rounded-full bg-center bg-cover'></div>
            <h3 className="text-white font-bold text-[32px] leading-10 mt-[7px] mb-[6px]" >{activeConversationName}</h3>
            <div className='text-secondary-gray'>
                This is the beginning of your direct message history with 
                <strong> @{activeConversationName}</strong>
            </div>
            <button onClick={(e) => {handleProfileButton(e, null, activeConversationName)}} className={activeConversationButton ? 'cursor-pointer mt-4 rounded-secondary px-4 py-0.5 min-w-[52px] min-h-6 text-white font-medium text-sm bg-button-initial hover:bg-button-hover transition-all' : 'opacity-50 cursor-not-allowed mt-4 rounded-secondary px-4 py-0.5 min-w-[52px] min-h-6 text-white font-medium text-sm bg-button-initial transition-all'} disabled={!activeConversationButton} type="button">{friendshipState}</button>
            </div>

            <div>
            {activeConverastionMessages.map(message => {
                let isSameSender, firstMessageDate;

                let newDay = false

                let thisIndex = activeConverastionMessages.indexOf(message)

                let currentDate = new Date()

                let messageDate = new Date(message.createdAt.seconds * 1000);

                let formattedTime = messageDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

                let dayDiff = currentDate.getDate() - messageDate.getDate()

                let newDayDateFormat = messageDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})

                let photoURL = allUsers.find(item => item.displayName === message.displayName).photoURL

                if(thisIndex === 0){
                isSameSender = false;
                newDay = true
                }else{
                isSameSender = (message.displayName === activeConverastionMessages[thisIndex - 1].displayName)

                if(new Date(message.createdAt.seconds * 1000).getDay() !== new Date(activeConverastionMessages[thisIndex - 1].createdAt.seconds * 1000).getDay()){
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
                
                return(
                <div key={crypto.randomUUID()}>
                    {newDay ? 
                    <div key={crypto.randomUUID()} className='flex justify-center text-xs font-semibold text-gray-14 relative px-4 mt-[17px]'>
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
                        <button key={crypto.randomUUID()} className='pt-1 btn msgbtn h-max'>
                        <div key={crypto.randomUUID()} style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})` }} className='bg-center msgbtn btn bg-cover h-10 rounded-full'></div>
                        </button>
                        <div key={crypto.randomUUID()} className='flex flex-col min-h-[44px]'>
                        <div className='flex items-center'>
                            <button key={crypto.randomUUID()} className='btn msgbtn font-medium leading-[22px] mr-1.5 text-white w-min'>{message.displayName}</button>
                            <p className='font-medium text-xs m400:text-[10px] text-gray-14 leading-[22px]'>{firstMessageDate}</p>
                        </div>
                        <p key={crypto.randomUUID()} className='leading-[22px] break-words'>{message.text}</p>
                        </div>
                    </div>
                    </div>
                    }
                </div>
            )})}
            <span ref={dummy}></span>
            </div>
            
        </div>
        <div className='w-full h-[68px] bg-main-gray pb-6 px-4 z-10'>
            <form onSubmit={sendConversationMessage} className='h-full'>
            <input value={dmInputValue} onChange={(e) => setDmInputValue(e.target.value)} className='bg-gray-10 w-full h-full rounded-lg px-4 outline-none text-overlay-text' placeholder={`Message @${activeConversationName}`} type="text" />
            </form>
        </div>
    </>
  )
}
