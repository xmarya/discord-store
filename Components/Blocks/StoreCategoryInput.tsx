"use client";

import { CategoryBasic } from "@/_Types/Category";
import { FormBlock } from "../UI/Form/FromBlock";
import { Label } from "../UI/Form/Label";
import TagInput from "../UI/Form/TagInput";
import { InputStatusCode } from "@/_Types/FormContext";
import { useState } from "react";
import TagsList from "../UI/TagsList";

type Props = {
  categories: Array<CategoryBasic> | undefined;
  storeId: string;
};

export default function StoreCategoryInput({ categories, storeId }: Props) {
  const [tagsArray, setTagsArray] = useState(categories);
  const planQuota = 4; //TODO: correctly get this depending on the user plan. I highly recommend to store the plan inside the session

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): InputStatusCode {
    const userInput = event.currentTarget;
    const tagText = userInput.value;
    if (event.key !== "Enter" || tagText === "") return "noChange";

    event.preventDefault(); // prevent the default behaviour or adding a new line.
    if ((tagsArray?.length ?? 0) <= planQuota && tagText.trim() !== "") {
      // the same as => const value = getTagValue(tag) => value === newTag
      if (tagsArray?.some((t) => t.name === tagText)) {
        userInput.value = "";
        throw new Error("لا يمكن اضافة نفس الفئة مجددًا");
      } else {
        handleAddTag(tagText);
        // after adding the tag, clear the input preparing to accept the next one:
        userInput.value = "";
      }
    }
    return "valid";
  }

  async function handleAddTag(newTag: string) {
    const newCat = { name: newTag, colour: "#d1d5db", store: storeId };
    const newTags = [...(tagsArray?.length ? tagsArray : []), newCat];
    console.log("newTags", newTags);

    setTagsArray(newTags); /* SOLILOQUY: how to get this to be part of formData? they are not inside the input itself to be sent within the form! */
  }

  function handleDeleteTag(tag: string) {}

  return (
    <FormBlock>
      {" "}
      {/* flex column */}
      <Label>فئات المنتجات:</Label>
      <TagsList tags={tagsArray} getTagValue={(cat) => cat.name} />
      <TagInput
        type="text"
        name="tagsInput"
        eventType="onKeyDown"
        validate={handleKeyDown}
        placeholder={(tagsArray?.length ?? 0) >= planQuota ? "بلغت الحد المسموح به" : "ادخل فئة جديدة"}
        disabled={(tagsArray?.length ?? 0) >= planQuota}>
        <span style={{ color: "#ccc" }}>
          {tagsArray?.length ?? 0} / {planQuota}
        </span>
      </TagInput>
      <input type="hidden" name="categories" defaultValue={"categories"} />
    </FormBlock>
  );
}
