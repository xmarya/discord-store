"use client";

import { MenuContext } from "@/hooks/MenuContext";
import { use } from "react";
import styled from "styled-components";

const StyledOptionButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--colour-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--colour-grey-400);
    transition: all 0.3s;
  }
`;

type Props = {
  children: React.ReactNode;
  onClick?: () => void
};

export default function OptionButton({ children, onClick }: Props) {
    const {close} = use(MenuContext);

    function handleOnClick() {
        onClick?.();
        close();
    }
  return (
    // this is going to be inside the OptionsList, so to keep it semantically it should be a button inside li element
    <li>
      <StyledOptionButton onClick={handleOnClick}>{children}</StyledOptionButton>
    </li>
  );
}
