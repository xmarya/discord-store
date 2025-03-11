"use client"

import { CategoryBasic } from "@/Types/Category";
import TagsInput from "./TagsInput";

export default function StoreCategoriesForm({categories}) {
    return (
        <div>
            <TagsInput tags={categories} getTagValue={cat => cat.name}/>
        </div>
    )
}

