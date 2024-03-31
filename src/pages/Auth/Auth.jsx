import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logIn, signUp } from '../../api';
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import "../../styles/Auth.css"


function Auth() {
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);   // isSignUp =false means on login page
    const [userData, setUserData] = useState({

        email: '',
        password: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        phone_number: '',
 
    })



    const handleSwitch = () => {
        setIsSignUp(!isSignUp);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => {
            return ({
                ...prevState,
                [name]: value
            })
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isSignUp) {
            const { email, password } = userData;
            if (!email || !password) {
                alert("Enter email and password");
                return;
            }
            else {
                try {
                    const user = await logIn(email, password);
                    sessionStorage.setItem('userData', JSON.stringify(user.data));
                    navigate("/");
                } catch (error) {
                    console.log("Login failed: ", error.response.data.message)
                    alert(error.response.data.message);
                }
            }
        }
        else {
            const { email, password, first_name, last_name, date_of_birth, gender, phone_number } = userData;
            if (!email || !password || !first_name || !last_name || !date_of_birth || !gender || !phone_number.length) {
                alert("Please fill in all fields");
                return;
            }
            if (phone_number.length !== 10) {
                alert("Enter valid Phone number");
                return;
            }
            else {
                try {
                    const user = await signUp(email, password, first_name, last_name, date_of_birth, gender, phone_number);
                    console.log(user)
                    sessionStorage.setItem('userData', JSON.stringify(user.data));
                    navigate("/");
                } catch (error) {
                    console.log("Login failed: ", error.response.data.message);
                    alert(error.response.data.message);
                }
            }
        }
    }
    

    return (

        <div className='body-container'>
            {!isSignUp && (<img className='main-icon' src='https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png' alt="BookMyShow Logo" />)}
            <div className='auth-container'>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <h4>Email</h4>
                    <input type='email' name='email' value={userData.email} onChange={handleChange}></input>
                    <h4>Password</h4>
                    <input type='password' name='password' value={userData.password} onChange={handleChange}></input>
                    {isSignUp && (
                        <div className='signup-form-part'>

                            <h4>First Name:</h4>
                            <input type='text' name='first_name' value={userData.first_name} onChange={handleChange}></input>
                            <h4>Last Name:</h4>
                            <input type='text' name='last_name' value={userData.last_name} onChange={handleChange}></input>
                            <h4>Date of Birth:</h4>
                            <input type='date' name='date_of_birth' value={userData.date_of_birth} onChange={handleChange}></input>
                            <h4>Gender:</h4>
                            <select name='gender' value={userData.gender} onChange={handleChange}>
                                <option value={""}>Select Gender</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Other"}>Other</option>
                            </select>
                            <h4>Phone Number:</h4>
                            <input type='tel' name='phone_number' value={userData.phone_number} onChange={handleChange}></input>
                            
                        </div>
                    )}
                    <button type="submit" className='auth-btn'>{isSignUp ? 'Signup' : 'Login'}</button>
                </form>

            </div>
            <div className='login-signup-switch'>
                <p>{isSignUp ? "Already have an account? " : "Don't have an account? "}</p>
                <Link className='login-signup-switch-link' type='button' onClick={handleSwitch}>{isSignUp ? "Login" : "Signup"}</Link>
            </div>
        </div>

    )
}

export default Auth