import styled from "styled-components";
import { Button } from "../Buttons/Button";

const ResetButton = styled(Button).attrs({ type: "reset" })`
  color: white;
  background-color: grey;
`;

type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormResetButton({ children, ...props }: Props) {
  return <ResetButton {...props}>{children}</ResetButton>;
}
