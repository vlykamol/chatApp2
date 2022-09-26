import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useAuth()

  const handelLogin = (e) => {
    e.preventDefault();
    login(email, password)
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-black/50 text-white">
      <form onSubmit={(e) => handelLogin(e)} autoComplete="off" className="flex flex-col gap-2 rounded bg-black/40 p-4 m-2 w-full sm:w-96">
        <h2 className="font-bold text-3xl">login</h2>
        <label className="mt-2" htmlFor="email">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border-b-2 focus:outline-none"
          type="text"
          placeholder="abc@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />

        <label className="mt-2" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border-b-2 focus:outline-none"
          type="password"
          placeholder="!password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$"
          required
        />

        <button className="bg-black/70 p-2 my-2 rounded">
          login
        </button>
        <div>
          Don't have an account? &nbsp;
          <Link className="text-blue-500 underline" to={"/signup"}>
            signup
          </Link>
        </div>
      </form>
    </div>
  );
}
