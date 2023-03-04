import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import Login from "../components/Login";

import { auth } from "../globals/firebase";


export default function LoginBoom() {
  return (
    <FrontPageLayout>
      <Login />
    </FrontPageLayout>
  );
}
