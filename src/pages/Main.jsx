import React, { useState, useEffect } from 'react'
import defaultpfp from '../media/img/defaultpfp.png'
import logo from '../media/img/discordlogo.png'
import { auth, db } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import MainNav from '../components/main-components/MainNav';
import DmLeftSidebar from '../components/main-components/DmLeftSidebar'
import AllFriends from '../components/main-components/AllFriends'
import PendindRequests from '../components/main-components/PendindRequests'
import AddFriend from '../components/main-components/AddFriend'
import DirectMessages from '../components/main-components/DirectMessages';
import ServerLeftSidebar from '../components/main-components/ServerLeftSidebar';
import ServerMessages from '../components/main-components/ServerMessages';
import UsersSidebar from '../components/main-components/UsersSidebar';
import Nav from '../components/main-components/Nav';
import { Helmet } from 'react-helmet';

export default function Main() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/')
      }else{
        setTimeout(() => {
          setMyName(user.displayName)
          fetchPendingRequests(user.displayName)
          fetchFriends(user.displayName)

          if(user.photoURL === null){
            setMypfp(defaultpfp)
          }else{
            setMypfp(user.photoURL)
          }

          setTimeout(() => {
            setLoadingDiv(false)
          }, [1000]);
        }, [1000])
      }
    });
    fetchUsers()
    fetchServerMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate();

  const [activeNavButton, setActiveNavButton] = useState('dm')
  const [activeDmButton, setActiveDmButton] = useState('friends')
  const [activeDmDiv, setActiveDmDiv] = useState('friends')
  const [activeFriendsSection, setActiveFriendsSection] = useState('all')

  const [activeDiv, setActiveDiv] = useState('dm')
  const [activeChannelName, setActiveChannelName] = useState('channel1')
  const [activeConversationName, setActiveConversationName] = useState('')

  const [myPfp, setMypfp] = useState('')
  const [myName, setMyName] = useState('')

  const [intitialAllFriends, setInitialAllFriends] = useState([])
  const [initialPendingRequests, setInitialPendingRequests] = useState([])

  const [allChats, setAllChats] = useState([])
  const [allFriends, setAllFriends] = useState(intitialAllFriends)
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests)

  const [activeConversationPfp, setActiveConversationPfp] = useState('')
  const [activeConverastionMessages, setActiveConversationMessages] = useState([])

  const [channel1, setChannel1] = useState([]);
  const [channel2, setChannel2] = useState([]);
  const [channel3, setChannel3] = useState([]);

  const [activeChannelMessages, setActiveChannelMessages] = useState(channel1)
  const [toggleServerMemberList, setToggleServerMemberList] = useState(false)
  const [allUsers, setAllUsers] = useState([])

  const [serverInputValue, setServerInputValue] = useState('')
  const [dmInputValue, setDmInputValue] = useState('')

  const [messageButton, setMessageButton] = useState(false)
  const [activeMessageButtonId, setActiveMessageButtonId] = useState('')

  const [userButton, setUserButton] = useState(false)
  const [activeUserButtonId, setActiveUserButtonId] = useState('')

  const [friendshipState, setFriendshipState] = useState('Add Friend')
  const [activeConversationButton, setActiveConversationButton] = useState(true)

  const [loadingDiv, setLoadingDiv] = useState(true)

  let fetchUsers = async () => {
    const unsub = onSnapshot(query(collection(db, 'users')), (querySnapshot) => {
      let users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setAllUsers(users)
    })

    return () => {
      unsub()
    }
  }

  let fetchServerMessages = () => {
    const q1 = query(collection(db, 'channel1'), orderBy('createdAt'))
    const q2 = query(collection(db, 'channel2'), orderBy('createdAt'))
    const q3 = query(collection(db, 'channel3'), orderBy('createdAt'))

    const unsub3 = onSnapshot(q3, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setChannel3(messages)
      setActiveChannelMessages(messages)
    });

    const unsub2 = onSnapshot(q2, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setChannel2(messages)
      setActiveChannelMessages(messages)
    });

    const unsub1 = onSnapshot(q1, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setChannel1(messages)
      setActiveChannelMessages(messages)
    });

    return () => { 
      unsub1()
      unsub2()
      unsub3()
    }
  }

  let fetchPendingRequests = (username) => {
    const requestsQuery = query(collection(db, `users/${username}/requests`))

    const unsub = onSnapshot(requestsQuery, (querySnapshot) => {
      let requests = []
      querySnapshot.forEach((doc) => {
        requests.push(doc.data());
      });
      setInitialPendingRequests(requests)
      setPendingRequests(requests)
    });

    return () => {
      unsub()
    }
  }

  let fetchFriends = async (username) => {
    const unsub = onSnapshot(doc(db, "users", `${username}`), (doc) => {
      setInitialAllFriends(doc.data().friends)
      setAllFriends(doc.data().friends)
      setAllChats(doc.data().chats)
    });

    return () => { 
      unsub()
    }
  }

  let handleDmButton = async (btn) => {
    setActiveDmButton(btn)
    setActiveConversationButton(true)
    setDmInputValue('')

    if(btn === 'friends'){
      setActiveDmDiv('friends')
    }else{
      setActiveConversationName(btn)
      let photoURL = allUsers.find(item => item.displayName === btn).photoURL
      setActiveConversationPfp(photoURL)

      if(initialPendingRequests.filter(req => req.displayName === btn).length > 0){
        if(initialPendingRequests.find(req => req.displayName === btn).incoming === true){
          setFriendshipState('Accept friend request')
        }else{
          setFriendshipState('Cancel friend request')
        }
      }else if(intitialAllFriends.includes(btn)){
        setFriendshipState('Unfriend')
      }else{
        setFriendshipState('Add friend')
      }

      let users = [myName, btn]
      users.sort()

      const userMessagesQuery = query(collection(db, `${users[0]}-${users[1]}`), orderBy('createdAt'))

      const unsub = onSnapshot(userMessagesQuery, (querySnapshot) => {
        let messages = []
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        setActiveConversationMessages(messages)
      });
      
      setActiveDiv('dm')
      setActiveDmDiv('chat')

      return () => {
        unsub()
      }
    }
  }

  let handleChannelButton = (btn) => {
    setServerInputValue('');
    setActiveChannelName(btn)
    setActiveMessageButtonId('#')

    switch(btn){
      case 'channel1':
        setActiveChannelMessages(channel1)
        break;
      case 'channel2':
        setActiveChannelMessages(channel2)
        break;
      case 'channel3':
        setActiveChannelMessages(channel3)
        break;
      default: 
        break;
    }
  }

  let hideMessageButton = (e) => {
    if(activeDiv === 'server'){
      if(messageButton === true || userButton === true){
        if(e.target.classList.contains('userbtn')){
          setActiveMessageButtonId('x')
          setMessageButton(false)
        }else if(e.target.classList.contains('msgbtn')){
          setActiveUserButtonId('x')
          setUserButton(false)
        }
  
        if(e.target.classList.contains('btn')){
          return
        }else{
          setActiveMessageButtonId('x')
          setMessageButton(false)
          setActiveUserButtonId('x')
          setUserButton(false)
        }
      }
    }
  }

  let handleRequestButton = async (btn, requestName) => {
    await deleteDoc(doc(db, `users/${myName}/requests`, `${requestName}`))
    await deleteDoc(doc(db, `users/${requestName}/requests`, `${myName}`))

    if(btn === 'accept'){
      await updateDoc(doc(db, "users", `${myName}`), {
        friends: arrayUnion(`${requestName}`)
      });

      await updateDoc(doc(db, "users", `${requestName}`), {
        friends: arrayUnion(`${myName}`)
      });
    }
  }

  let unfriendButton = async (friendName) => {
    await updateDoc(doc(db, "users", `${myName}`), {
      friends: arrayRemove(`${friendName}`)
    });

    await updateDoc(doc(db, "users", `${friendName}`), {
      friends: arrayRemove(`${myName}`)
    });
  }

  let handleProfileButton = async (e, btn, username) => {
    if(btn === null){
      btn = e.target.innerText
      setActiveConversationButton(false)
    }

    switch(btn){
      case 'Add friend':
        await setDoc(doc(db, `users/${myName}/requests`, `${username}`), {
          displayName: username,
          incoming: false
        });
  
        await setDoc(doc(db, `users/${username}/requests`, `${myName}`), {
          displayName: myName,
          incoming: true
        });
        break;
      case 'Accept friend request':
        handleRequestButton('accept', username)
        break;
      case 'Cancel friend request':
        handleRequestButton('cancel', username)
        break;
      case 'Unfriend':
        unfriendButton(username)
        break;
      default: 
        break;
    }
  }
  
  let handleSendMessageButton = async (username) => {
    if(!allChats.includes(username)){
      await updateDoc(doc(db, "users", `${myName}`), {
        chats: arrayUnion(`${username}`)
      });
  
      await updateDoc(doc(db, "users", `${username}`), {
        chats: arrayUnion(`${myName}`)
      });

      let users = [myName, username]
      users.sort()

      let usersRef = doc(db, `${users[0]}-${users[1]}`, 'FIRSTITEM')
      const usersSnap = await getDoc(usersRef);

      if(usersSnap.exists()){
        handleDmButton(username)
        setActiveNavButton('dm')
      }else{
        await setDoc(doc(db, `${users[0]}-${users[1]}`, "FIRSTITEM"), {
          firstItem: true
        });

        handleDmButton(username)
        setActiveNavButton('dm')
      }
    }else{
      handleDmButton(username)
      setActiveNavButton('dm')
    }
  }

  return (
    <>
      <div style={{ transition: 'all ease 0.5s' }} className={loadingDiv ? 'select-none w-screen h-screen z-50 opacity-100 visible fixed flex flex-col items-center justify-center top-0 left-0 bg-black-3' : 'select-none w-screen h-screen invisible z-50 flex items-center justify-center flex-col opacity-0 fixed top-0 left-0 bg-black-3'}>
        <img src={logo} width={72} alt="" />
      </div>

      <div onClick={hideMessageButton} className='w-screen h-screen grid grid-cols-main overflow-hidden'>
        
      <MainNav 
        setActiveDiv={setActiveDiv}
        activeNavButton={activeNavButton}
        setActiveNavButton={setActiveNavButton}
      />

      {activeDiv === 'dm' ?

      <div className='grid grid-cols-dm m850:grid-cols-dm-responsive m500:grid-cols-1'>
        <DmLeftSidebar
          handleDmButton={handleDmButton}
          activeDmButton={activeDmButton}
          allChats={allChats}
          allUsers={allUsers}
          myPfp={myPfp}
          myName={myName}
          setActiveDmButton={setActiveDmButton}
          setActiveDmDiv={setActiveDmDiv}
        />

        <main className='max-h-screen min-h-screen relative bg-main-gray'>

          {activeDmDiv === 'friends' ? 

          <div className='h-full flex flex-col'>

            <Helmet>
              <title>Discord | Friends</title>
            </Helmet>

            <Nav 
              activeDiv={'friends'}
              setActiveFriendsSection={setActiveFriendsSection}
              activeFriendsSection={activeFriendsSection}
            />

            <div className='bg-main-gray h-full pb-10'>

              {activeFriendsSection === 'all' ? 

              <AllFriends
                intitialAllFriends={intitialAllFriends}
                allUsers={allUsers}
                setAllFriends={setAllFriends}
                allFriends={allFriends}
                setActiveFriendsSection={setActiveFriendsSection}
                handleSendMessageButton={handleSendMessageButton}
                unfriendButton={unfriendButton}
              />

              : activeFriendsSection === 'pending' ? 

              <PendindRequests
                initialPendingRequests={initialPendingRequests}
                pendingRequests={pendingRequests}
                allUsers={allUsers}
                handleRequestButton={handleRequestButton}
                setPendingRequests={setPendingRequests}
              />

              : activeFriendsSection === 'add friend' ? 

              <AddFriend myName={myName} />

              : null}
            </div>
          </div>
          
          : activeDmDiv === 'chat' ?

          <DirectMessages
            activeConversationName={activeConversationName}
            activeConversationPfp={activeConversationPfp}
            activeConversationButton={activeConversationButton}
            activeConverastionMessages={activeConverastionMessages}
            allUsers={allUsers}
            friendshipState={friendshipState}
            handleProfileButton={handleProfileButton}
            dmInputValue={dmInputValue}
            setDmInputValue={setDmInputValue}
          />

          : null

          }
        </main>
      </div>

      : activeDiv === 'server' ? 

      <div className='grid grid-cols-dm m850:grid-cols-dm-responsive m550:grid-cols-1'>
        <ServerLeftSidebar
          activeChannelName={activeChannelName}
          handleChannelButton={handleChannelButton}
          myName={myName}
          myPfp={myPfp}
        />

        <Helmet>
          <title>Discord | Server</title>
        </Helmet>

        <main className='max-h-screen relative'>
          <Nav 
            activeDiv={'server'}
            setToggleServerMemberList={setToggleServerMemberList}
            toggleServerMemberList={toggleServerMemberList}
            activeChannelName={activeChannelName}
          />

          <div className={toggleServerMemberList ? 'h-[calc(100vh-49px)] grid grid-cols-server m1000:grid-cols-server-responsive' : 'h-[calc(100%-49px)] block'}>

            <ServerMessages
              activeChannelName={activeChannelName}
              activeChannelMessages={activeChannelMessages}
              allUsers={allUsers}
              myName={myName}
              setActiveMessageButtonId={setActiveMessageButtonId}
              serverInputValue={serverInputValue}
              setServerInputValue={setServerInputValue}
              messageButton={messageButton}
              setMessageButton={setMessageButton}
              hideMessageButton={hideMessageButton}
              activeMessageButtonId={activeMessageButtonId}
              initialPendingRequests={initialPendingRequests}
              intitialAllFriends={intitialAllFriends}
              handleProfileButton={handleProfileButton}
              handleSendMessageButton={handleSendMessageButton}
            />

            <UsersSidebar 
              toggleServerMemberList={toggleServerMemberList}
              allUsers={allUsers}
              initialPendingRequests={initialPendingRequests}
              intitialAllFriends={intitialAllFriends}
              myName={myName}
              setActiveUserButtonId={setActiveUserButtonId}
              activeUserButtonId={activeUserButtonId}
              setUserButton={setUserButton}
              userButton={userButton}
              handleProfileButton={handleProfileButton}
              handleSendMessageButton={handleSendMessageButton}
            />
          </div>
        </main>
      </div>
      : null}
      </div>
    </>
  )
}