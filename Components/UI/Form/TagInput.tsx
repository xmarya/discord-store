import { EventTypes, FormContextInput } from "@/_Types/FormContextInput";
import styled from "styled-components";
import Input from "./Input";

const TagInputWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;


type Props <T extends EventTypes> = {
  children?:React.ReactNode
} & FormContextInput<T>;

export default function TagInput<T extends EventTypes>({name, validate, eventType, children, ...props}:Props<T>) {

  return (
      <TagInputWrapper> {/*flex row */}
        <Input name={name} eventType={eventType} validate={validate} {...props}/>
        {children}
      </TagInputWrapper>
  )
}

