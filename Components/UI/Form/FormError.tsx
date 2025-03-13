import styled from "styled-components";


export const FormError = styled.p.attrs({role:"alert", "aria-live":"assertive", "aria-atomic":"true"})<{$hasError:boolean}>`
    min-height: 1.5rem;
    display: inline-block;
    color: red;
    font-size: 1.2rem;
    font-weight: bold;
    visibility: ${(props) => props.$hasError ? "visible" : "hidden"};

`;
