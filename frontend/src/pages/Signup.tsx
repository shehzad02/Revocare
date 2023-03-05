import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import Signup from "../components/Signup";
import { auth } from "../globals/firebase";

export default function SignupBoom() {
  // const auth = getAuth();

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
        <Signup />
    </FrontPageLayout>
  );
}
