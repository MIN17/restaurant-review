import { useState } from "react";
import { Button } from "@/components";
import axios from "axios";

const isProduction = import.meta.env.PROD;
const baseUrl: string = isProduction
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/register`, {
        email,
        password,
      });

      if (response.status == 201) {
        console.log("Registration successful");
      } else {
        console.log("Registration failed.");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <>
      <title>Sign Up</title>
      <div className="flex h-full desktop:h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-medium mb-8">Create an account</h1>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-4 w-80">
            <input
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded border-solid border-black py-2 px-3"
            />
            <input
              name="email"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded border-solid border-black py-2 px-3"
            />
          </div>
          <Button
            value="Register"
            type="submit"
            className="mt-8 w-80 bg-blue-500"
          />
          <div className="ml-auto mr-0"></div>
          <div className="ml-auto mr-0 text-gray-500 text-sm">
            <span>Do you have an account?</span>
            <Button
              value="Sign In"
              link="/login"
              noStyle
              className="ml-1 underline text-blue-500"
            ></Button>
          </div>
        </form>
      </div>
    </>
  );
}
