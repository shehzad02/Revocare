import styled from "styled-components";
import FrontPageLayout from "../components/layouts/FrontPageLayout";
import BandSrc from "../assets/band.png";

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
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <FrontPageLayout>
      <ContentContainer>
        <TextImageRow>
          <ColumnContainer>
            <Header>Reclaim your XYZ</Header>
            <SubHeader>Train yourself with Revocare today!</SubHeader>
          </ColumnContainer>
          <BigImage src={`${BandSrc}`} />
        </TextImageRow>
      </ContentContainer>
    </FrontPageLayout>
  );
}
