import React, { useState } from "react";
import styled from "styled-components";

import { auth } from "../globals/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const FrontPageLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SignUpHeader = styled.h2`
  color: white;
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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUpErrors, setSignUpErrors] = useState<string>("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(`User ${user?.email} signed up!`);
        setSignUpErrors("");
        // ...
      })
      .catch((error) => {
        console.log(error);
        setSignUpErrors(error.message);
      });
  };

  return (
    <SignUpContainer>
      <SignUpHeader>Sign Up</SignUpHeader>
      <SignUpForm onSubmit={handleSignUp}>
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
        <Button type="submit">Sign Up</Button>
        <ErrorMessages>{signUpErrors}</ErrorMessages>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
