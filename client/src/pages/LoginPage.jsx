import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="youremail@email.com" />
          <input type="password" placeholder="enter your password" />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to="/register" className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
