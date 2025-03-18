"use client"
import styled from "styled-components";

export const Button = styled.button`
    /* width: 4rem;
    height: 2rem; */
    font-size: 1.2rem;
    background-color: royalblue;
    color: white;
    padding-block: 0.8rem;
    padding-inline: 1.6rem;
`;

/*
 this is the parent/general button that all other buttons are going to inherit.
 the styles of hover,active, and disabled state are here (note that the disabled is already in the general.css)
 it also has the buttons types definitions (primary, secondary, cancel, danger)
*/