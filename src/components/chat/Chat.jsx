import { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from "emoji-picker-react"
import { onSnapshot, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'

const Chat = () => {

  const {chatId, user} =  useChatStore()
  const {currentUser} =  useUserStore()

  const [chat, setChat] = useState()

  // Funtion hover for emoji
  const [imgaeSrc, setImageSrc] = useState(false)

  // Function click open emoji picker
  const [open, setOpen] = useState(false)

  // Function set Text in input message
  const [text, setText] = useState("")

  // Ref for auto scroll to bottom
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data())
    })

    return () => {
      unSub()
    }
  }, [chatId])

  // Hanlde Aciton click emoji
  const handleEmoji = e => {
    setText(prev => prev + e.emoji)
  }

  // Handle Action click send
  const handleSend = async () => {
    if (text === "") return

    try {
      
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date()
        })
      })

      const userIDs = [currentUser.id, user.id]

      userIDs.forEach(async (id) => {

        const userChatsRef = doc(db, "userchats", id)
        const userChatsSnap = await getDoc(userChatsRef)

        if (userChatsSnap.exists()) {
          const userChatsData = userChatsSnap.data()

          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt = Date.now()

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='chat'>
      {/* User Info on top Chat */}
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      {/* Chat Message */}
      <div className="center">
        { chat?.messages?.map(message => (    
          <div className="message own" key={message?.createdAt}>
            <div className="texts">
            {message.img &&<img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}

        {/* Auto Scroll */}
        <div ref={endRef}></div>
      </div>

      {/* Type message and image */}
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input 
          type="text" placeholder='Type a message...'
          value={text}
          onChange={e => setText(e.target.value)}
          onClick={() => setOpen(false)}
        />
        <div className="emoji">
          <img 
            src={imgaeSrc ? "./emoji_hover.png" : "./emoji.png"} alt="" 
            onMouseEnter={() => setImageSrc(true)}
            onMouseLeave={() => setImageSrc(false)}
            onClick={() => setOpen(prev => !prev)}
          />
          <div className="picker">
            <EmojiPicker
              open = {open}
              onEmojiClick={handleEmoji}
            />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat
