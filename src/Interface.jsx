import styled from "styled-components";
import {useAtom} from "jotai";
import {stageAtom} from "./App.jsx";
import {stages} from "./conts.js";

const Container = styled.section`
  position: fixed;
  z-index: 1;
  max-width: 70%;
  width: 100%;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  background-color: #ffffff0a;
  padding: 25px;
  backdrop-filter: blur(100px);
  border-radius: 55px;
  @media (max-width: 768px) {
    padding: 15px;
  }
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
  white-space: nowrap;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }

  &.active {
    background-color: #000000;
    color: #ffffff;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 5px 15px;
    margin: 0 5px;
  }
`;

const Picture = styled.img`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1;
  width: 150px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

export default function Interface() {
  const [stage, setStage] = useAtom(stageAtom);
  const stagesList = Object.entries(stages).map(([key, value]) => <Button onClick={() => setStage(key)}
                                                                          className={stage === key ? 'active' : ''} key={key}>{value}</Button>);
  return <>
    <Picture src="./img/sample.jpg" alt="logo"/>
    <Container>
      <NavigationControls>
        {stagesList}
      </NavigationControls>
    </Container>
  </>
}