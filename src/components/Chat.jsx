import React, { useEffect, useState } from 'react';
import { collection, 
      addDoc,
      serverTimestamp,
      onSnapshot, 
      query, 
      where,
      orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { signOut } from 'firebase/auth' // Import your Firebase configuration

function Chat(props) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages"); // Corrected collection name
  const room = props.room;

  useEffect(() => {
    const queryMessages = query(
        messageRef,
        where("room", "==", room),
        orderBy("createdAt"));
  
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe(); // Unsubscribe from snapshot listener
  }, [room]); // Re-run effect when room changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === '') return;

    const messageData = {
      text: message,
      createdAt: serverTimestamp(),
      room: props.room,
      user: auth.currentUser.displayName,
      senderPhotoURL:auth.currentUser.photoURL,
    };

    try {
      await addDoc(messageRef, messageData); // Use messageRef for adding documents
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
      // Handle error here
    }
  };

  
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 py-4 px-6 text-white">
        <div className="flex items-center space-x-2">
          {auth.currentUser.photoURL && (
            <img src={auth.currentUser.photoURL} alt="User Icon" className="w-8 h-8 rounded-full mr-2" />
          )}
          <p className="text-lg font-bold">{auth.currentUser.displayName}</p>
        </div>
        <button
          className="text-white text-sm font-semibold bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full focus:outline-none"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
  {messages.map((message) => (
    <div key={message.id} className={`mb-4 ${message.user === auth.currentUser.displayName ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`flex items-center max-w-xs px-4 py-2 rounded-lg shadow-md ${message.user === auth.currentUser.displayName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
        {message.user === auth.currentUser.displayName ? (
          // User message: Render user's photo URL
          auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} alt="User Icon" className="w-8 h-8 rounded-full mr-2" />
        ) : (
          // Received message: Render sender's photo URL
          message.senderPhotoURL && <img src={message.senderPhotoURL} alt="Sender Icon" className="w-8 h-8 rounded-full mr-2" />
        )}
        <p className="break-all">{message.text}</p>
      </div>
    </div>
  ))}
</div>


      {/* Message Input */}
      <form onSubmit={handleSubmit} className="px-4 py-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type here"
            className="flex-1 border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
