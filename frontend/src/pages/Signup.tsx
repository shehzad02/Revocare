import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import Signup from "../components/Signup";

const Test = styled.div``;

export default function SignupBoom() {
  // const auth = getAuth();

  return (
    <FrontPageLayout>
        <Signup />
    </FrontPageLayout>
  );
}
