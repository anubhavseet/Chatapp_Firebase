import { useState, useEffect, useRef } from 'react'
import './App.css'
import Auth from './components/Auth'
import Cookies from "universal-cookie"

const cookies = new Cookies()

function App() {
  const [isauth, setisauth] = useState(null)
  const [room, setroom] = useState(null)
  const roomInputRef = useRef(null)

  useEffect(() => {
    setisauth(cookies.get("auth-token"))
  }, [])

  return (
    !isauth ? (
      <div>
        <Auth setisauth={setisauth}/>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {room ? (
          <div className="text-2xl font-bold text-blue-500">Chat</div>
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room-name">
                Enter room name
              </label>
              <input
                type="text"
                ref={roomInputRef}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="room-name"
                placeholder="Enter Room Name"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  setroom(roomInputRef.current.value);
                }}
              >
                Enter Chat
              </button>
            </div>
          </div>
        )}
      </div>
    )
  )
}

export default App
