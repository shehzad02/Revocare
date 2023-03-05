import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import LoginComponent from "../components/Login";

import { auth } from "../globals/firebase";


export default function Login() {

  const nav = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          nav("/play");
        }
      });
}, [])


  return (
    <FrontPageLayout>
      <LoginComponent />
    </FrontPageLayout>
  );
}
