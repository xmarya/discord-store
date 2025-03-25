"use client";
import { MenuContext } from "@/hooks/MenuContext";
import { use, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledOptionsList = styled.ul<{$position:{x:number, y:number}}>`
  position: fixed;
  background-color: rosybrown;

  right: ${props => props.$position.x}px;
  top: ${props => props.$position.y}px;
`;

type Props = {
  children: React.ReactNode;
  clickedList: number;
};

export default function OptionsList({ clickedList, children }: Props) {
  const { position, close, menuId } = use(MenuContext);
  // if (clickedList !== menuId) return null; Caused a bug since it removes useEffect from the component hooks between renders. it breaks the React hook rule which insists the hook mustn't come after a condition 

  useEffect(()=> {
    // because of the position: fixed, when scrolling the List is going to stick. 
    // so we need to listen to any scroll event to close the menu.
    addEventListener("scroll", close, true);

    return () => removeEventListener("scroll", close, true);
  },[]);

  if (clickedList !== menuId) return null;

  return createPortal(<StyledOptionsList $position={position}>{children}</StyledOptionsList>, document.body);
}
