import styled from "styled-components";
import logoSrc from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { RouteData } from "../../globals/RouteData";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../globals/firebase";

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5em;
  margin-top: 10px;
  height: 60px;
`;

const LogoImg = styled.img`
  height: 2rem;
  cursor: pointer;
`;

const NavBarItems = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 100%;
`;

const NavBarItem = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.5em;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const NavBarItemButton = styled.div<{
  inverted?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 125px;

  color: ${(props) => (props.inverted ? "rgb(31, 135, 255)" : "white")};
  background-color: ${(props) => (props.inverted ? "white" : "transparent")};
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  border: white solid 1px;
  border-radius: 10px;

  &:hover {
    background-color: ${(props) =>
      props.inverted ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.1)"};
  }
`;

export default function NavBar() {
  const navigate = useNavigate();

  const [hideAuth, setHideAuth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setHideAuth(true);
      }
    });
  }, []);

  return (
    <NavBarContainer>
      <LogoImg
        src={`${logoSrc}`}
        alt="logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <NavBarItems>
        {RouteData.map(
          (route) =>
            (route.type === "link" && (
              <NavBarItem
                key={`route-${route.path}`}
                onClick={() => {
                  navigate(route.path);
                }}
              >
                {route.name}
              </NavBarItem>
            )) ||
            (route.type === "button" && !hideAuth && (
              <NavBarItemButton
                key={`route-${route.path}`}
                onClick={() => {
                  navigate(route.path);
                }}
              >
                {route.name}
              </NavBarItemButton>
            )) ||
            (route.type === "button-inverted" && !hideAuth && (
              <NavBarItemButton
                inverted
                key={`route-${route.path}`}
                onClick={() => {
                  navigate(route.path);
                }}
              >
                {route.name}
              </NavBarItemButton>
            ))
        )}
      </NavBarItems>
    </NavBarContainer>
  );
}
