import styled, { keyframes } from "styled-components";
const AnimatedLogo = keyframes`
    from{
        opacity: 0;
        /* transform: scale(0.25); */
    }
    to{
        opacity: 1;
        /* transform: scale(1); */
    }
`;
export const AnimationContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SvgContainer = styled.img`
  height: 50.223415682062296vh;
  width: 30.965939329430547vw;
  max-height: 250px;
  max-width: 250px;
  animation: ${AnimatedLogo} 0.75s infinite;
`;
