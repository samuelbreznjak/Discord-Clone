import React, { useState } from 'react'
import all from '../../media/img/wumpusall.png'
import defaultpfp from '../../media/img/defaultpfp.png'
import notfound from '../../media/img/wumpusnotfound.png'

export default function AllFriendsSection({ intitialAllFriends, allUsers, setAllFriends, allFriends, setActiveFriendsSection, handleSendMessageButton, unfriendButton }) {

const [allFriendsSearchValue, setAllFriendsSearchValue] = useState('')
const [allFriendsSearch, setAllFriendsSearch] = useState(false)

let handleSearch = (e) => {
    setAllFriendsSearchValue(e.target.value)

    setAllFriends(intitialAllFriends.filter(friend => {
        return friend.includes(e.target.value.trim())
    }))

    if(e.target.value !== ''){
        setAllFriendsSearch(true)
    }else{
        setAllFriendsSearch(false)
        setAllFriends(intitialAllFriends)
    }
}

let clearSearch = () => {
    setAllFriendsSearchValue('')
    setAllFriendsSearch(false)
    setAllFriends(intitialAllFriends)
}

  return (
    <div className='h-full'>
        {intitialAllFriends.length === 0 ? 
            <div className='h-full flex flex-col justify-center items-center'>
                <img className='mb-12 m900:w-[260px] m900:mb-6 m600:hidden' src={`${all}`} alt="wumpus" />
                <p className='text-gray-3 text-center mx-2'>Wumpus is waiting on friends. You don’t have to though!</p>
                <button onClick={() => {setActiveFriendsSection('add friend')}} className='mt-5 bg-button-initial text-white font-medium text-sm rounded-secondary py-[9px] px-4 transition-all hover:bg-button-hover ease-linear' type='button'>Add Friend</button>
            </div>
            : 
            <div className='h-full pr-5 flex flex-col relative'>
                <div className='flex flex-none mt-[15px] m550:pl-[15px] pl-[30px]'>
                    <div className='flex w-full p-px bg-black rounded-secondary items-center'>
                        <input value={allFriendsSearchValue} onChange={handleSearch} autoComplete="off" className='w-full text-base leading-8 h-[30px] px-[9px] bg-transparent focus:outline-none text-overlay-text' type="text" name="friendssearch" id="friendssearch" placeholder='Search'/>
                        <div className='w-8 h-8 flex justify-center items-center relative'>
                            <div className='w-5 h-5'>
                            <svg onClick={clearSearch} className={!allFriendsSearch ? 'absolute rotate-90 opacity-0 transition-all duration-100' : 'absolute rotate-0 opacity-100 transition-all duration-100 z-10 cursor-pointer'} width="20" height="20" viewBox="0 0 24 24"><path fill="#dcddde" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                            <svg className={allFriendsSearch ? 'absolute rotate-90 opacity-0 transition-all duration-100' : 'absolute rotate-0 opacity-100 transition-all duration-100 z-10'} width="20" height="20" viewBox="0 0 24 24"><path fill="#dcddde" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-6 m550:pl-[15px] pl-[30px]'>
                    <h2 className='text-secondary-gray font-semibold text-xs tracking-[0.02em]'>ALL FRIENDS — {allFriends.length}</h2>
                </div>
                <div className='mt-4 h-[90%] mb-3 pb-3 overflow-y-scroll overflow-x-hidden chatbar m550:pl-[15px] pl-[30px]'>
                    {allFriends.map(friend => {
                    let photoURL = allUsers.find(item => item.displayName === friend).photoURL

                    return(
                        <div key={crypto.randomUUID()} className='h-[62px] rounded-lg before:w-[calc(100%-20px)] before:h-px before:bg-gray-7 before:absolute before:top-0 flex items-center justify-between relative mt-[-1px] right-[10px] px-[10px] hover:bg-gray-7 group/div cursor-pointer'>
                            <div key={crypto.randomUUID()} className='flex items-center'>
                                <div key={crypto.randomUUID()} style={{ backgroundImage: `url(${photoURL === 'default' ? defaultpfp : photoURL})` }} className='w-8 h-8 rounded-full bg-center bg-cover mr-3'></div>
                                <p key={crypto.randomUUID()} className='font-semibold text-white text-ellipsis whitespace-nowrap overflow-hidden m400:max-w-[30px] m550:text-xs'>{friend}</p>
                            </div>

                            <div key={crypto.randomUUID()} className='flex items-center'>
                                <button onClick={() => {handleSendMessageButton(friend)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center'>
                                <svg key={crypto.randomUUID()} role="img" width="20" height="20" viewBox="0 0 24 24" fill="none"><path className='fill-gray-3 group-hover:fill-white' d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg>
                                </button>
                                <button onClick={() => {unfriendButton(friend)}} key={crypto.randomUUID()} className='group-hover/div:bg-black group w-9 h-9 bg-gray-4 rounded-full flex justify-center items-center ml-[10px]'>
                                <svg key={crypto.randomUUID()} width="20" height="20" viewBox="0 0 24 24"><path className='fill-gray-3 group-hover:fill-red' d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                                </button>
                            </div>
                        </div>
                    )
                    })}

                    {allFriends.length === 0 ? 

                    <div className='h-full flex flex-col items-center justify-center'>
                        <img className='mb-10 m900:w-[260px] m900:mb-7 m600:hidden' src={`${notfound}`} alt="" />
                        <div>
                            <div className='mt-2 text-gray-3 text-center mx-2'>Wumpus looked, but couldn’t find anyone with that name.</div>
                        </div>
                    </div>
                    
                    : null}
                </div>
            </div>
        }
    </div>
  )
}
