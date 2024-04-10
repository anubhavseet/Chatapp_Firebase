import { useState, useRef } from 'react'
import './App.css'
import Auth from './components/Auth'
import Cookies from "universal-cookie"
import Chat from './components/Chat'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef(null)

  const handleEnterChat = () => {
    const roomName = roomInputRef.current.value.trim()
    if (roomName !== "") {
      setRoom(roomName)
    } else {
      // Handle empty room name error
      console.error("Room name cannot be empty")
    }
  }

  const handleSignOut = async () =>{
       await signOut(auth)
       cookies.remove("auth-token")
       setIsAuth(false)
       setRoom(null)
  }

  return  (
    isAuth ? (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700">
        {room ? (
          <div>
            <Chat room={room} />
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
            <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-4 flex flex-col items-center">
            <div className="mb-4">
              <label className="block text-gray-700  text-xl font-bold mb-2" htmlFor="room-name">
                Enter room name to chat with others.
              </label>
              <input
                type="text"
                ref={roomInputRef}
                defaultValue=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="room-name"
                placeholder="Enter Room Name"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleEnterChat}
            >
              Enter Chat
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

        

        )}
      </div>
    ) : (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  )
}

export default App
