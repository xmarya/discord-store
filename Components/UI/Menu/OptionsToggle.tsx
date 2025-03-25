"use client";

import styled from "styled-components";
import { Button } from "../Buttons/Button";
import { use } from "react";
import { MenuContext } from "@/hooks/MenuContext";

const StyledOptionsToggle = styled(Button)`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 0.4rem;
  transform: translateX(-0.8rem);
  transition: all 0.2s;
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--colour-grey-700);
  }
`;
type Props = {
  children:React.ReactNode
  clickedList: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function OptionsToggle({ clickedList, children }: Props) {
  const {open, close, menuId, setPosition} = use(MenuContext);

  function handleOnClick(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // event.stopPropagation();

    const clickButton = event.currentTarget.closest("button")?.getBoundingClientRect()!;
    setPosition({
      x: window.innerWidth - clickButton.width - clickButton.x,
      y: clickButton.y + clickButton.height + 8 // the 8 here is a margin
    });

    
    menuId === undefined || menuId !== clickedList ? open(clickedList) : close();

  }

  return <StyledOptionsToggle onClick={(event) => handleOnClick(event)}>
    {children}
  </StyledOptionsToggle>;
}
