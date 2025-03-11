"use client"

import styled from "styled-components";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useOptimistic, useState } from "react";
import { Category } from "@/Types/Category";


const TagInputWrapper = styled.div`
    width: 15rem;
    max-width: 15rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const TagInput = styled.input.attrs({type: "text"})`

`;

const TagsList = styled.ul`
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.8rem;
`;

type Props<T extends Category> = {
    tags: Array<T> | undefined,
    getTagValue: (tag:T) => string
}

export default function TagsInput<T extends Category>({tags, getTagValue}:Props<T>) {
    // const [optimisticState, optimisticAction] = useOptimistic(tags, (currentTags, newTag:T) => {
    //     // the useOptimistic call back only job is returning the optimisticState
    //     return [...(currentTags || []), newTag]; // OR (currentTags?.length ? currentTags : [])
    // });

    const [tagState, setTagState] = useState<Array<T> | undefined>(tags);
    // 1- save it in a normal state
    // 2- use the useOptimistic for the original form for the whole store data
    // 3- get the tags data using name="tag-input" of the input

    const planQuota = 4;
    
    async function handleAddTag(newTag:string) {
            // logic of adding the new category to the db.
            const newCat:T = {name: newTag, colour:"#fff"} as T; // I had to use cast to tell TS it's safe to consider this obj as Category.
            // optimisticAction(newCat);
            // const newTags:Array<T> = [...(tags?.length ? tags : []), newCat];
            setTagState(currentState => [...(currentState?.length ? currentState : []), newCat])
            console.log("tagState", tagState);
    }

    function handleDeleteTag(tag:string) {

    }

    function handleKeyDown(event:React.KeyboardEvent<HTMLInputElement>, userInput:EventTarget & HTMLInputElement) {
        const tagText = userInput.value;
        if(event.key !== "Enter" || tagText === "") return;

        event.preventDefault(); // prevent the default behaviour + adding a new line.
          // the same as => const value = getTagValue(tag) => value === newTag
        if((tagState?.length ?? 0) <= planQuota && tagText.trim() !== "" && !tagState?.some(t => t.name === tagText)) {
            console.log("condition => ", (tagState?.length ?? 0) <= planQuota && tagText !== "" && !tagState?.some(t => t.name === tagText));
        handleAddTag(tagText);
        // after adding the tag, clear the input preparing to accept the next one:
        userInput.value = "";
     }
    }

    return (
        <TagInputWrapper>
            <TagInput name="tag-input" placeholder="ادخل فئة جديدة"
                onKeyDown={(event) => handleKeyDown(event, event.currentTarget)}
                disabled={(tagState?.length ?? 0) >= planQuota}
            />
            <TagsList>
                {
                    tagState?.map((t,index) => 
                         <li key={index}>
                            <span>{getTagValue(t)}</span>
                            <button type="button"><FaEllipsisVertical /></button>
                        </li>
                    )
                }
            </TagsList>

        </TagInputWrapper>
    )
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