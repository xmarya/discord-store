"use client";

import styled from "styled-components";

const StyledTagsList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

type Tag = Record<string, any>;

type Props = {
  tags: Array<Tag> | undefined;
  getTagValue: (tag: Tag) => string;
};

export default function TagsList({ tags, getTagValue }: Props) {
  return (
      <StyledTagsList>
        {tags?.map((t, index: number) => (
            <li key={index}>
              <span>{getTagValue(t)}</span>
            </li>
        ))}
      </StyledTagsList>
  );
}
