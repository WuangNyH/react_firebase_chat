import { useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser'

const ChatList = () => {
  
  // Add state to toggle addMode
  const [addMode, setAddMode] = useState(false)

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search' />
        </div>
        <img 
          src={addMode ? "./minus.png" : "./plus.png"} // Toggle between plus and minus icon
          alt="" className='add'
          onClick={() => setAddMode(prev => !prev)} // Action to toggle addMode
        />
      </div>
      {/* List User */}
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {/* Add User */}
      {addMode && <AddUser />}
    </div>
  )
}

export default ChatList
