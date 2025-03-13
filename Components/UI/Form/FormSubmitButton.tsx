import styled from "styled-components";
import { Button } from "../Button";
import { useFormStatus } from "react-dom";

const SubmitButton = styled(Button).attrs({ type: "submit" })`
  color: white;
  background-color: green;
`;

type Props = {
  children:React.ReactNode,
  condition:boolean
}

export default function FormSubmitButton({children, condition}:Props) {
  const {pending} = useFormStatus();
  const isDisabled = pending || condition;
  console.log("isDisabled", isDisabled);
  return (
    <SubmitButton aria-disabled={isDisabled} disabled={isDisabled}>
      {children}
    </SubmitButton>
  )
}


