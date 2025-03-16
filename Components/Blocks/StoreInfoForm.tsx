"use client"

import { StoreDocument } from "@/_Types/Store";
import {FormContextProvider } from "@/hooks/FormContext";
import StoreNameInput from "./StoreNameInput";
import StoreCategoryInput from "./StoreCategoryInput";

type namesObject = Pick<StoreDocument, "_id" | "storeName">;
type Props = {
  store: StoreDocument;
  availableNames: Array<namesObject>;
  formAction: (prevState: void | null, formData: FormData) => Promise<void>;
};

export default function StoreInfoForm({ store, availableNames, formAction }: Props) {
    const {_id:storeId, storeName, categories} = store || "";

    return (
    <FormContextProvider formAction={formAction}>
        <StoreNameInput storeName={storeName} storeId={storeId} availableNames={availableNames}/>
        {
          storeId &&
          <>
          <StoreCategoryInput categories={categories}/>
          <input type="hidden" defaultValue={storeId} name="storeId" />
          </>
        }
      
    </FormContextProvider>
  );
}
