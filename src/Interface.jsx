import styled from "styled-components";

const Container = styled.section`
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  background-color: #f7f7f7;
  padding: 25px;
  backdrop-filter: blur(10px);
  border-radius: 55px;
`;

const Button = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 10px 25px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

export default function Interface({
                                    onBtnClick
                                  }) {
  return <Container>
    <NavigationControls>
      <Button onClick={() => onBtnClick('start')}>Start</Button>
      <Button onClick={() => onBtnClick('stage1')}>Stage 1</Button>
    </NavigationControls>
  </Container>
}