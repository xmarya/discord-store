"use client"

import { CategoryBasic } from "@/_Types/Category"
import { FormBlock } from "../UI/Form/FromBlock"
import { Label } from "../UI/Form/Label"
import TagInput from "../UI/Form/TagInput"

type Props = {
    categories:Array<CategoryBasic> | [],
}

export default function StoreCategoryInput({categories}:Props) {
    const planQuota = 4; //TODO: correctly get this depending on the user plan. I highly recommend to store the plan inside the session

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        const userInput = event.currentTarget;
        const tagText = userInput.value;
        if (event.key !== "Enter" || tagText === "") return; //FIX: this should still prevent the submission, but throwing an error will block the submission on other valid inputs
    
        event.preventDefault(); // prevent the default behaviour + adding a new line.
        if ((categories?.length ?? 0) <= planQuota && tagText.trim() !== "") {
          // the same as => const value = getTagValue(tag) => value === newTag
          if (categories?.some((t) => t.name === tagText)) {
            userInput.value = "";
            throw new Error("لا يمكن اضافة نفس الفئة مجددًا");
          } 
          else {
            handleAddTag(tagText);
            // after adding the tag, clear the input preparing to accept the next one:
            userInput.value = "";
          }
        }
      }

      async function handleAddTag(newTag: string) {
        // logic of adding the new category to the db.
        // const newCat: T = { name: newTag, colour: "#d1d5db" } as T; // I had to use cast to tell TS it's safe to consider this obj as Category.
        // // optimisticAction(newCat);
        // // const newTags:Array<T> = [...(tags?.length ? tags : []), newCat];
        // setTagState((currentState) => [
        //   ...(currentState?.length ? currentState : []),
        //   newCat,
        // ]);
    
        // tags?.push(newCat);
        // setStoreData({ categories: tags });
      }
    
      function handleDeleteTag(tag: string) {}

    return (
        <FormBlock>
            <Label>فئات المنتجات:</Label>
            <TagInput name="categories" eventType="onKeyDown" validate={handleKeyDown} tags={categories} type="text" placeholder={
              (categories?.length ?? 0) >= planQuota
                ? "بلغت الحد المسموح به"
                : "ادخل فئة جديدة"
            }
            disabled={(categories?.length ?? 0) >= planQuota}/>
            <span>
              {categories?.length ?? 0} / {planQuota}
            </span>
        </FormBlock>
    )
}

