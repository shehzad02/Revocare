import React, { useState } from "react";
import styled from "styled-components";

import { auth } from "../globals/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const ErrorMessages = styled.div`
  color: red;
`;

const LoginHeader = styled.h2`
  color: white;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginErrors, setLoginErrors] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(`User ${user?.email} signed in!`);
          setLoginErrors("")
          // ...
        })
        .catch((error) => {
          console.log(error);
          setLoginErrors(error.message);
        });
      // User login successful
    } catch (error) {
      console.log(`User did not, in fact, sign in.`);
      // Handle errors
    }
  };

  return (
    <LoginContainer>
      <LoginHeader>Login</LoginHeader>
      <LoginForm onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <ErrorMessages>{loginErrors}</ErrorMessages>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
