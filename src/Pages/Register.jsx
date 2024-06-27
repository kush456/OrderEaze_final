import React, { useState ,} from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import { set } from 'mongoose';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({ name:"",phone: "",password: "",email: "" })

  const HandleChange = (e) => {
    console.log("changed called");
    e.preventDefault();
    setuserData((prevuserData) => {
      return {
        ...prevuserData,
        [e.target.name]: e.target.value
      }
    })  //this line sets the userdata to new entered phone email and password !
  }

  const sendata = async (userData) => {
    console.log("sendata called");
    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const responseData = await response.json();
      console.log('Data sent and received:', responseData);
      navigate("/login")

    } catch (error) {
      console.log("error occured", error);
    }
  };
  const handleSubmit = (e) => {
    console.log("submit called");
    e.preventDefault(); // Prevent default form submission
    sendata(userData);


  }



  return (
    <div className="flex flex-col h-screen justify-center items-center bg-white">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-rose-600 mb-6">Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <img src="path/to/flag.png" alt="flag" className="w-6 h-6 mr-2" />
            <input
              name='phone'
              onChange={HandleChange}
              value={userData.phone}
              type="text"
              placeholder="(+44) 20 1234 5629"
              className="flex-grow bg-transparent outline-none text-gray-900"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <img src="path/to/email-icon.png" alt="email" className="w-6 h-6 mr-2" />
            <input
              name='email'


              onChange={HandleChange}
              value={userData.email}
              type="email"
              placeholder="thomas.abc.inc@gmail.com"
              className="flex-grow bg-transparent outline-none text-gray-900"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <img src="path/to/user-icon.png" alt="user" className="w-6 h-6 mr-2" />
            <input
              name='password'
              onChange={HandleChange}
              value={userData.password}
              type="password"
              placeholder="password"
              className="flex-grow bg-transparent outline-none text-gray-900"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <img src="path/to/user-icon.png" alt="user" className="w-6 h-6 mr-2" />
            <input
              name='name'
              onChange={HandleChange}
              value={userData.name}
              type="text"
              placeholder="BamanIrani"
              className="flex-grow bg-transparent outline-none text-gray-900"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-rose-600"
            />
            <label className="text-gray-600">Remember me</label>
          </div>
          <button
            
            type="submit"
            className="w-full py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Register
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400">Or sign in with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex space-x-4 justify-center">
          <button className="p-2 bg-white border border-gray-300 rounded-full">
            <FaGoogle className="text-gray-600" />
          </button>
          <button className="p-2 bg-white border border-gray-300 rounded-full">
            <FaApple className="text-gray-600" />
          </button>
          <button className="p-2 bg-white border border-gray-300 rounded-full">
            <FaFacebook className="text-gray-600" />
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already Have an account? <a href="/login" className="text-rose-600 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
