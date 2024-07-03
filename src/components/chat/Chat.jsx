import { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from "emoji-picker-react"

const Chat = () => {

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

  // Hanlde Aciton click emoji
  const handleEmoji = e => {
    setText(prev => prev + e.emoji)
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
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos totam debitis molestias quasi possimus autem, quas impedit similique? Culpa facilis voluptatibus necessitatibus eius molestias, eaque velit numquam laborum dicta ratione.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos totam debitis molestias quasi possimus autem, quas impedit similique? Culpa facilis voluptatibus necessitatibus eius molestias, eaque velit numquam laborum dicta ratione.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos totam debitis molestias quasi possimus autem, quas impedit similique? Culpa facilis voluptatibus necessitatibus eius molestias, eaque velit numquam laborum dicta ratione.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos totam debitis molestias quasi possimus autem, quas impedit similique? Culpa facilis voluptatibus necessitatibus eius molestias, eaque velit numquam laborum dicta ratione.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos totam debitis molestias quasi possimus autem, quas impedit similique? Culpa facilis voluptatibus necessitatibus eius molestias, eaque velit numquam laborum dicta ratione.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
          <img src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg" alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos totam debitis molestias quasi possimus autem, quas impedit similique? Culpa facilis voluptatibus necessitatibus eius molestias, eaque velit numquam laborum dicta ratione.</p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}

export default Chat
