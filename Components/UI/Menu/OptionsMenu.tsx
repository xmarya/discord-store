"use client";

import { MenuContextProvider } from "@/hooks/MenuContext";
import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

type Props = {
  children: React.ReactNode;
};

export default function OptionsMenu({ children }: Props) {
  return (
    <MenuContextProvider>
      <Menu>{children}</Menu>
    </MenuContextProvider>
  );
}
