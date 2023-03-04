import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import LoginComponent from "../components/Login";

import { auth } from "../globals/firebase";


export default function Login() {
  return (
    <FrontPageLayout>
      <LoginComponent />
    </FrontPageLayout>
  );
}
