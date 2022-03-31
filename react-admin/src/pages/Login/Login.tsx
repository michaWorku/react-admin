import { FC, useRef } from 'react'
import './login.scss'
import { useContext, useState } from "react";
import "./login.scss";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/auth/authContext';


const Login : FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const { dispatch } = useAuthContext()

  const navigate = useNavigate()

  const handleLogin = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    try {
     const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      
      dispatch({type: 'LOGIN', payload: userCredential.user})

      navigate('/')

    } catch (error) {
      console.error(error);
      setError(true)
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          ref={emailRef}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          placeholder="password"
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  )
}

export default Login