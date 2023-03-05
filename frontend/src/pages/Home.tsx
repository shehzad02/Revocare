import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import BandSrc from "../assets/band.png";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import { NavBarItemButton } from "../components/layouts/NavBar";
import { useNavigate } from "react-router-dom";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin-top: 50px;
`;

const TextImageRow = styled.div`
  display: flex;
  gap: 25px;
`;

const Header = styled.h1`
  font-size: 3rem;
  color: white;
`;

const SubHeader = styled.div`
  font-size: 1.5rem;
  color: white;
`;

const BigImage = styled.img`
  height: 100%;
  max-width: 250px;
  width: 100%;
  animation: hoverUpAndDown 4s ease-in-out infinite;

  @keyframes hoverUpAndDown {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 600px;
`;

export default function Home() {
  const typeRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!typeRef.current) return;
    const TypedText = new Typed(typeRef.current, {
      strings: ["Dignity", "Health", "Life", "Freedom"],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 200,
      backDelay: 100,
      loop: true,
    });

    return () => {
      TypedText.destroy();
    };
  }, []);

  return (
    <FrontPageLayout>
      <ContentContainer>
        <TextImageRow>
          <ColumnContainer>
            <Header>
              Reclaim your <span ref={typeRef}></span>
            </Header>
            <SubHeader>Train yourself with Revocare today!</SubHeader>
            <div style={{ height: "60px", marginTop: "25px" }}>
              <NavBarItemButton
                inverted
                onClick={() => {
                  navigate("/play");
                }}
              >
                Get Started
              </NavBarItemButton>
            </div>
          </ColumnContainer>
          <BigImage src={`${BandSrc}`} alt="The band" />
        </TextImageRow>
      </ContentContainer>
    </FrontPageLayout>
  );
}
