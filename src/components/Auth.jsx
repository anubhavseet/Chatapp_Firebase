import React from 'react'
import {auth,provider} from "../firebase-config"
import {signInWithPopup} from "firebase/auth"
import Cookies from "universal-cookie"
const cookies = new Cookies()


function Auth(props) 
{

 const {setisauth} = props ;  

 const signInwithGoogle = async()=>{
    try {
       const user= await signInWithPopup(auth,provider)
       cookies.set("auth-token",user.user.refreshToken)
       setisauth(true)
       console.log(user.user.refreshToken)
        }
        catch(err){
            throw err
        }
    }
    
    
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <p className="mb-4 font-bold text-xl text-gray-800">Sign in with Google</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={signInwithGoogle}>
            Sign in
          </button>
          <div className="mt-4">
            {/* Add content here */}
          </div>
        </div>
      );
      
}

export default Auth