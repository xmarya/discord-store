"use client"

import styled from "styled-components";
import { Button } from "../Buttons/Button";
import { useFormStatus } from "react-dom";

const SubmitButton = styled(Button).attrs({ type: "submit" })`
  color: white;
  background-color: green;
`;

type Props = {
  children: React.ReactNode;
  condition: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormSubmitButton({ children, condition, ...props }: Props) {
  const { pending, action, data, method } = useFormStatus();
  const isDisabled = pending || condition;
  console.log("isDisabled", isDisabled);
  return (
    <SubmitButton aria-disabled={isDisabled} disabled={isDisabled} {...props}>
      {children}
    </SubmitButton>
  );
}
