"use client"

import { Category } from "@/Types/Category";
import TagsInput from "./TagsInput";

type Props = {
    categories:Array<Category> | []
}

export default function StoreCategoriesForm({categories}:Props) {
    return (
        <TagsInput tags={categories} getTagValue={cat => cat.name}/>
    )
}

