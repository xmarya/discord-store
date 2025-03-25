import styled from "styled-components";
import { Button } from "./Button";


export const DiscordButton = styled(Button)`
    /* display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    
    svg {
        height: 2rem;
        width: 2rem;
    } */

        display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 300px;
  padding: 0.8rem 1.2rem;
  background: #252525;
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s, transform 0.2s;
  
  &:hover {
    background: #333;
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;