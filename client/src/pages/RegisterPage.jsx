import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let registerUser = (event) => {
    const user = {
      firstName,
      lastName,
      email,
      contact,
      password,
      confirmPassword,
    };
    console.log(user);
    axios
      .post("/users/register", user)
      .then((res) => {
        console.log(res.data);
        alert("User registration successfull");
      })
      .catch((err) => {
        alert("Registration failed");
        console.log(err);
      });
    event.preventDefault();
  };
  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="contact"
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="youremail@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Have an account?{" "}
            <Link to="/login" className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
