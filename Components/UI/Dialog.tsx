import styled from "styled-components";

export const Dialog = styled.dialog`
  display: block;
  align-self: center;
  justify-self: center;
  opacity: 0;
  transform: translateY(5rem); // FIX: doesn't work
  transition: all 1.3 ease-in;

  &[open] {
    opacity: 1;
    transform: translateY(0);
  }

  &:not([open]) { // when closed
    pointer-events: none;
  }
`;
