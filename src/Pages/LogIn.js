import React, { useState, useCallback, useContext } from 'react'
import { ErrorLogIn } from '../Componants/ErrorLogIn'
import { AuthContext } from '../Contaxts/AuthContext'
import { auth } from '../Firebase/Fire'

import signin from '../img/signin.svg'
import signup from '../img/signup.svg'

import '../styles/logIn.css'


export const LogIn = () => {

const [errorMsg, setErrorMsg] = useState('')
const [isError, setisError] = useState(false)

    const handelNewUser = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await auth.createUserWithEmailAndPassword(email.value, password.value);
        } catch (error) {
            console.log(error.message, "NewUser");
            setErrorMsg(error.message)
            setisError(true)
            setTimeout(() => setisError(false), 4000);
        }


    }, []);
    const handelLogIn = useCallback(async event => {

        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);
        } catch (error) {
            console.log(error.message, "existingIn");
            setErrorMsg(error.message)
            setisError(true)
            setTimeout(() => setisError(false), 4000);
        }
    }, []);


    const { currentUser } = useContext(AuthContext);

console.log(currentUser)

    const [rightPanelActive, setRightPanelActive] = useState(false)

    return (
        <div className={`container ${rightPanelActive ? "sign-up-mode" : ""}`}>
            <ErrorLogIn isError={isError} message={errorMsg}/>
            <div className="forms-container">
                <div className="signin-signup">
                    {/* Sign-in-form */}
                    <form action="/" className="sign-in-form" onSubmit={handelLogIn} >
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email" name="email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" autoComplete="on" />
                        </div>
                        <input type="submit" value="Login" className="btn solid" />
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <a href="/" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                    {/* sign-up-form */}
                    <form action="/" className="sign-up-form" onSubmit={handelNewUser}>
                        <h2 className="title">Sign up</h2>

                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" name="email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" autoComplete="on"/>
                        </div>
                        <input type="submit" className="btn" value="Sign up" />
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="/" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                           Welcome to this social Media app
                            
              </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={() => { setRightPanelActive(!rightPanelActive) }}>
                            Sign up
              </button>
                    </div>
                    <img src={signin} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                           Welcome Back. We missed you.
              </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={() => { setRightPanelActive(!rightPanelActive) }}>
                            Sign in
              </button>
                    </div>
                    <img src={signup} className="image" alt="" />
                </div>
            </div>
        </div>
    )
}
