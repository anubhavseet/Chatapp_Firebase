import React from 'react'
import {auth,provider} from "../firebase-config"
import {signInWithPopup} from "firebase/auth"
import Cookies from "universal-cookie"
import background from "../assets/background.jpg"
import googleIcon from "../assets/google-icon.png"
const cookies = new Cookies()


function Auth(props) 
{

 const {setIsAuth} = props ;  

 const signInwithGoogle = async()=>{
    try {
       const user= await signInWithPopup(auth,provider)
       cookies.set("auth-token",user.user.refreshToken)
       setIsAuth(true)
       console.log(user)
        }
        catch(err){
            throw err
        }
    }
    
    return  (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${background})`}}>



        <h1 className="text-4xl font-bold  text-amber-500 mb-8">ChatAPP</h1>
        <p className="text-lg font-bold  text-amber-500 0mb-8">Welcome to our chat app! Chat with your friends and family in real-time.</p>
        <div className="bg-black bg-opacity-60 rounded-lg p-8">
  <h2 className="text-3xl font-bold text-white mb-8">Sign in with Google</h2>
  <button 
    className="flex items-center justify-center bg-white bg-opacity-80 text-gray-800 font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:shadow-lg"
    onClick={signInwithGoogle}
  >
    <img src={googleIcon}  alt="Google Icon" className="w-6 h-6 mr-3" />
    Sign in with Google
  </button>
</div>

      </div>
    );
    
    
    
      
}

export default Auth