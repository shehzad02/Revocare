import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import SignupLayout from "../components/Signup";

import { auth } from "../globals/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Test = styled.div``;

export default function Signup() {
  // const auth = getAuth();

  return (
    <FrontPageLayout>
        <SignupLayout />
    </FrontPageLayout>
  );
}
