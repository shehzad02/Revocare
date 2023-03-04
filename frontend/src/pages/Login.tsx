import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";

import { auth } from "../globals/firebase";


export default function Login() {

  const Test = styled.div``;

  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });

  return (
    <FrontPageLayout>
      <Test>we ball</Test>
    </FrontPageLayout>
  );
}
