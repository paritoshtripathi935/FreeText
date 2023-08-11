import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const Auth = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',  // Add the fullname field
        phoneNumber: '',  // Add the phoneNumber field
        email: '',  // Add the email field
    });
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, confirmPassword, full_name, email } = form;
        console.log(form);

        const URL = 'http://127.0.0.1:8000'; // Replace with your backend API URL

        try {
            const response = await axios.post(
                `${URL}/${isSignup ? 'signup' : 'login'}`,

                {
                    username,
                    password,
                    full_name,
                    email,
                }
            );

            const { token, userId, role } = response.data;
            console.log(response.data);

            // Handle storing the token, user info, etc. (e.g., using cookies or state management)
            // For now, let's just log the token and userId
            console.log('Token:', token);
            console.log('User ID:', userId);
            console.log('Role:', role);

            cookies.set('token', token);
            cookies.set('userId', userId);
            cookies.set('role', role);

    
            if(isSignup) {
                cookies.set('username', username);
                cookies.set('full_name', full_name);
                cookies.set('email', email);
                
            }
    
            // Reload the page after successful login/signup
            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
            // Handle error (display error message, etc.)
        }
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="email">Email</label>
                                <input 
                                    name="email" 
                                    type="text"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}


export default Auth;
