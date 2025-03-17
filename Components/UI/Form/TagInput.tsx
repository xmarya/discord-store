import { EventTypes, FormContextInput } from "@/_Types/FormContextInput";
import { FaEllipsisVertical } from "react-icons/fa6";
import styled from "styled-components";
import Input from "./Input";

const TagInputWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  background-color: pink;
`;

const TagsList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  background-color: olivedrab;
`;

type Tag = Record<string, any>;

type Props <T extends EventTypes> = {
  tags: Array<Tag> | undefined,
  getTagValue: (tag:Tag) => string,
  children?:React.ReactNode
} & FormContextInput<T>;

export default function TagInput<T extends EventTypes>({name, validate, eventType, tags, getTagValue, children}:Props<T>) {

  return (
    <>
      <TagsList>
        {tags?.map((t, index) => (
          <li key={index}>
            <span>{getTagValue(t)}</span>
            <button type="button">
              <FaEllipsisVertical />
            </button>
          </li>
        ))}
      </TagsList>
      <TagInputWrapper> {/*flex row */}
        <Input name={name} eventType={eventType} validate={validate}/>
        {children}
      </TagInputWrapper>
    </>
  )
}

