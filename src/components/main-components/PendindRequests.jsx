import React, { useState } from 'react'
import pending from '../../media/img/wumpuspending.png'
import defaultpfp from '../../media/img/defaultpfp.png'
import notfound from '../../media/img/wumpusnotfound.png'

export default function PendindRequests({ initialPendingRequests, pendingRequests, allUsers, handleRequestButton, setPendingRequests }) {

const [pendingSearch, setPendingSearch] = useState(false)
const [pendingSearchValue, setPendingSearchValue] = useState('')

let handleSearch = (e) => {
    setPendingSearchValue(e.target.value)
    setPendingRequests(initialPendingRequests.filter(friend => {
        return friend.displayName.includes(e.target.value.trim())
    }))

    if(e.target.value !== ''){
        setPendingSearch(true)
    }else{
        setPendingSearch(false)
        setPendingRequests(initialPendingRequests)
    }
}

let clearSearch = () => {
    setPendingSearchValue('')
    setPendingSearch(false)
    setPendingRequests(initialPendingRequests)
}

  return (
    <div className='h-full'>
        {initialPendingRequests.length === 0 ? 
            <div className='h-full flex flex-col justify-center items-center'>
            <img className='mb-12' src={`${pending}`} alt="wumpus" />
            <p className='text-gray-3'>There are no pending requests. Here's Wumpus for now.</p>
            </div>
            : 
            
            <div className='h-full pr-5 flex flex-col relative'>
            <div className='flex flex-none mt-[15px] pl-[30px]'>
                <div className='flex w-full p-px bg-black rounded-secondary items-center'>
                <input value={pendingSearchValue} onChange={handleSearch} autoComplete="off" className='w-full text-base leading-8 h-[30px] px-[9px] bg-transparent focus:outline-none text-overlay-text' type="text" name="friendssearch" id="pendingsearch" placeholder='Search'/>
                <div className='w-8 h-8 flex justify-center items-center relative'>
                    <div className='w-5 h-5'>
                    <svg onClick={clearSearch} className={!pendingSearch ? 'absolute rotate-90 opacity-0 transition-all duration-100' : 'absolute rotate-0 opacity-100 transition-all duration-100 z-10 cursor-pointer'} width="20" height="20" viewBox="0 0 24 24"><path fill="#dcddde" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                    <svg className={pendingSearch ? 'absolute rotate-90 opacity-0 transition-all duration-100' : 'absolute rotate-0 opacity-100 transition-all duration-100 z-10'} width="20" height="20" viewBox="0 0 24 24"><path fill="#dcddde" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path></svg>
                    </div>
                </div>
                </div>
            </div>

            <div className='mt-6 pl-[30px]'>
                <h2 className='text-secondary-gray font-semibold text-xs tracking-[0.02em]'>PENDING — {pendingRequests.length}</h2>
            </div>

            <div className='mt-4 h-[90%] mb-3 pb-3 overflow-y-scroll overflow-x-hidden chatbar pl-[30px]'>
                {pendingRequests.map(request => {
                let photoURL = allUsers.find(item => item.displayName === request.displayName).photoURL

                return(
                    <div key={crypto.randomUUID()} className='h-[62px] rounded-lg before:w-[calc(100%-20px)] before:h-px before:bg-gray-7 before:absolute before:top-0 flex items-center justify-between relative mt-[-1px] right-[10px] px-[10px] hover:bg-gray-7 group/div cursor-pointer'>
                    <div key={crypto.randomUUID()} className='flex items-center'>
                        <div key={crypto.randomUUID()} style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})` }} className='w-8 h-8 rounded-full bg-center bg-cover mr-3'></div>
                        <div key={crypto.randomUUID()} className='flex flex-col'>
                        <p key={crypto.randomUUID()} className='font-semibold text-white leading-5'>{request.displayName}</p>
                        <p key={crypto.randomUUID()} className='font-medium text-xs text-secondary-gray'>{request.incoming ? 'Incoming Friend Request' : 'Outgoing Friend Request'}</p>
                        </div>
                    </div>

                    <div key={crypto.randomUUID()} className='flex items-center relative'>
                        {request.incoming ?
                        <>
                        <button onClick={() => {handleRequestButton('accept', request.displayName)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center'>
                            <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-green' fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
                        </button>
                        <button onClick={() => {handleRequestButton('decline', request.displayName)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center ml-[10px]'>
                            <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-red' d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                        </button>
                        </>
                        :
                        <button onClick={() => {handleRequestButton('decline', request.displayName)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center ml-[10px]'>
                        <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-red' d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                        </button>
                        }
                    </div>
                    </div>
                )
                })}

                {pendingRequests.length === 0 ? 

                <div className='h-full flex flex-col items-center justify-center'>
                    <img className='mb-10' src={`${notfound}`} alt="" />
                    <div>
                        <div className='mt-2 text-gray-3'>Wumpus looked, but couldn’t find anyone with that name.</div>
                    </div>
                </div>
                
                : null}
            </div>
            </div>
        }
    </div>
  )
}
