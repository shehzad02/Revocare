import styled from "styled-components";
import NavBar from "./NavBar";

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

export default function FrontPageLayout(props: React.PropsWithChildren) {
  return (
    <FrontPageLayoutContainer>
      <NavBar />
      <MainContainer>{props.children}</MainContainer>
    </FrontPageLayoutContainer>
  );
}
