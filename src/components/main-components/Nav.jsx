import React from 'react'

export default function Nav({ activeDiv, toggleServerMemberList, setToggleServerMemberList, setActiveFriendsSection, activeFriendsSection, activeChannelName }) {
  return (
    <>
        {activeDiv === 'friends'
            ?
            <div className='bg-main-gray px-2 min-h-[49px] border-b border-black flex items-center w-full'>
                <div className='h-6 mx-2 m600:hidden'>
                    <svg x="0" y="0" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path fill="#8e9196" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>
                </div>
                <div className='mr-2 text-white m600:hidden'>
                    <h1 className='font-semibold'>Friends</h1>
                </div>
                <div className='bg-gray-7 w-px h-6 mx-2 m600:hidden'></div>
                <div className='flex h-6 m500:text-xs'>
                    <div onClick={() => {setActiveFriendsSection('all')}} className={activeFriendsSection === 'all' ? 'bg-gray-9 text-white font-medium justify-center items-center rounded mx-2 py-0.5 px-2 flex select-none' : 'hover:bg-gray-9 hover:text-white text-gray-3 font-medium flex justify-center items-center rounded mx-2 py-0.5 px-2 cursor-pointer'}>All</div>
                    <div onClick={() => {setActiveFriendsSection('pending')}} className={activeFriendsSection === 'pending' ? 'bg-gray-9 text-white font-medium justify-center items-center rounded mx-2 py-0.5 px-2 flex select-none' : 'hover:bg-gray-9 hover:text-white text-gray-3 font-medium flex justify-center items-center rounded mx-2 py-0.5 px-2 cursor-pointer'}>Pending</div>
                    <div onClick={() => {setActiveFriendsSection('add friend')}} className={activeFriendsSection === 'add friend' ? 'text-green-3 font-medium justify-center items-center rounded mx-2 py-0.5 px-2 flex select-none' : 'bg-green-2 text-white flex font-medium justify-center items-center rounded mx-2 py-0.5 px-2 cursor-pointer'}>Add friend</div>
                </div>
            </div>
            :
            <div className='bg-main-gray px-2 min-h-[49px] border-b border-black flex items-center justify-between w-full'>
                <div className='h-6 mx-2 flex items-center'>
                    <svg width="24" height="24" viewBox="0 0 24 24" x="0" y="0" aria-hidden="true" role="img"><path fill="#8e9196" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
                    <h1 className='font-semibold ml-2 text-white'>{activeChannelName}</h1>
                </div>
                <button className='group mr-2 relative m750:hidden' onClick={() => {setToggleServerMemberList(!toggleServerMemberList)}}>
                    <div className='relative'>
                        <svg x="0" y="0" className="icon-2xnN2Y" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path className={toggleServerMemberList ? 'fill-white' : 'fill-gray-3 group-hover:fill-white'} fillRule="evenodd" clipRule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path><path className={toggleServerMemberList ? 'fill-white' : 'fill-gray-3 group-hover:fill-white'} fillRule="evenodd" clipRule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path><path className={toggleServerMemberList ? 'fill-white' : 'fill-gray-3 group-hover:fill-white'} d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"></path><path className={toggleServerMemberList ? 'fill-white' : 'fill-gray-3 group-hover:fill-white'} d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"></path></svg>
                        <div className='absolute top-7 left-[-105px] scale-0 z-10 group-hover:scale-100 hover:hidden transition-all duration-75'>
                            <div className='bottom-12 w-auto px-3 py-2 m-2 min-w-max rounded-md shadow-md text-overlay-text bg-black text-sm font-semibold'>
                            {toggleServerMemberList ? 'Hide member list' : 'Show member list'}
                            </div>
                            <div className='relative left-[110px] bottom-[53px] w-[10px] border-transparent border-[5px] border-b-black'></div>
                        </div>
                    </div>
                </button>
            </div>
        }
    </>
  )
}
