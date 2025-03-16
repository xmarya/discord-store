import { FormContextInput } from "@/_Types/FormContextInput";
import styled from "styled-components";
import Input from "./Input";
import { FormError } from "./FormError";
import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

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
type Props = {
  tags: Array<Tag>,
  getTagValue?: (tag:Tag) => string,
} & FormContextInput

export default function TagInput({name, validate, tags, getTagValue, ...props}:Props) {
  const [tagState, setTagState] = useState<Array<Tag> | []>(tags);
  const [error, setError] = useState("");
  return (
    <>
      <TagsList>
        {tagState?.map((t, index) => (
          <li key={index}>
            <span>{getTagValue?.(t)}</span>
            <button type="button">
              <FaEllipsisVertical />
            </button>
          </li>
        ))}
      </TagsList>
      <TagInputWrapper>
      <Input name={name} validate={validate} {...props}/>
      <FormError $hasError={!!error}>{error}</FormError>
    </TagInputWrapper>
    </>
  )
}

