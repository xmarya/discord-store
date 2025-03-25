"use client"
import styled from "styled-components";

export const Button = styled.button`
    /* width: 4rem;
    height: 2rem; */
    padding: 0.8rem;
  background: #9b51e0;
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s, transform 0.2s;

  &:hover {
    background: #7b3bb2;
  }

  &:active {
    transform: scale(0.98);
  }

`;

/*
 this is the parent/general button that all other buttons are going to inherit.
 the styles of hover,active, and disabled state are here (note that the disabled is already in the general.css)
 it also has the buttons types definitions (primary, secondary, cancel, danger)
*/