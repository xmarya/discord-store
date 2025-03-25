"use client"

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

export const Spinner = styled.div`
    margin: 3.2rem auto 1.6rem;
    width: 6rem;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 0.8rem solid black;
    border-right-color: #ccc;
    animation: ${rotate} 1s infinite linear;
`;

export const MiniSpinner = styled.div`
    margin: 0;
    width: 2rem;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 0.2rem solid #ccc;
    border-right-color: transparent;
    animation: ${rotate} 1s infinite linear;
`;

