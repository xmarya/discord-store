"use client";

import styled from "styled-components";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";
import { Category } from "@/Types/Category";
import { Label } from "../UI/Form/Label";
import { FormBlock } from "../UI/Form/FromBlock";
import { useFormStore } from "@/hooks/formStore";
import { FormError } from "../UI/Form/FormError";
import { useFormContext } from "react-hook-form";


const TagInputWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  background-color: pink;
`;

const TagInput = styled.input.attrs({ type: "text" })``;

const TagsList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  background-color: olivedrab;
`;

type Props<T extends Category> = {
  tags: Array<T> | undefined;
  getTagValue: (tag: T) => string;
};

export default function TagsInput<T extends Category>({tags,getTagValue,}: Props<T>) {
  // const [optimisticState, optimisticAction] = useOptimistic(tags, (currentTags, newTag:T) => {
  //     // the useOptimistic call back only job is returning the optimisticState
  //     return [...(currentTags || []), newTag]; // OR (currentTags?.length ? currentTags : [])
  // });
  const {register, setError, clearErrors, formState:{errors: formErrors}} = useFormContext();
  const {setHasError, setStoreData, storeData} = useFormStore();
  const [tagState, setTagState] = useState<Array<T> | undefined>(tags);
  const planQuota = 4;

  async function handleAddTag(newTag: string) {
    // logic of adding the new category to the db.
    const newCat: T = { name: newTag, colour: "#d1d5db" } as T; // I had to use cast to tell TS it's safe to consider this obj as Category.
    // optimisticAction(newCat);
    // const newTags:Array<T> = [...(tags?.length ? tags : []), newCat];
    setTagState((currentState) => [
      ...(currentState?.length ? currentState : []),
      newCat,
    ]);

    tags?.push(newCat);
    console.log("TAAAAAAgs",tags);
  }

  function handleDeleteTag(tag: string) {}

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>,userInput: EventTarget & HTMLInputElement) {
    const tagText = userInput.value;
    if (event.key !== "Enter" || tagText === "") return;

    event.preventDefault(); // prevent the default behaviour + adding a new line.
    if ((tagState?.length ?? 0) <= planQuota && tagText.trim() !== "") {

      // the same as => const value = getTagValue(tag) => value === newTag
      if(tagState?.some((t) => t.name === tagText)) {
        setError("tagInput", {
          type:"custom",
          message: "لا يمكن اضافة نفس الفئة مجددًا"
        });
        userInput.value = "";
      }
      else {
        handleAddTag(tagText);
        clearErrors("tagInput");
        // after adding the tag, clear the input preparing to accept the next one:
        userInput.value = "";
        setHasError(false);
      }
    }
  }

  return (
    <>
      <FormBlock>
        <Label htmlFor="tagInput">فئات المنتجات:</Label>
        <TagsList>
          {tagState?.map((t, index) => (
            <li key={index}>
              <span>{getTagValue(t)}</span>
              <button type="button">
                <FaEllipsisVertical />
              </button>
            </li>
          ))}
        </TagsList>
        <TagInputWrapper>
        <TagInput
        {...register("tagInput")}
          placeholder={
            (tagState?.length ?? 0) >= planQuota
              ? "بلغت الحد المسموح به"
              : "ادخل فئة جديدة"
          }
          onKeyDown={(event) => handleKeyDown(event, event.currentTarget)}
          disabled={(tagState?.length ?? 0) >= planQuota}
        />
        <div>
            <span>{(tagState?.length ?? 0)} / {planQuota}</span>
        </div>
        </TagInputWrapper>
        <FormError $hasError={!!formErrors?.tagInput?.message}>
          {typeof formErrors?.tagInput?.message === "string" && formErrors?.tagInput?.message || ""}
        </FormError>
      </FormBlock>
    </>
  );
}

/*
    Because of using Generics in the Props, TS couldn't infer the newTag inside handleAddTag 
    either the t inside the tags.mp(). so here come the getTagValue(). 
    it extracts the string value from the array the wat the parent components decides.
    Also, it Makes the component flexible → Works with both string[] and Category[] (or any object type).
    NOTE: inside handleAddTag I was using includes() to check if the tag is already exist 
    but it appears it doesn’t work for objects, some() should be use instead.
    Object.includes()❌ 
    Object.some() ✅
*/
