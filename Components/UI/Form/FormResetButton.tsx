import styled from "styled-components";
import { Button } from "../Button";


const ResetButton = styled(Button).attrs({ type: "reset" })`
  color: white;
  background-color: grey;
`;

type Props = {
    children:React.ReactNode,
};


export default function FormResetButton({children}:Props) {
    return (
        <ResetButton>
            {children}
        </ResetButton>
    )
}

