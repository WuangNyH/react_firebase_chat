import { useState } from 'react'
import './chatList.css'

const ChatList = () => {
  
  // Funtion to toggle addMode
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
    </div>
  )
}

export default ChatList
